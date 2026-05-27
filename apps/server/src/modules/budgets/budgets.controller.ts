import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { BudgetsService } from './budgets.service.js';
import { CreateBudgetDto } from './dto/create-budget.dto.js';

@ApiTags('Budgets')
@Controller('budgets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create or update monthly expense budget limit' })
  @ApiResponse({ status: 201, description: 'Budget limit set successfully' })
  async createOrUpdate(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateBudgetDto,
  ) {
    return this.budgetsService.createOrUpdate(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get current monthly budget limit for user' })
  @ApiResponse({ status: 200, description: 'Budget limit info' })
  async findOne(@CurrentUser('id') userId: string) {
    return this.budgetsService.findOne(userId);
  }
}
