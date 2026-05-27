import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import type { StringValue } from 'ms';
import { PrismaService } from '../database/prisma.service.js';
import type { Prisma } from '@prisma/client';

interface OAuthUserInput {
  email: string;
  provider: string;
  providerAccountId: string;
  fullName?: string;
  avatarUrl?: string;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly BCRYPT_ROUNDS = 10;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateOAuthUser(input: OAuthUserInput): Promise<Express.User> {
    // Check if OAuth account already exists
    const existingOAuth = await this.prisma.oauthAccount.findUnique({
      where: {
        provider_provider_account_id: {
          provider: input.provider,
          provider_account_id: input.providerAccountId,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            full_name: true,
            avatar_url: true,
            age: true,
            onboarding_complete: true,
            onboarding_step: true,
          },
        },
      },
    });

    if (existingOAuth) {
      this.logger.log(`Existing OAuth login: ${input.email}`);
      return existingOAuth.user;
    }

    // Check if user with this email exists (link account)
    const existingUser = await this.prisma.user.findUnique({
      where: { email: input.email },
      select: {
        id: true,
        email: true,
        username: true,
        full_name: true,
        avatar_url: true,
        age: true,
        onboarding_complete: true,
        onboarding_step: true,
      },
    });

    if (existingUser) {
      // Link OAuth account to existing user
      await this.prisma.oauthAccount.create({
        data: {
          user_id: existingUser.id,
          provider: input.provider,
          provider_account_id: input.providerAccountId,
        },
      });
      this.logger.log(`OAuth account linked for: ${input.email}`);
      return existingUser;
    }

    // Create new user + OAuth account
    const newUser = await this.prisma.user.create({
      data: {
        email: input.email,
        full_name: input.fullName || null,
        avatar_url: input.avatarUrl || null,
        oauthAccounts: {
          create: {
            provider: input.provider,
            provider_account_id: input.providerAccountId,
          },
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        full_name: true,
        avatar_url: true,
        age: true,
        onboarding_complete: true,
        onboarding_step: true,
      },
    });

    this.logger.log(`New user created via OAuth: ${input.email}`);
    return newUser;
  }

  async generateAccessToken(userId: string, email: string): Promise<string> {
    const accessExpiresIn =
      (this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m') as unknown as StringValue;

    return this.jwtService.sign(
      { sub: userId, email },
      {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: accessExpiresIn,
      },
    );
  }

  async generateTokens(userId: string, email: string): Promise<TokenPair> {
    const refreshExpiresIn =
      (this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '7d') as unknown as StringValue;

    const accessToken = await this.generateAccessToken(userId, email);

    const refreshTokenId = randomUUID();
    const refreshToken = this.jwtService.sign(
      { sub: userId, email, jti: refreshTokenId },
      {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: refreshExpiresIn,
      },
    );

    // Hash and store refresh token
    const hashedToken = await bcrypt.hash(refreshToken, this.BCRYPT_ROUNDS);
    // Store refresh token expiry aligned with the JWT exp claim (seconds).
    const decoded = this.jwtService.decode(refreshToken);
    const expSeconds =
      decoded && typeof decoded === 'object' && 'exp' in decoded
        ? (decoded as { exp?: unknown }).exp
        : undefined;
    const expiresAt =
      typeof expSeconds === 'number' ? new Date(expSeconds * 1000) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.prisma.refreshToken.create({
      data: {
        id: refreshTokenId,
        user_id: userId,
        hashed_token: hashedToken,
        expires_at: expiresAt,
      },
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshTokens(
    refreshToken: string,
    ipAddress: string | null = null,
  ): Promise<TokenPair> {
    let payload: { sub: string; email: string; jti: string };

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Find the stored token
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { id: payload.jti },
    });

    if (!storedToken) {
      // Token reuse detected — invalidate all tokens for this user
      await this.prisma.refreshToken.deleteMany({
        where: { user_id: payload.sub },
      });
      this.logger.warn(`Refresh token reuse detected for user: ${payload.sub}`);
      throw new UnauthorizedException('Refresh token has been revoked');
    }

    // Verify token hash
    const isValid = await bcrypt.compare(refreshToken, storedToken.hashed_token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Check expiration
    if (new Date() > storedToken.expires_at) {
      await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });
      throw new UnauthorizedException('Refresh token has expired');
    }

    // Rotate: delete old token, create new pair
    await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });

    await this.createAuditLog('REFRESH_TOKENS', payload.sub, ipAddress);

    return this.generateTokens(payload.sub, payload.email);
  }

  async logout(userId: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: { user_id: userId },
    });
    this.logger.log(`User logged out, all refresh tokens invalidated: ${userId}`);
  }

  async createAuditLog(
    action: string,
    userId: string | null,
    ipAddress: string | null,
    metadata?: Record<string, unknown>,
  ): Promise<void> {
    await this.prisma.auditLog.create({
      data: {
        user_id: userId,
        action,
        ip_address: ipAddress,
        metadata: metadata as Prisma.InputJsonValue ?? undefined,
      },
    });
  }

  // Cleanup expired refresh tokens (can be called periodically)
  async cleanupExpiredTokens(): Promise<number> {
    const result = await this.prisma.refreshToken.deleteMany({
      where: {
        expires_at: { lt: new Date() },
      },
    });
    return result.count;
  }
}
