import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { TransformInterceptor } from './../src/common/interceptors/transform.interceptor.js';
import { PrismaService } from './../src/modules/database/prisma.service.js';
import { AuthService } from './../src/modules/auth/auth.service.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.data.status).toBe('ok');
      });
  });

  it('/uploads/avatar (POST) - Upload Image to S3 (PNG)', async () => {
    const prisma = app.get(PrismaService);
    const authService = app.get(AuthService);

    // Create a temporary test user
    const testUser = await prisma.user.create({
      data: {
        email: `test-uploader-${Date.now()}@example.com`,
        full_name: 'Test Uploader',
      },
    });

    try {
      const testToken = await authService.generateAccessToken(testUser.id, testUser.email);
      // Valid PNG file signature: 89 50 4E 47 0D 0A 1A 0A
      const mockImage = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

      const res = await request(app.getHttpServer())
        .post('/uploads/avatar')
        .set('Authorization', `Bearer ${testToken}`)
        .attach('avatar', mockImage, 'test.png')
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.avatar_url).toBeDefined();
      expect(res.body.data.avatar_url).toContain('https://');
      
      console.log('Uploaded Avatar URL (PNG):', res.body.data.avatar_url);
    } finally {
      // Clean up the temporary user
      await prisma.user.delete({
        where: { id: testUser.id },
      });
    }
  });

  it('/uploads/avatar (POST) - Should Reject GIF Upload', async () => {
    const prisma = app.get(PrismaService);
    const authService = app.get(AuthService);

    const testUser = await prisma.user.create({
      data: {
        email: `test-uploader-gif-${Date.now()}@example.com`,
        full_name: 'Test Uploader GIF',
      },
    });

    try {
      const testToken = await authService.generateAccessToken(testUser.id, testUser.email);
      // GIF signature: GIF89a
      const mockImage = Buffer.from('GIF89a');

      await request(app.getHttpServer())
        .post('/uploads/avatar')
        .set('Authorization', `Bearer ${testToken}`)
        .attach('avatar', mockImage, 'test.gif')
        .expect(400);
    } finally {
      await prisma.user.delete({
        where: { id: testUser.id },
      });
    }
  });

  afterEach(async () => {
    await app.close();
  });
});
