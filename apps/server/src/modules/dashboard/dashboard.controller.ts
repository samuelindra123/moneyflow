import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { DashboardService } from './dashboard.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { OnboardingGuard } from '../auth/guards/onboarding.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard, OnboardingGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get(':username')
  @ApiOperation({ summary: 'Get user dashboard data' })
  @ApiParam({
    name: 'username',
    description: 'Username to fetch dashboard for',
  })
  @ApiResponse({ status: 200, description: 'Dashboard data' })
  @ApiResponse({ status: 403, description: 'Onboarding required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getDashboard(
    @Param('username') username: string,
    @CurrentUser('username') currentUsername: string | null | undefined,
  ) {
    if (!currentUsername || currentUsername !== username) {
      throw new ForbiddenException('Forbidden');
    }
    return this.dashboardService.getDashboard(username);
  }
}
