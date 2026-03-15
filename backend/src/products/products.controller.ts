import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto/product.dto';
import { JwtAuthGuard } from '../common/guards/auth.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // ── Public Routes ──────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'List products (public, paginated)' })
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured products' })
  getFeatured(@Query('limit') limit?: string) {
    return this.productsService.getFeatured(limit ? Number(limit) : undefined);
  }

  @Get('latest')
  @ApiOperation({ summary: 'Get latest products' })
  getLatest(@Query('limit') limit?: string) {
    return this.productsService.getLatest(limit ? Number(limit) : undefined);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dashboard stats (admin)' })
  getStats() {
    return this.productsService.getDashboardStats();
  }

  @Get('id/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get product by ID (admin)' })
  findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get product by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  // ── Admin Routes ───────────────────────────────────

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create product (admin)' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product (admin)' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
