import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import AffiliateButton from '@/components/ui/AffiliateButton';
import SpecsTable from '@/components/ui/SpecsTable';
import ProsConsBox from '@/components/ui/ProsConsBox';
import StarRating from '@/components/ui/StarRating';
import CalloutBox from '@/components/ui/CalloutBox';
import ShareButtons from '@/components/ui/ShareButtons';
import DealCountdown from '@/components/ui/DealCountdown';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PriceDisplay from '@/components/ui/PriceDisplay';
import ProductCard from '@/components/public/ProductCard';
import ImageGallery from './_components/ImageGallery';
import TrackView from './_components/TrackView';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const SITE_URL = 'https://petgearhub.co.uk';

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${slug}`, {
      next: { revalidate: 300 },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch {
    return null;
  }
}

async function getRelatedProducts(categoryId: string, excludeId: string): Promise<Product[]> {
  try {
    const params = new URLSearchParams({
      limit: '4',
      categoryId,
      status: 'PUBLISHED',
    });
    const res = await fetch(`${API_URL}/products?${params}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const products: Product[] = data.data ?? data;
    return products.filter((p) => p.id !== excludeId).slice(0, 4);
  } catch {
    return [];
  }
}

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const product = await getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.seoTitle || product.title,
    description: product.metaDescription || product.description,
    openGraph: {
      title: product.seoTitle || product.title,
      description: product.metaDescription || product.description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.categoryId
    ? await getRelatedProducts(product.categoryId, product.id)
    : [];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    ...(product.category
      ? [{ label: product.category.name, href: `/categories/${product.category.slug}` }]
      : []),
    { label: product.title },
  ];

  // JSON-LD Product schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images,
    brand: product.brand
      ? { '@type': 'Brand', name: product.brand }
      : undefined,
    offers: product.price
      ? {
          '@type': 'Offer',
          priceCurrency: 'GBP',
          price: product.price.toFixed(2),
          availability: 'https://schema.org/InStock',
          url: product.affiliateLink,
        }
      : undefined,
    aggregateRating: product.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating.toFixed(1),
          reviewCount: product.reviewCount ?? 1,
        }
      : undefined,
  };

  // Build affiliate links array: prefer product.affiliateLinks, fall back to single affiliateLink
  const affiliateLinks =
    product.affiliateLinks && product.affiliateLinks.length > 0
      ? product.affiliateLinks
      : product.affiliateLink
      ? [{ retailer: product.platform || 'View on Retailer', url: product.affiliateLink }]
      : [];

  // Merge specs: product.specs takes precedence, fall back to product.specifications
  const hasSpecs =
    (product.specs && product.specs.length > 0) ||
    (product.specifications && Object.keys(product.specifications).length > 0);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Track view (client island) */}
      <TrackView productId={product.id} />

      {/* Breadcrumbs */}
      <div className="pt-24 lg:pt-28">
        <div className="editorial-container">
          <div className="py-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>
      </div>

      {/* Main product section */}
      <section className="pb-16 lg:pb-24">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* ── Left: Image Gallery ───────────────── */}
            <ImageGallery images={product.images} title={product.title} />

            {/* ── Right: Product Info ───────────────── */}
            <div className="lg:sticky lg:top-28 lg:self-start">

              {/* Badges row */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {product.category && (
                  <Link
                    href={`/categories/${product.category.slug}`}
                    className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-amber-500 hover:underline underline-offset-4"
                  >
                    {product.category.name}
                  </Link>
                )}
                {product.isStaffPick && (
                  <span className="px-2.5 py-0.5 bg-navy-900 text-white text-[10px] font-body font-semibold uppercase tracking-widest rounded-full">
                    Staff Pick
                  </span>
                )}
                {product.isDeal && (
                  <span className="px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-body font-semibold uppercase tracking-widest rounded-full">
                    Deal
                  </span>
                )}
                {product.petType && (
                  <span className="px-2.5 py-0.5 bg-warm-100 border border-warm-200 text-[10px] font-body text-warm-600 uppercase tracking-widest rounded-full">
                    {product.petType}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl lg:text-4xl font-semibold text-navy-900 mb-1 leading-tight">
                {product.title}
              </h1>

              {/* Brand */}
              {product.brand && (
                <p className="text-sm font-body text-warm-600 mb-3">
                  by <span className="font-semibold text-navy-700">{product.brand}</span>
                </p>
              )}

              {/* Star Rating */}
              {product.rating != null && (
                <div className="mb-5">
                  <StarRating
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    size="md"
                  />
                </div>
              )}

              {/* Price + Deal Countdown */}
              <div className="flex flex-col gap-2 mb-6 pb-6 border-b border-warm-200">
                <PriceDisplay
                  price={product.price}
                  originalPrice={product.originalPrice}
                  size="lg"
                />
                {product.isDeal && product.dealExpiry && (
                  <DealCountdown expiryDate={product.dealExpiry} />
                )}
              </div>

              {/* AI Summary */}
              {product.aiSummary && (
                <div className="mb-6">
                  <h3 className="text-xs font-body font-semibold text-navy-700 uppercase tracking-[0.2em] mb-2">
                    Our Take
                  </h3>
                  <p className="text-navy-900 font-body leading-relaxed text-sm">
                    {product.aiSummary}
                  </p>
                </div>
              )}

              {/* Pros & Cons */}
              {(product.pros?.length > 0 || product.cons?.length > 0) && (
                <div className="mb-6">
                  <ProsConsBox pros={product.pros ?? []} cons={product.cons ?? []} />
                </div>
              )}

              {/* Affiliate Buttons */}
              {affiliateLinks.length > 0 && (
                <div className="flex flex-col gap-3 mb-4">
                  {affiliateLinks.map((link, i) => (
                    <AffiliateButton
                      key={i}
                      link={link}
                      productId={product.id}
                      variant={i === 0 ? 'primary' : 'outline'}
                      size="lg"
                      className="w-full"
                    />
                  ))}
                </div>
              )}

              <p className="text-xs text-warm-600 text-center font-body mb-6">
                As an affiliate, we earn from qualifying purchases.
              </p>

              {/* Editorial Note */}
              {product.editorialNote && (
                <CalloutBox type="tip" title="Editorial Note">
                  {product.editorialNote}
                </CalloutBox>
              )}

              {/* Share */}
              <div className="mt-4">
                <ShareButtons
                  url={`${SITE_URL}/products/${product.slug}`}
                  title={product.title}
                />
              </div>
            </div>
          </div>

          {/* ── Full-width lower sections ─────────── */}
          <div className="mt-16 pt-16 border-t border-warm-200 grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Description (2/3 width) */}
            <div className="lg:col-span-2 space-y-10">
              {product.description && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-navy-900 mb-4">
                    About this product
                  </h2>
                  <p className="text-navy-900 font-body leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}
            </div>

            {/* Specs sidebar (1/3 width) */}
            {hasSpecs && (
              <div>
                {product.specs && product.specs.length > 0 ? (
                  <SpecsTable specs={product.specs} title="Specifications" />
                ) : product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <SpecsTable specs={product.specifications} title="Specifications" />
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Related Products ─────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="pb-24 border-t border-warm-200 pt-16">
          <div className="editorial-container">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="font-display text-2xl lg:text-3xl font-semibold text-navy-900">
                You might also like
              </h2>
              <Link
                href={`/products${product.categoryId ? `?categoryId=${product.categoryId}` : ''}`}
                className="text-sm font-body text-amber-500 hover:underline underline-offset-4"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
