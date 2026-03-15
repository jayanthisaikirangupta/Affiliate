import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  async subscribe(email: string) {
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email },
    });
    if (existing) {
      throw new ConflictException('Email already subscribed');
    }
    await this.prisma.newsletterSubscriber.create({ data: { email } });
    return { message: 'Successfully subscribed to the newsletter' };
  }

  async unsubscribe(email: string) {
    await this.prisma.newsletterSubscriber.deleteMany({ where: { email } });
    return { message: 'Successfully unsubscribed' };
  }

  async findAll() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
