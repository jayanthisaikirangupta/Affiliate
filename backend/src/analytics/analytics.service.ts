import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async trackView(productId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await this.prisma.analytics.upsert({
      where: { productId_date: { productId, date: today } },
      update: { views: { increment: 1 } },
      create: { productId, date: today, views: 1 },
    });
  }

  async trackClick(productId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await this.prisma.analytics.upsert({
      where: { productId_date: { productId, date: today } },
      update: { clicks: { increment: 1 } },
      create: { productId, date: today, clicks: 1 },
    });
  }

  async getDashboard(days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const analytics = await this.prisma.analytics.findMany({
      where: { date: { gte: since } },
      include: { product: { select: { title: true, slug: true } } },
      orderBy: { date: 'desc' },
    });

    const totalViews = analytics.reduce((sum, a) => sum + a.views, 0);
    const totalClicks = analytics.reduce((sum, a) => sum + a.clicks, 0);

    // Aggregate by product
    const byProduct = new Map<string, { title: string; views: number; clicks: number }>();
    for (const a of analytics) {
      const key = a.productId;
      const existing = byProduct.get(key) || { title: a.product.title, views: 0, clicks: 0 };
      existing.views += a.views;
      existing.clicks += a.clicks;
      byProduct.set(key, existing);
    }

    // Daily totals
    const byDay = new Map<string, { views: number; clicks: number }>();
    for (const a of analytics) {
      const dateKey = a.date.toISOString().split('T')[0];
      const existing = byDay.get(dateKey) || { views: 0, clicks: 0 };
      existing.views += a.views;
      existing.clicks += a.clicks;
      byDay.set(dateKey, existing);
    }

    return {
      totalViews,
      totalClicks,
      ctr: totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0',
      topProducts: Array.from(byProduct.entries())
        .map(([id, data]) => ({ id, ...data }))
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 10),
      dailyStats: Array.from(byDay.entries())
        .map(([date, data]) => ({ date, ...data }))
        .sort((a, b) => a.date.localeCompare(b.date)),
    };
  }
}
