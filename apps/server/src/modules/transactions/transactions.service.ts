import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateTransactionDto) {
    const txDate = dto.date ? new Date(dto.date) : new Date();
    return this.prisma.transaction.create({
      data: {
        user_id: userId,
        amount: dto.amount,
        type: dto.type,
        category: dto.category,
        description: dto.description || null,
        date: txDate,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.transaction.findMany({
      where: { user_id: userId },
      orderBy: { date: 'desc' },
    });
  }

  async delete(userId: string, id: string) {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, user_id: userId },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
