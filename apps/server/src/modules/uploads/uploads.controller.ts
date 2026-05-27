import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { AuthService } from '../auth/auth.service.js';
import { UploadsService } from './uploads.service.js';
import {
  imageFileFilter,
  MAX_FILE_SIZE,
  validateMagicBytes,
} from './utils/file-filter.util.js';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly authService: AuthService,
  ) {}

  @Post('avatar')
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
  @ApiOperation({ summary: 'Upload avatar image (S3 / Insforge Storage)' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['avatar'],
      properties: {
        avatar: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Avatar uploaded' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async uploadAvatar(
    @CurrentUser() user: Express.User,
    @UploadedFile() avatarFile: Express.Multer.File | undefined,
    @Req() req: Request,
  ) {
    if (!avatarFile) {
      throw new BadRequestException('Avatar image is required');
    }

    if (!validateMagicBytes(avatarFile.buffer, avatarFile.mimetype)) {
      throw new BadRequestException(
        'File content does not match the declared mime type',
      );
    }

    const ip = req.ip || req.socket.remoteAddress || null;
    const avatarUrl = await this.uploadsService.uploadAvatar(
      avatarFile.buffer,
      avatarFile.mimetype,
      avatarFile.originalname,
    );

    await this.authService.createAuditLog('UPLOAD_AVATAR', user.id, ip);

    return {
      avatar_url: avatarUrl,
    };
  }
}
