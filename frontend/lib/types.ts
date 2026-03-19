export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  currency: string;
  rating?: number;
  reviewCount?: number;
  images: string[];
  affiliateLink: string;
  platform?: string;
  pros: string[];
  cons: string[];
  aiSummary?: string;
  specifications?: Record<string, string>;
  seoTitle?: string;
  metaDescription?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  categoryId?: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;
  // Enhanced fields (Phase 4)
  editorialNote?: string;
  brand?: string;
  petType?: string;
  subCategory?: string;
  tags?: string[];
  isStaffPick?: boolean;
  isDeal?: boolean;
  dealExpiry?: string;
  affiliateLinks?: Array<{ retailer: string; url: string; price?: string }>;
  specs?: Array<{ key: string; value: string }>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  _count?: { products: number };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  type: 'buyers-guide' | 'comparison' | 'blog-post' | 'news';
  petType?: string;
  heroImage?: string;
  heroImageAlt?: string;
  excerpt?: string;
  content?: string;
  quickPicks?: Array<{ label: string; productId: string }>;
  comparisonProducts?: string[];
  authorName?: string;
  authorPhoto?: string;
  authorBio?: string;
  authorCredentials?: string;
  reviewerName?: string;
  reviewerPhoto?: string;
  reviewerCredentials?: string;
  readTime?: number;
  isFeatured?: boolean;
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  faqs?: Array<{ question: string; answer: string }>;
  relatedArticles?: string[];
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt?: string;
  categoryId?: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'EDITOR';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface DashboardStats {
  total: number;
  published: number;
  draft: number;
  categories: number;
}

export interface AnalyticsDashboard {
  totalViews: number;
  totalClicks: number;
  ctr: string;
  topProducts: Array<{ id: string; title: string; views: number; clicks: number }>;
  dailyStats: Array<{ date: string; views: number; clicks: number }>;
}
