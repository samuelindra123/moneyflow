import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service.js';
import { GoogleOAuthGuard } from './guards/google-oauth.guard.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

function getCookie(req: Request, name: string): string | undefined {
  const raw = req.headers.cookie;
  if (!raw) return undefined;

  const parts = raw.split(';');
  for (const part of parts) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return undefined;
}

function durationToMs(input: string): number {
  // Supports: 15m, 7d, 1h, 30s
  const match = /^([0-9]+)\s*([smhd])$/i.exec(input.trim());
  if (!match) return 0;
  const value = Number(match[1]);
  const unit = match[2].toLowerCase();
  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };
  return value * (multipliers[unit] ?? 0);
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private getCookieOptions(maxAgeMs: number) {
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');
    const isProd = nodeEnv === 'production';

    return {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax' as const,
      path: '/',
      maxAge: maxAgeMs > 0 ? maxAgeMs : undefined,
    };
  }

  private setAuthCookies(res: Response, tokens: { access_token: string; refresh_token?: string }) {
    const accessTtl = durationToMs(
      this.configService.get<string>('JWT_ACCESS_EXPIRES_IN', '15m'),
    );
    const refreshTtl = durationToMs(
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    );

    res.cookie(ACCESS_TOKEN_COOKIE, tokens.access_token, this.getCookieOptions(accessTtl));

    if (tokens.refresh_token) {
      res.cookie(
        REFRESH_TOKEN_COOKIE,
        tokens.refresh_token,
        this.getCookieOptions(refreshTtl),
      );
    } else {
      res.clearCookie(REFRESH_TOKEN_COOKIE, { path: '/' });
    }
  }

  private clearAuthCookies(res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE, { path: '/' });
    res.clearCookie(REFRESH_TOKEN_COOKIE, { path: '/' });
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirect to Google OAuth' })
  googleAuth(): void {
    // Guard handles redirect
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirect to frontend with tokens' })
  async googleAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const user = req.user!;
    const frontendUrl = this.configService.getOrThrow<string>('FRONTEND_URL');
    const ip = req.ip || req.socket.remoteAddress || null;

    await this.authService.createAuditLog('LOGIN_GOOGLE', user.id, ip);

    const hasCompletedOnboarding = Boolean(user.onboarding_complete && user.username);

    if (hasCompletedOnboarding) {
      // Issue full tokens (access + refresh) and redirect to dashboard
      const tokens = await this.authService.generateTokens(user.id, user.email);
      this.setAuthCookies(res, tokens);

      const redirectUrl = new URL(`/dashboard/${user.username}`, frontendUrl);
      res.redirect(redirectUrl.toString());
      return;
    }

    // Pre-onboarding: issue TEMP access token only (NO refresh token)
    const accessToken = await this.authService.generateAccessToken(user.id, user.email);
    this.setAuthCookies(res, { access_token: accessToken });

    const redirectUrl = new URL('/onboarding', frontendUrl);
    res.redirect(redirectUrl.toString());
  }

  @Post('refresh')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'New token pair' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(
    @Body() dto: RefreshTokenDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const refreshToken = dto.refresh_token ?? getCookie(req, REFRESH_TOKEN_COOKIE);
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }

    const tokens = await this.authService.refreshTokens(refreshToken, req.ip ?? null);
    this.setAuthCookies(res, tokens);
    return tokens;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout and invalidate all refresh tokens' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  async logout(
    @CurrentUser('id') userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const ip = req.ip || req.socket.remoteAddress || null;
    await this.authService.logout(userId);
    await this.authService.createAuditLog('LOGOUT', userId, ip);

    this.clearAuthCookies(res);
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Current user info' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getMe(@CurrentUser() user: Express.User) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      age: user.age,
      onboarding_complete: user.onboarding_complete,
      onboarding_step: user.onboarding_step,
    };
  }
}
