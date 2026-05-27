import { NestFactory } from '@nestjs/core';
import type { LoggerService } from '@nestjs/common';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';
import { PrismaService } from './modules/database/prisma.service.js';

type PinoLikeLogger = {
  info: (obj: unknown, msg?: string, ...args: unknown[]) => void;
  warn: (obj: unknown, msg?: string, ...args: unknown[]) => void;
  error: (obj: unknown, msg?: string, ...args: unknown[]) => void;
  debug?: (obj: unknown, msg?: string, ...args: unknown[]) => void;
};

class PinoNestLogger implements LoggerService {
  constructor(private readonly pino: PinoLikeLogger) {}

  log(message: unknown, context?: string): void {
    this.pino.info({ context }, String(message));
  }

  error(message: unknown, stack?: string, context?: string): void {
    this.pino.error({ context, stack }, String(message));
  }

  warn(message: unknown, context?: string): void {
    this.pino.warn({ context }, String(message));
  }

  debug(message: unknown, context?: string): void {
    if (this.pino.debug) {
      this.pino.debug({ context }, String(message));
      return;
    }
    this.pino.info({ context, debug: true }, String(message));
  }

  verbose(message: unknown, context?: string): void {
    this.debug(message, context);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');

  // Lightweight request logger (pino-http)
  const httpLogger = pinoHttp({
    level: nodeEnv === 'production' ? 'info' : 'debug',
    redact: ['req.headers.authorization', 'req.headers.cookie'],
    transport:
      nodeEnv !== 'production'
        ? {
            target: 'pino-pretty',
            options: { colorize: true, singleLine: true },
          }
        : undefined,
    autoLogging: nodeEnv !== 'test',
  });

  app.use(httpLogger);
  app.useLogger(new PinoNestLogger(httpLogger.logger as unknown as PinoLikeLogger));

  // 1. Helmet — security headers
  app.use(helmet());

  // 2. CORS with whitelist
  const corsOrigins = configService
    .getOrThrow<string>('CORS_ORIGINS')
    .split(',')
    .map((origin) => origin.trim());

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // 3. Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // 4. Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter(nodeEnv));

  // 5. Global response interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  // 6. Swagger documentation (non-production only)
  if (nodeEnv !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('MoneyFlow API')
      .setDescription(
        'MoneyFlow — Atur Uangmu Lebih Gampang. Backend API for authentication, onboarding, and dashboard.',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
    logger.log('Swagger documentation available at /api');
  }

  // 7. Graceful shutdown
  app.enableShutdownHooks();

  // Prisma shutdown hook (beforeExit)
  const prisma = app.get(PrismaService);
  prisma.enableShutdownHooks(app);

  // 8. Start listening
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  logger.log(`Application running on port ${port}`);
  logger.log(`Environment: ${nodeEnv}`);
}

bootstrap();
