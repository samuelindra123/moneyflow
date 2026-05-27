import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Throttle } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { memoryStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { OnboardingService } from './onboarding.service.js';
import { CompleteOnboardingDto } from './dto/complete-onboarding.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { imageFileFilter, MAX_FILE_SIZE } from '../uploads/utils/file-filter.util.js';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

function durationToMs(input: string): number {
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

@ApiTags('Onboarding')
@Controller('onboarding')
export class OnboardingController {
  constructor(
    private readonly onboardingService: OnboardingService,
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

  private setAuthCookies(res: Response, tokens: { access_token: string; refresh_token: string }) {
    const accessTtl = durationToMs(
      this.configService.get<string>('JWT_ACCESS_EXPIRES_IN', '15m'),
    );
    const refreshTtl = durationToMs(
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    );

    res.cookie(ACCESS_TOKEN_COOKIE, tokens.access_token, this.getCookieOptions(accessTtl));
    res.cookie(REFRESH_TOKEN_COOKIE, tokens.refresh_token, this.getCookieOptions(refreshTtl));
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get onboarding status' })
  @ApiResponse({ status: 200, description: 'Onboarding status' })
  async getStatus(@CurrentUser('id') userId: string) {
    return this.onboardingService.getStatus(userId);
  }

  @Patch('complete')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: imageFileFilter,
    }),
  )
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Complete onboarding with profile data and avatar' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['full_name', 'username', 'age', 'avatar'],
      properties: {
        full_name: { type: 'string', minLength: 2, maxLength: 100 },
        username: { type: 'string', pattern: '^[a-z0-9_]{3,30}$' },
        age: { type: 'integer', minimum: 13, maximum: 120 },
        reason_using: { type: 'string', maxLength: 500 },
        avatar: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Onboarding completed, tokens returned' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 409, description: 'Username already taken' })
  async completeOnboarding(
    @CurrentUser() user: Express.User,
    @Body() dto: CompleteOnboardingDto,
    @UploadedFile() avatarFile: Express.Multer.File | undefined,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!avatarFile) {
      throw new BadRequestException('Avatar image is required');
    }

    const ip = req.ip || req.socket.remoteAddress || null;

    const result = await this.onboardingService.completeOnboarding(
      user.id,
      user.email,
      dto,
      avatarFile,
      ip,
    );

    this.setAuthCookies(res, {
      access_token: result.access_token,
      refresh_token: result.refresh_token,
    });

    return result;
  }

  @Post('check-username')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Check if username is available' })
  @ApiResponse({ status: 200, description: 'Username availability result' })
  async checkUsername(@Body('username') username: string) {
    if (!username || !/^[a-z0-9_]{3,30}$/.test(username)) {
      throw new BadRequestException(
        'Username must be 3-30 characters, lowercase alphanumeric and underscores only',
      );
    }
    return this.onboardingService.checkUsername(username);
  }
}
