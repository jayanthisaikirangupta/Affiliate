import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import slugify from 'slugify';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(name: string, description?: string, image?: string) {
    const slug = slugify(name, { lower: true, strict: true });
    const existing = await this.prisma.category.findUnique({ where: { slug } });
    if (existing) throw new ConflictException('Category already exists');

    return this.prisma.category.create({
      data: { name, slug, description, image },
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: { products: { where: { status: 'PUBLISHED', deletedAt: null }, orderBy: { createdAt: 'desc' } } },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, data: { name?: string; description?: string; image?: string }) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');

    const updateData: any = { ...data };
    if (data.name) updateData.slug = slugify(data.name, { lower: true, strict: true });

    return this.prisma.category.update({ where: { id }, data: updateData });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return this.prisma.category.delete({ where: { id } });
  }
}
