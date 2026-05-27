import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import type { CookieOptions, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { AuthService } from '../auth.service.js';

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

class CookieStateStore {
  constructor(
    private readonly cookieName: string,
    private readonly cookieOptions: CookieOptions,
  ) {}

  // passport-oauth2 will call this with arity 4: (req, state, meta, callback)
  store(
    req: Request,
    _state: unknown,
    _meta: unknown,
    callback: (err: Error | null, state?: string) => void,
  ): void {
    const res = (req as Request & { res?: Response }).res;
    if (!res) {
      callback(new Error('Response object not available for OAuth state store'));
      return;
    }

    const handle = randomUUID();
    res.cookie(this.cookieName, handle, this.cookieOptions);
    callback(null, handle);
  }

  // passport-oauth2 will call this with arity 3: (req, providedState, callback)
  verify(
    req: Request,
    providedState: string,
    callback: (err: Error | null, ok?: boolean, state?: unknown) => void,
  ): void {
    const storedState = getCookie(req, this.cookieName);

    const res = (req as Request & { res?: Response }).res;
    if (res) {
      res.clearCookie(this.cookieName, { path: this.cookieOptions.path ?? '/' });
    }

    if (!storedState || storedState !== providedState) {
      callback(null, false, { message: 'Invalid authorization request state.' });
      return;
    }

    callback(null, true);
  }
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const nodeEnv = configService.get<string>('NODE_ENV', 'development');
    const isProd = nodeEnv === 'production';

    const stateStore = new CookieStateStore('oauth_state', {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 10 * 60 * 1000, // 10 minutes
    });

    const strategyOptions = {
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
      state: true,
      store: stateStore,
    } as unknown as ConstructorParameters<typeof Strategy>[0];

    super(strategyOptions);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const email = profile.emails?.[0]?.value;

    if (!email) {
      done(new Error('No email found in Google profile'), undefined);
      return;
    }

    const user = await this.authService.validateOAuthUser({
      email,
      provider: 'google',
      providerAccountId: profile.id,
      fullName: profile.displayName || undefined,
      avatarUrl: profile.photos?.[0]?.value || undefined,
    });

    done(null, user);
  }
}
