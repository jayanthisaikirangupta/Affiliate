import { IsString, IsOptional, IsNumber, IsArray, IsBoolean, IsEnum, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) price?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) originalPrice?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() currency?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) rating?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Type(() => Number) reviewCount?: number;
  @ApiProperty() @IsArray() @IsString({ each: true }) images: string[];
  @ApiProperty() @IsString() affiliateLink: string;
  @ApiPropertyOptional() @IsOptional() @IsString() platform?: string;
  @ApiPropertyOptional() @IsOptional() @IsArray() @IsString({ each: true }) pros?: string[];
  @ApiPropertyOptional() @IsOptional() @IsArray() @IsString({ each: true }) cons?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() aiSummary?: string;
  @ApiPropertyOptional() @IsOptional() specifications?: any;
  @ApiPropertyOptional() @IsOptional() @IsString() seoTitle?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() metaDescription?: string;
  @ApiPropertyOptional() @IsOptional() @IsEnum(['DRAFT', 'PUBLISHED', 'ARCHIVED']) status?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() featured?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() categoryId?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class ProductQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Type(() => Number) page?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Type(() => Number) limit?: number;
  @ApiPropertyOptional() @IsOptional() @IsEnum(['DRAFT', 'PUBLISHED', 'ARCHIVED']) status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() categoryId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() petType?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) minPrice?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) maxPrice?: number;
  @ApiPropertyOptional() @IsOptional() @Transform(({ value }) => value === 'true') @IsBoolean() featured?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() sortBy?: string;
  @ApiPropertyOptional() @IsOptional() @IsEnum(['asc', 'desc']) sortOrder?: 'asc' | 'desc';
}
