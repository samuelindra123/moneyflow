import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller.js';
import { envValidationSchema } from './config/env.validation.js';
import { DatabaseModule } from './modules/database/database.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { OnboardingModule } from './modules/onboarding/onboarding.module.js';
import { UploadsModule } from './modules/uploads/uploads.module.js';
import { DashboardModule } from './modules/dashboard/dashboard.module.js';
import { TransactionsModule } from './modules/transactions/transactions.module.js';
import { SavingsModule } from './modules/savings/savings.module.js';
import { BudgetsModule } from './modules/budgets/budgets.module.js';

@Module({
  imports: [
    // Configuration with validation
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),

    // Rate limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: config.get<number>('THROTTLE_TTL', 60000),
            limit: config.get<number>('THROTTLE_LIMIT', 100),
          },
        ],
      }),
    }),

    // Core modules
    DatabaseModule,
    AuthModule,
    UsersModule,
    OnboardingModule,
    UploadsModule,
    DashboardModule,
    TransactionsModule,
    SavingsModule,
    BudgetsModule,
  ],
  controllers: [AppController],
  providers: [
    // Global throttler guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
