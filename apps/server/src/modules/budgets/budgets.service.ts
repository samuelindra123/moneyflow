import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { CreateBudgetDto } from './dto/create-budget.dto.js';

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(userId: string, dto: CreateBudgetDto) {
    return this.prisma.budget.upsert({
      where: { user_id: userId },
      update: { limit_amount: dto.limit_amount },
      create: {
        user_id: userId,
        limit_amount: dto.limit_amount,
      },
    });
  }

  async findOne(userId: string) {
    return this.prisma.budget.findUnique({
      where: { user_id: userId },
    });
  }
}
