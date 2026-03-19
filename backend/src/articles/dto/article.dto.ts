import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsEnum,
  IsDateString,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() subtitle?: string;
  @ApiProperty({ enum: ['buyers-guide', 'comparison', 'blog-post', 'news'] })
  @IsEnum(['buyers-guide', 'comparison', 'blog-post', 'news'])
  type: string;
  @ApiPropertyOptional() @IsOptional() @IsString() petType?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() heroImage?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() heroImageAlt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() excerpt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() content?: string;
  @ApiPropertyOptional() @IsOptional() quickPicks?: Array<{ label: string; productId: string }>;
  @ApiPropertyOptional() @IsOptional() @IsArray() @IsString({ each: true }) comparisonProducts?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() authorName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() authorPhoto?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() authorBio?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() authorCredentials?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reviewerName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reviewerPhoto?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reviewerCredentials?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() readTime?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isFeatured?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() seoTitle?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() metaDescription?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() focusKeyword?: string;
  @ApiPropertyOptional() @IsOptional() faqs?: Array<{ question: string; answer: string }>;
  @ApiPropertyOptional() @IsOptional() @IsArray() @IsString({ each: true }) relatedArticles?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() publishedAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() categoryId?: string;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

export class ArticleQueryDto {
  @ApiPropertyOptional() @IsOptional() page?: number = 1;
  @ApiPropertyOptional() @IsOptional() limit?: number = 12;
  @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() type?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() petType?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() categoryId?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isFeatured?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
}
