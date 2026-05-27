import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import * as path from 'path';

@Injectable()
export class UploadsService {
  private readonly s3Client: S3Client;
  private readonly logger = new Logger(UploadsService.name);

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      forcePathStyle: true, // Required for Insforge S3-compatible storage
      region: this.configService.getOrThrow<string>('INSFORGE_S3_REGION'),
      endpoint: this.configService.getOrThrow<string>('INSFORGE_S3_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>(
          'INSFORGE_S3_ACCESS_KEY_ID',
        ),
        secretAccessKey: this.configService.getOrThrow<string>(
          'INSFORGE_S3_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async uploadAvatar(
    fileBuffer: Buffer,
    mimetype: string,
    originalname: string,
  ): Promise<string> {
    const ext = path.extname(originalname).toLowerCase();
    const filename = `avatars/${randomUUID()}${ext}`;
    const bucket = this.configService.getOrThrow<string>(
      'INSFORGE_S3_BUCKET_AVATARS',
    );

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: filename,
        Body: fileBuffer,
        ContentType: mimetype,
      }),
    );

    const baseUrl = this.configService.getOrThrow<string>(
      'INSFORGE_PUBLIC_STORAGE_URL',
    );
    const publicUrl = `${baseUrl}/${bucket}/objects/${filename}`;

    this.logger.log(`Avatar uploaded: ${filename}`);
    return publicUrl;
  }

  async deleteAvatar(avatarUrl: string): Promise<void> {
    try {
      const bucket = this.configService.getOrThrow<string>(
        'INSFORGE_S3_BUCKET_AVATARS',
      );
      const baseUrl = this.configService.getOrThrow<string>(
        'INSFORGE_PUBLIC_STORAGE_URL',
      );
      const key = avatarUrl.replace(`${baseUrl}/${bucket}/objects/`, '');

      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: key,
        }),
      );

      this.logger.log(`Avatar deleted: ${key}`);
    } catch (error) {
      this.logger.error(`Failed to delete avatar: ${avatarUrl}`, error);
    }
  }
}
