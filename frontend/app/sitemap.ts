import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: process.env.NEXT_PUBLIC_SITE_URL || 'https://petgearhub.vercel.app', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://petgearhub.vercel.app'}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ]
}
