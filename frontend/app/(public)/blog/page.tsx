import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import api from '@/lib/api';
import ArticleCard from '@/components/ui/ArticleCard';
import NewsletterCTA from '@/components/ui/NewsletterCTA';
import BlogFilters from '@/components/public/BlogFilters';

export const metadata: Metadata = {
  title: 'Pet Care Guides & Reviews | PetGearHub',
  description:
    "Expert buyer's guides, honest comparisons, and helpful tips for UK pet owners. Discover the best gear for your dog, cat, and more.",
  openGraph: {
    title: 'Pet Care Guides & Reviews | PetGearHub',
    description:
      "Expert buyer's guides, honest comparisons, and helpful tips for UK pet owners.",
    type: 'website',
  },
};

interface BlogPageProps {
  searchParams: Promise<{ type?: string; petType?: string; page?: string }>;
}

const ARTICLES_PER_PAGE = 9;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const activeType = params.type || '';
  const activePetType = params.petType || '';
  const currentPage = Math.max(1, parseInt(params.page || '1', 10));

  // Build query params for articles list
  const queryParams: Record<string, string | number | boolean> = {
    status: 'PUBLISHED',
    page: currentPage,
    limit: ARTICLES_PER_PAGE,
  };
  if (activeType) queryParams.type = activeType;
  if (activePetType) queryParams.petType = activePetType;

  // Fetch main articles list, featured article, and sidebar data in parallel
  const [articlesRes, featuredArticles, latestArticles] = await Promise.all([
    api.getArticles(queryParams).catch(() => ({
      data: [],
      meta: { total: 0, page: 1, limit: ARTICLES_PER_PAGE, totalPages: 1 },
    })),
    api.getFeaturedArticles(1).catch(() => []),
    api.getArticles({ status: 'PUBLISHED', limit: 3, page: 1 }).catch(() => ({
      data: [],
      meta: { total: 0, page: 1, limit: 3, totalPages: 1 },
    })),
  ]);

  const articles = articlesRes.data;
  const meta = articlesRes.meta;
  const featuredArticle = featuredArticles[0] ?? null;
  const sidebarLatest = latestArticles.data.slice(0, 3);

  // Build prev/next hrefs
  const buildHref = (page: number) => {
    const sp = new URLSearchParams();
    if (activeType) sp.set('type', activeType);
    if (activePetType) sp.set('petType', activePetType);
    if (page > 1) sp.set('page', String(page));
    const qs = sp.toString();
    return `/blog${qs ? `?${qs}` : ''}`;
  };

  return (
    <div className="pt-24 lg:pt-32 pb-24">
      <div className="editorial-container">
        {/* Page header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent">
            Editorial
          </span>
          <h1 className="font-display text-hero text-primary mt-3 mb-4">
            Pet Care Guides &amp; Reviews
          </h1>
          <p className="text-text-secondary font-body text-lg leading-relaxed">
            Expert-written guides, honest comparisons, and practical advice for every kind of pet owner.
          </p>
        </div>

        {/* Filters — client component wrapped in Suspense for useSearchParams */}
        <Suspense fallback={<div className="h-24 animate-pulse bg-border-light rounded-xl mb-10" />}>
          <BlogFilters activeType={activeType} activePetType={activePetType} />
        </Suspense>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* ── MAIN CONTENT ─────────────────────────── */}
          <main className="flex-1 min-w-0">
            {/* Featured article — only on page 1 with no filters */}
            {currentPage === 1 && !activeType && !activePetType && featuredArticle && (
              <div className="mb-10">
                <ArticleCard article={featuredArticle} variant="featured" />
              </div>
            )}

            {/* Articles grid */}
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="default" />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 border border-border-light rounded-2xl bg-white">
                <p className="font-display text-xl text-primary mb-2">No articles found</p>
                <p className="text-text-secondary font-body text-sm">
                  Try adjusting your filters or check back soon.
                </p>
                <Link href="/blog" className="btn-outline mt-6 inline-block text-sm">
                  Clear filters
                </Link>
              </div>
            )}

            {/* Pagination */}
            {meta.totalPages > 1 && (
              <nav
                className="flex items-center justify-center gap-4 mt-14"
                aria-label="Pagination"
              >
                {currentPage > 1 ? (
                  <Link
                    href={buildHref(currentPage - 1)}
                    className="btn-outline text-sm"
                    aria-label="Previous page"
                  >
                    ← Previous
                  </Link>
                ) : (
                  <span className="btn-outline text-sm opacity-40 cursor-not-allowed" aria-disabled="true">
                    ← Previous
                  </span>
                )}

                <span className="font-body text-sm text-text-muted">
                  Page {currentPage} of {meta.totalPages}
                </span>

                {currentPage < meta.totalPages ? (
                  <Link
                    href={buildHref(currentPage + 1)}
                    className="btn-outline text-sm"
                    aria-label="Next page"
                  >
                    Next →
                  </Link>
                ) : (
                  <span className="btn-outline text-sm opacity-40 cursor-not-allowed" aria-disabled="true">
                    Next →
                  </span>
                )}
              </nav>
            )}
          </main>

          {/* ── SIDEBAR ──────────────────────────────── */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8 lg:sticky lg:top-28 lg:self-start">
            {/* Latest articles */}
            <div className="bg-white border border-border-light rounded-2xl p-6">
              <h2 className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted mb-5">
                Latest Articles
              </h2>
              <div className="space-y-5">
                {sidebarLatest.length > 0 ? (
                  sidebarLatest.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="compact" />
                  ))
                ) : (
                  <p className="text-sm font-body text-text-muted">No articles yet.</p>
                )}
              </div>
              <Link
                href="/blog"
                className="block text-center text-xs font-body font-semibold text-accent mt-5 hover:underline underline-offset-4"
              >
                View all articles →
              </Link>
            </div>

            {/* Newsletter */}
            <NewsletterCTA variant="inline" />

            {/* Browse by type */}
            <div className="bg-white border border-border-light rounded-2xl p-6">
              <h2 className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                Browse by Type
              </h2>
              <ul className="space-y-2">
                {[
                  { label: "Buyer's Guides", value: 'buyers-guide' },
                  { label: 'Comparisons', value: 'comparison' },
                  { label: 'Blog Posts', value: 'blog-post' },
                  { label: 'News', value: 'news' },
                ].map(({ label, value }) => (
                  <li key={value}>
                    <Link
                      href={`/blog?type=${value}`}
                      className={`flex items-center justify-between py-1.5 text-sm font-body transition-colors hover:text-accent ${
                        activeType === value ? 'text-accent font-semibold' : 'text-text-secondary'
                      }`}
                    >
                      <span>{label}</span>
                      <span className="text-text-muted text-xs">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
