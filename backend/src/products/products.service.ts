import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateProductDto, UpdateProductDto, ProductQueryDto } from './dto/product.dto';
import slugify from 'slugify';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    const base = slugify(dto.title, { lower: true, strict: true });
    let finalSlug = base;
    let counter = 1;
    while (await this.prisma.product.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${base}-${counter++}`;
    }

    return this.prisma.product.create({
      data: {
        ...dto,
        slug: finalSlug,
        price: dto.price ?? null,
        originalPrice: dto.originalPrice ?? null,
        rating: dto.rating ?? null,
        images: dto.images || [],
        pros: dto.pros || [],
        cons: dto.cons || [],
      },
      include: { category: true },
    });
  }

  async findAll(query: ProductQueryDto) {
    const {
      page = 1,
      limit = 12,
      status,
      categoryId,
      petType,
      minPrice,
      maxPrice,
      featured,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const where: Record<string, unknown> = { deletedAt: null };
    if (status) where.status = status;
    if (categoryId) where.categoryId = categoryId;
    if (petType) where.petType = petType;
    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceFilter: Record<string, number> = {};
      if (minPrice !== undefined) priceFilter.gte = minPrice;
      if (maxPrice !== undefined) priceFilter.lte = maxPrice;
      where.price = priceFilter;
    }
    if (featured !== undefined) where.featured = featured;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: Math.min(limit, 100),
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (!product || product.deletedAt) throw new NotFoundException('Product not found');
    return product;
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product || product.deletedAt) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findById(id);
    const data: Record<string, unknown> = { ...dto };
    if (dto.title) {
      data.slug = slugify(dto.title, { lower: true, strict: true });
    }
    return this.prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    // Soft delete
    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getFeatured(limit = 6) {
    return this.prisma.product.findMany({
      where: { status: 'PUBLISHED', featured: true, deletedAt: null },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      take: Math.min(limit, 20),
    });
  }

  async getLatest(limit = 12) {
    return this.prisma.product.findMany({
      where: { status: 'PUBLISHED', deletedAt: null },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      take: Math.min(limit, 50),
    });
  }

  async getDashboardStats() {
    const [total, published, draft, categories] = await Promise.all([
      this.prisma.product.count({ where: { deletedAt: null } }),
      this.prisma.product.count({ where: { status: 'PUBLISHED', deletedAt: null } }),
      this.prisma.product.count({ where: { status: 'DRAFT', deletedAt: null } }),
      this.prisma.category.count(),
    ]);
    return { total, published, draft, categories };
  }
}
