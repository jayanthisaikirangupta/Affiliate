import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ArticleCard from '@/components/ui/ArticleCard';
import ProductCard from '@/components/public/ProductCard';
import type { Product, Article } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

/* ─── Metadata ──────────────────────────────────────────── */

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q
    ? `Search results for "${q}"`
    : 'Search';
  return {
    title,
    description: q
      ? `Find pet products and expert guides matching "${q}" at PetGearHub.`
      : 'Search for pet products, buyer\'s guides, and expert reviews at PetGearHub.',
  };
}

/* ─── Data fetching ─────────────────────────────────────── */

async function fetchSearchResults(q: string): Promise<{
  products: Product[];
  productTotal: number;
  articles: Article[];
  articleTotal: number;
}> {
  const encodedQ = encodeURIComponent(q);

  const [productsRes, articlesRes] = await Promise.allSettled([
    fetch(
      `${API_URL}/products?search=${encodedQ}&limit=12&status=PUBLISHED`,
      { next: { revalidate: 60 } }
    ),
    fetch(
      `${API_URL}/articles?search=${encodedQ}&limit=6&status=PUBLISHED`,
      { next: { revalidate: 60 } }
    ),
  ]);

  let products: Product[] = [];
  let productTotal = 0;
  let articles: Article[] = [];
  let articleTotal = 0;

  if (productsRes.status === 'fulfilled' && productsRes.value.ok) {
    const json: { data: Product[]; meta: { total: number } } =
      await productsRes.value.json();
    products = json.data ?? [];
    productTotal = json.meta?.total ?? products.length;
  }

  if (articlesRes.status === 'fulfilled' && articlesRes.value.ok) {
    const json: { data: Article[]; meta: { total: number } } =
      await articlesRes.value.json();
    articles = json.data ?? [];
    articleTotal = json.meta?.total ?? articles.length;
  }

  return { products, productTotal, articles, articleTotal };
}

/* ─── Page ──────────────────────────────────────────────── */

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  /* No query — empty state */
  if (!query) {
    return (
      <div className="pt-24 lg:pt-32 pb-24">
        <div className="editorial-container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />

          <div className="mt-12 flex flex-col items-center justify-center text-center py-24 border border-border-light rounded-2xl bg-white">
            <SearchIcon className="w-12 h-12 text-border mb-6" />
            <h1 className="font-display text-3xl text-primary font-bold mb-3">
              What are you looking for?
            </h1>
            <p className="text-text-secondary font-body text-base max-w-md leading-relaxed mb-8">
              Search for pet products, expert buyer&apos;s guides, comparisons, and more — all handpicked for UK pet owners.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Dog leads', 'Cat beds', 'Fish tanks', 'Small pets'].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="btn-outline text-sm"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { products, productTotal, articles, articleTotal } = await fetchSearchResults(query);
  const totalResults = productTotal + articleTotal;
  const hasResults = products.length > 0 || articles.length > 0;

  return (
    <div className="pt-24 lg:pt-32 pb-24">
      <div className="editorial-container">

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Search', href: '/search' },
            { label: `"${query}"` },
          ]}
        />

        {/* Page header */}
        <div className="mt-10 mb-12">
          <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent">
            Search
          </span>
          <h1 className="font-display text-hero text-primary mt-3 mb-3">
            Results for &ldquo;{query}&rdquo;
          </h1>
          {hasResults && (
            <p className="text-text-secondary font-body text-base">
              {totalResults} result{totalResults !== 1 ? 's' : ''} found
              {productTotal > 0 && articleTotal > 0
                ? ` — ${productTotal} product${productTotal !== 1 ? 's' : ''} and ${articleTotal} article${articleTotal !== 1 ? 's' : ''}`
                : null}
            </p>
          )}
        </div>

        {/* No results */}
        {!hasResults && (
          <div className="flex flex-col items-center justify-center text-center py-24 border border-border-light rounded-2xl bg-white">
            <SearchIcon className="w-12 h-12 text-border mb-6" />
            <h2 className="font-display text-2xl text-primary font-bold mb-3">
              No results for &ldquo;{query}&rdquo;
            </h2>
            <p className="text-text-secondary font-body text-sm max-w-sm leading-relaxed mb-8">
              We couldn&apos;t find any products or articles matching your search. Try a different term or browse our collections.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/products" className="btn-primary text-sm">
                Browse All Products
              </Link>
              <Link href="/blog" className="btn-outline text-sm">
                Read Our Guides
              </Link>
            </div>
          </div>
        )}

        {/* Products section */}
        {products.length > 0 && (
          <section aria-labelledby="search-products-heading" className="mb-16">
            <div className="flex items-baseline justify-between mb-6">
              <div className="flex items-baseline gap-3">
                <h2
                  id="search-products-heading"
                  className="font-display text-2xl text-primary font-bold"
                >
                  Products
                </h2>
                <span className="font-body text-sm text-text-muted">
                  {productTotal} result{productTotal !== 1 ? 's' : ''}
                </span>
              </div>
              {productTotal > products.length && (
                <Link
                  href={`/products?search=${encodeURIComponent(query)}`}
                  className="font-body text-sm font-semibold text-accent hover:underline underline-offset-4"
                >
                  View all {productTotal} →
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} variant="default" />
              ))}
            </div>
          </section>
        )}

        {/* Divider between sections */}
        {products.length > 0 && articles.length > 0 && (
          <hr className="border-border-light mb-16" />
        )}

        {/* Articles section */}
        {articles.length > 0 && (
          <section aria-labelledby="search-articles-heading">
            <div className="flex items-baseline justify-between mb-6">
              <div className="flex items-baseline gap-3">
                <h2
                  id="search-articles-heading"
                  className="font-display text-2xl text-primary font-bold"
                >
                  Articles &amp; Guides
                </h2>
                <span className="font-body text-sm text-text-muted">
                  {articleTotal} result{articleTotal !== 1 ? 's' : ''}
                </span>
              </div>
              {articleTotal > articles.length && (
                <Link
                  href={`/blog?search=${encodeURIComponent(query)}`}
                  className="font-body text-sm font-semibold text-accent hover:underline underline-offset-4"
                >
                  View all {articleTotal} →
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="default" />
              ))}
            </div>
          </section>
        )}

        {/* Footer nudge when results exist */}
        {hasResults && (
          <div className="mt-16 py-10 px-8 bg-white border border-border-light rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display text-lg text-primary font-semibold mb-1">
                Not quite what you were after?
              </p>
              <p className="text-text-secondary font-body text-sm">
                Browse our full range or read our expert guides to find the perfect match.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/products" className="btn-outline text-sm">
                All Products
              </Link>
              <Link href="/blog" className="btn-primary text-sm">
                Read Guides
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ─── Icons ─────────────────────────────────────────────── */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
}
