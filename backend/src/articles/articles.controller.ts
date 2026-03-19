import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto, ArticleQueryDto } from './dto/article.dto';
import { JwtAuthGuard } from '../common/guards/auth.guard';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: 'List articles (public, paginated)' })
  findAll(@Query() query: ArticleQueryDto) {
    return this.articlesService.findAll(query);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Article dashboard stats (admin)' })
  getStats() {
    return this.articlesService.getDashboardStats();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get article by slug (public)' })
  findBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create article (admin)' })
  create(@Body() dto: CreateArticleDto) {
    return this.articlesService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update article (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.articlesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete article (admin)' })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
