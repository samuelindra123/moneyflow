import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class OnboardingGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    // `JwtStrategy` resolves the user from DB and attaches it to `request.user`.
    // Avoid a second DB query on every request.
    if (!user.onboarding_complete) {
      throw new ForbiddenException('Onboarding required');
    }

    return true;
  }
}
