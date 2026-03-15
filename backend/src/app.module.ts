import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './common/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ExtractionModule } from './extraction/extraction.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { UsersModule } from './users/users.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 30 }]),
    PrismaModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    ExtractionModule,
    AnalyticsModule,
    UsersModule,
    NewsletterModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
