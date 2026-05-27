import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async getDashboard(username: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new NotFoundException(`User '${username}' not found`);
    }

    // Fetch transactions
    const transactions = await this.prisma.transaction.findMany({
      where: { user_id: user.id },
      orderBy: { date: 'desc' },
    });

    // Calculate totals
    const totalIncome = transactions
      .filter((t: any) => t.type === 'INCOME')
      .reduce((sum: number, t: any) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t: any) => t.type === 'EXPENSE')
      .reduce((sum: number, t: any) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpense;

    // Fetch budget (expense limit)
    const budget = await this.prisma.budget.findUnique({
      where: { user_id: user.id },
    });
    const monthlyExpenseLimit = budget ? budget.limit_amount : 0;

    // Calculate current month's expenses
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyExpenses = transactions
      .filter(
        (t: any) => t.type === 'EXPENSE' && new Date(t.date) >= startOfMonth,
      )
      .reduce((sum: number, t: any) => sum + t.amount, 0);

    // Fetch savings goals
    const savingsTargets = await this.prisma.savingTarget.findMany({
      where: { user_id: user.id },
      orderBy: { created_at: 'desc' },
    });

    // Auto-allocate total balance to active savings targets chronologically
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

    const savingsWithAllocation = savingsTargets.map((target: any) => ({
      ...target,
      current_amount: allocatedMap.get(target.id) ?? 0,
    }));

    return {
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        age: user.age,
        reason_using: user.reason_using,
        member_since: user.created_at,
      },
      stats: {
        total_balance: totalBalance,
        total_income: totalIncome,
        total_expense: totalExpense,
        monthly_expense_limit: monthlyExpenseLimit,
        monthly_expenses: monthlyExpenses,
      },
      savings: savingsWithAllocation,
      transactions: transactions.slice(0, 10), // Limit to 10 for dashboard preview
    };
  }
}
