import { Controller, Get, Post, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../common/guards/auth.guard';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Post('view/:productId')
  @ApiOperation({ summary: 'Track product view' })
  trackView(@Param('productId') productId: string) {
    return this.analyticsService.trackView(productId);
  }

  @Post('click/:productId')
  @ApiOperation({ summary: 'Track affiliate click' })
  trackClick(@Param('productId') productId: string) {
    return this.analyticsService.trackClick(productId);
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get analytics dashboard (admin)' })
  getDashboard(@Query('days') days?: string) {
    return this.analyticsService.getDashboard(days ? Number(days) : 30);
  }
}
