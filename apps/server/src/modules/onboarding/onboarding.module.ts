import { Module } from '@nestjs/common';
import { OnboardingController } from './onboarding.controller.js';
import { OnboardingService } from './onboarding.service.js';
import { UsersModule } from '../users/users.module.js';
import { UploadsModule } from '../uploads/uploads.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [UsersModule, UploadsModule, AuthModule],
  controllers: [OnboardingController],
  providers: [OnboardingService],
})
export class OnboardingModule {}
