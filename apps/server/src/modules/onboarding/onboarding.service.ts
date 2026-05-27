import {
  Injectable,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { UploadsService } from '../uploads/uploads.service.js';
import { AuthService } from '../auth/auth.service.js';
import { CompleteOnboardingDto } from './dto/complete-onboarding.dto.js';
import { validateMagicBytes } from '../uploads/utils/file-filter.util.js';

@Injectable()
export class OnboardingService {
  private readonly logger = new Logger(OnboardingService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly uploadsService: UploadsService,
    private readonly authService: AuthService,
  ) {}

  async getStatus(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      onboarding_complete: user.onboarding_complete,
      onboarding_step: user.onboarding_step,
      has_username: !!user.username,
      has_avatar: !!user.avatar_url,
    };
  }

  async completeOnboarding(
    userId: string,
    email: string,
    dto: CompleteOnboardingDto,
    avatarFile: Express.Multer.File,
    ipAddress: string | null,
  ) {
    // Validate magic bytes of avatar
    if (!validateMagicBytes(avatarFile.buffer, avatarFile.mimetype)) {
      throw new BadRequestException(
        'File content does not match the declared mime type',
      );
    }

    // Check username availability
    const isTaken = await this.usersService.isUsernameTaken(dto.username);
    if (isTaken) {
      throw new ConflictException('Username is already taken');
    }

    // Upload avatar to Insforge Storage
    const avatarUrl = await this.uploadsService.uploadAvatar(
      avatarFile.buffer,
      avatarFile.mimetype,
      avatarFile.originalname,
    );

    // Update user with onboarding data
    try {
      await this.usersService.updateOnboarding(userId, {
        username: dto.username,
        full_name: dto.full_name,
        age: dto.age,
        avatar_url: avatarUrl,
        reason_using: dto.reason_using,
      });
    } catch (error) {
      // If DB update fails, clean up uploaded avatar
      await this.uploadsService.deleteAvatar(avatarUrl);
      throw error;
    }

    // Generate final tokens
    const tokens = await this.authService.generateTokens(userId, email);

    // Audit log
    await this.authService.createAuditLog(
      'ONBOARDING_COMPLETE',
      userId,
      ipAddress,
      { username: dto.username },
    );

    this.logger.log(
      `Onboarding completed for user: ${userId} (${dto.username})`,
    );

    return {
      ...tokens,
      username: dto.username,
    };
  }

  async checkUsername(username: string) {
    const isTaken = await this.usersService.isUsernameTaken(username);
    return {
      username,
      available: !isTaken,
    };
  }
}
