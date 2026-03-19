import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateArticleDto, UpdateArticleDto, ArticleQueryDto } from './dto/article.dto';
import slugify from 'slugify';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateArticleDto) {
    const base = slugify(dto.title, { lower: true, strict: true });
    let finalSlug = base;
    let counter = 1;
    while (await this.prisma.article.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${base}-${counter++}`;
    }

    return this.prisma.article.create({
      data: {
        ...dto,
        slug: finalSlug,
        comparisonProducts: dto.comparisonProducts || [],
        relatedArticles: dto.relatedArticles || [],
        publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : null,
      },
      include: { category: true },
    });
  }

  async findAll(query: ArticleQueryDto) {
    const { page = 1, limit = 12, status, type, petType, categoryId, isFeatured, search } = query;

    const where: Record<string, unknown> = { deletedAt: null };
    if (status) where.status = status;
    if (type) where.type = type;
    if (petType) where.petType = petType;
    if (categoryId) where.categoryId = categoryId;
    if (isFeatured !== undefined) where.isFeatured = isFeatured;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        include: { category: true },
        orderBy: { publishedAt: 'desc' },
        skip: (Number(page) - 1) * Number(limit),
        take: Math.min(Number(limit), 50),
      }),
      this.prisma.article.count({ where }),
    ]);

    return {
      data: articles,
      meta: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
    };
  }

  async findBySlug(slug: string) {
    const article = await this.prisma.article.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (!article || article.deletedAt) throw new NotFoundException('Article not found');
    return article;
  }

  async findById(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!article || article.deletedAt) throw new NotFoundException('Article not found');
    return article;
  }

  async update(id: string, dto: UpdateArticleDto) {
    await this.findById(id);
    const data: Record<string, unknown> = { ...dto };
    if (dto.title) {
      data.slug = slugify(dto.title, { lower: true, strict: true });
    }
    if (dto.publishedAt) {
      data.publishedAt = new Date(dto.publishedAt);
    }
    return this.prisma.article.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.article.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getDashboardStats() {
    const [total, published, draft] = await Promise.all([
      this.prisma.article.count({ where: { deletedAt: null } }),
      this.prisma.article.count({ where: { status: 'PUBLISHED', deletedAt: null } }),
      this.prisma.article.count({ where: { status: 'DRAFT', deletedAt: null } }),
    ]);
    return { total, published, draft };
  }
}
