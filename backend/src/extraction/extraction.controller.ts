import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ExtractionService } from './extraction.service';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ExtractUrlDto {
  @ApiProperty({ example: 'https://www.amazon.com/dp/B0BSHF7WHW' })
  @IsUrl()
  url: string;
}

@ApiTags('Extraction')
@Controller('extract')
export class ExtractionController {
  constructor(private extractionService: ExtractionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Extract product data from affiliate URL' })
  async extract(@Body() dto: ExtractUrlDto) {
    return this.extractionService.extractFromUrl(dto.url);
  }
}
