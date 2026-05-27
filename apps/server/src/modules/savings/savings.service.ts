import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { CreateSavingTargetDto } from './dto/create-saving-target.dto.js';

@Injectable()
export class SavingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateSavingTargetDto) {
    const deadlineDate = dto.deadline ? new Date(dto.deadline) : null;
    return this.prisma.savingTarget.create({
      data: {
        user_id: userId,
        name: dto.name,
        target_amount: dto.target_amount,
        current_amount: dto.current_amount ?? 0,
        deadline: deadlineDate,
      },
    });
  }

  async findAll(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: { user_id: userId },
    });

    const totalIncome = transactions
      .filter((t: any) => t.type === 'INCOME')
      .reduce((sum: number, t: any) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t: any) => t.type === 'EXPENSE')
      .reduce((sum: number, t: any) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpense;

    const savingsTargets = await this.prisma.savingTarget.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });

    let remainingBalance = Math.max(0, totalBalance);
    const sortedForAllocation = [...savingsTargets].sort(
      (a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
    const allocatedMap = new Map<string, number>();
    for (const target of sortedForAllocation) {
      const needed = target.target_amount;
      const allocated = Math.min(needed, remainingBalance);
      remainingBalance -= allocated;
      allocatedMap.set(target.id, allocated);
    }

    return savingsTargets.map((target: any) => ({
      ...target,
      current_amount: allocatedMap.get(target.id) ?? 0,
    }));
  }

  async delete(userId: string, id: string) {
    const target = await this.prisma.savingTarget.findFirst({
      where: { id, user_id: userId },
    });

    if (!target) {
      throw new NotFoundException('Savings target not found');
    }

    return this.prisma.savingTarget.delete({
      where: { id },
    });
  }
}
