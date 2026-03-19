import { MetadataRoute } from 'next';

const BASE_URL = 'https://petgearhub.co.uk';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/deals`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/editorial-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/affiliate-disclosure`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  // Dynamic product pages
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/products?limit=500&status=PUBLISHED`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const products = data.data || [];
      productRoutes = products.map((p: { slug: string; updatedAt: string }) => ({
        url: `${BASE_URL}/products/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch { /* ignore */ }

  // Dynamic article pages
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_URL}/articles?limit=500&status=PUBLISHED`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const articles = data.data || [];
      articleRoutes = articles.map((a: { slug: string; updatedAt: string; publishedAt?: string }) => ({
        url: `${BASE_URL}/blog/${a.slug}`,
        lastModified: new Date(a.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }));
    }
  } catch { /* ignore */ }

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
