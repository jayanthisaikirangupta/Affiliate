import { Controller, Post, Delete, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NewsletterService } from './newsletter.service';
import { JwtAuthGuard } from '../common/guards/auth.guard';

class SubscribeDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
}

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private newsletterService: NewsletterService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to newsletter' })
  subscribe(@Body() dto: SubscribeDto) {
    return this.newsletterService.subscribe(dto.email);
  }

  @Delete('unsubscribe')
  @ApiOperation({ summary: 'Unsubscribe from newsletter' })
  unsubscribe(@Body() dto: SubscribeDto) {
    return this.newsletterService.unsubscribe(dto.email);
  }

  @Get('subscribers')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all subscribers (admin)' })
  findAll() {
    return this.newsletterService.findAll();
  }
}
