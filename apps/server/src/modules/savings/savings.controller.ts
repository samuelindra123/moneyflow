import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { SavingsService } from './savings.service.js';
import { CreateSavingTargetDto } from './dto/create-saving-target.dto.js';

@ApiTags('Savings')
@Controller('savings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new savings target' })
  @ApiResponse({ status: 201, description: 'Savings target created' })
  async create(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateSavingTargetDto,
  ) {
    return this.savingsService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all savings targets for current user' })
  @ApiResponse({ status: 200, description: 'List of savings targets' })
  async findAll(@CurrentUser('id') userId: string) {
    return this.savingsService.findAll(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a savings target' })
  @ApiResponse({ status: 200, description: 'Savings target deleted' })
  async delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.savingsService.delete(userId, id);
  }
}
