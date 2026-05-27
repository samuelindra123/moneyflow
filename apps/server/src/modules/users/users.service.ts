import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { User } from '@prisma/client';

const USER_SELECT = {
  id: true,
  email: true,
  username: true,
  full_name: true,
  avatar_url: true,
  age: true,
  onboarding_complete: true,
  onboarding_step: true,
  reason_using: true,
  created_at: true,
  updated_at: true,
} as const;

type UserSelect = Pick<
  User,
  | 'id'
  | 'email'
  | 'username'
  | 'full_name'
  | 'avatar_url'
  | 'age'
  | 'onboarding_complete'
  | 'onboarding_step'
  | 'reason_using'
  | 'created_at'
  | 'updated_at'
>;

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserSelect | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: USER_SELECT,
    });
  }

  async findByEmail(email: string): Promise<UserSelect | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: USER_SELECT,
    });
  }

  async findByUsername(username: string): Promise<UserSelect | null> {
    return this.prisma.user.findUnique({
      where: { username },
      select: USER_SELECT,
    });
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });
    return user !== null;
  }

  async updateOnboarding(
    userId: string,
    data: {
      username: string;
      full_name: string;
      age: number;
      avatar_url: string;
      reason_using?: string;
    },
  ): Promise<UserSelect> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        username: data.username,
        full_name: data.full_name,
        age: data.age,
        avatar_url: data.avatar_url,
        reason_using: data.reason_using || null,
        onboarding_complete: true,
        onboarding_step: 'completed',
      },
      select: USER_SELECT,
    });

    this.logger.log(`Onboarding completed for user: ${userId}`);
    return user;
  }
}
