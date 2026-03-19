import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import api from '@/lib/api';
import ArticleCard from '@/components/ui/ArticleCard';
import TrustBar from '@/components/ui/TrustBar';
import AuthorBio from '@/components/ui/AuthorBio';
import TableOfContents from '@/components/ui/TableOfContents';
import FAQAccordion from '@/components/ui/FAQAccordion';
import ShareButtons from '@/components/ui/ShareButtons';
import NewsletterCTA from '@/components/ui/NewsletterCTA';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://petgearhub.co.uk';

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await api.getArticle(slug);
    return {
      title: article.seoTitle || `${article.title} | PetGearHub`,
      description: article.metaDescription || article.excerpt || '',
      openGraph: {
        title: article.seoTitle || article.title,
        description: article.metaDescription || article.excerpt || '',
        type: 'article',
        publishedTime: article.publishedAt,
        modifiedTime: article.updatedAt,
        ...(article.heroImage ? { images: [{ url: article.heroImage }] } : {}),
      },
    };
  } catch {
    return { title: 'Article | PetGearHub' };
  }
}

// ─── Quick Picks box (Buyer's Guide) ───────────────────────────────────────

function QuickPicks({
  picks,
}: {
  picks: Array<{ label: string; productId: string }>;
}) {
  return (
    <div className="bg-amber-50/60 border border-accent/20 rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-accent text-lg" aria-hidden="true">★</span>
        <h2 className="font-display text-lg font-bold text-primary">Our Top Picks</h2>
      </div>
      <ol className="space-y-3">
        {picks.map((pick, i) => (
          <li key={pick.productId} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-xs font-body font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <span className="font-body text-sm text-text-secondary leading-snug">
              {pick.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─── Comparison At a Glance ────────────────────────────────────────────────

function ComparisonGlance({ products }: { products: string[] }) {
  return (
    <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-blue-600 text-lg" aria-hidden="true">⇄</span>
        <h2 className="font-display text-lg font-bold text-primary">Comparison at a Glance</h2>
      </div>
      <p className="text-xs font-body text-text-muted uppercase tracking-widest mb-3">Products compared in this article</p>
      <ul className="space-y-2">
        {products.map((name, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
            <span className="font-body text-sm text-text-secondary">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Related Articles section ──────────────────────────────────────────────

async function RelatedArticles() {
  let articles: Awaited<ReturnType<typeof api.getArticles>>['data'] = [];
  try {
    const res = await api.getArticles({ status: 'PUBLISHED', limit: 3 });
    articles = res.data;
  } catch {
    // Gracefully degrade — show nothing if fetch fails
  }

  if (!articles.length) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border-light">
      <h2 className="font-display text-2xl font-semibold text-primary mb-8">Related Guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="compact" />
        ))}
      </div>
    </section>
  );
}

// ─── Template A — Buyer's Guide ────────────────────────────────────────────

async function BuyersGuideTemplate({
  article,
  articleUrl,
}: {
  article: Awaited<ReturnType<typeof api.getArticle>>;
  articleUrl: string;
}) {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: article.title },
          ]}
        />
      </div>

      {/* Hero image with title overlay */}
      <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-8">
        {article.heroImage ? (
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-primary/70" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          {article.type && (
            <span className="inline-block text-xs font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-accent/10 text-accent mb-3">
              Buyer&apos;s Guide
            </span>
          )}
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="font-body text-white/70 mt-2 text-sm sm:text-base">{article.subtitle}</p>
          )}
        </div>
      </div>

      {/* Trust bar */}
      <div className="mb-8">
        <TrustBar
          authorName={article.authorName}
          authorPhoto={article.authorPhoto}
          authorCredentials={article.authorCredentials}
          reviewerName={article.reviewerName}
          reviewerCredentials={article.reviewerCredentials}
          publishedAt={article.publishedAt}
          updatedAt={article.updatedAt}
          readTime={article.readTime}
        />
      </div>

      {/* Quick Picks */}
      {article.quickPicks && article.quickPicks.length > 0 && (
        <QuickPicks picks={article.quickPicks} />
      )}

      {/* Two-column: main + sidebar */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          <div
            className="article-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />

          {/* FAQs */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="mt-12">
              <FAQAccordion faqs={article.faqs} />
            </div>
          )}

          {/* Author bio */}
          {article.authorName && (
            <div className="mt-12 pt-8 border-t border-border-light">
              <p className="text-xs font-body font-semibold uppercase tracking-widest text-text-muted mb-4">
                About the author
              </p>
              <AuthorBio
                name={article.authorName}
                photo={article.authorPhoto}
                bio={article.authorBio}
                credentials={article.authorCredentials}
                publishedAt={article.publishedAt}
                readTime={article.readTime}
              />
            </div>
          )}

          {/* Share buttons */}
          <div className="mt-8 pt-6 border-t border-border-light">
            <ShareButtons url={articleUrl} title={article.title} />
          </div>

          {/* Related articles */}
          <RelatedArticles />
        </article>

        {/* Sticky sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-6 lg:sticky lg:top-28">
          <TableOfContents contentSelector=".article-content" />
          <NewsletterCTA variant="inline" />
        </aside>
      </div>
    </>
  );
}

// ─── Template B — Comparison ───────────────────────────────────────────────

async function ComparisonTemplate({
  article,
  articleUrl,
}: {
  article: Awaited<ReturnType<typeof api.getArticle>>;
  articleUrl: string;
}) {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: article.title },
          ]}
        />
      </div>

      {/* Hero image with title overlay */}
      <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-8">
        {article.heroImage ? (
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-primary/70" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <span className="inline-block text-xs font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 mb-3">
            Comparison
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="font-body text-white/70 mt-2 text-sm sm:text-base">{article.subtitle}</p>
          )}
        </div>
      </div>

      {/* Trust bar */}
      <div className="mb-8">
        <TrustBar
          authorName={article.authorName}
          authorPhoto={article.authorPhoto}
          authorCredentials={article.authorCredentials}
          reviewerName={article.reviewerName}
          reviewerCredentials={article.reviewerCredentials}
          publishedAt={article.publishedAt}
          updatedAt={article.updatedAt}
          readTime={article.readTime}
        />
      </div>

      {/* Comparison at a glance */}
      {article.comparisonProducts && article.comparisonProducts.length > 0 && (
        <ComparisonGlance products={article.comparisonProducts} />
      )}

      {/* Two-column: main + sidebar */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          <div
            className="article-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />

          {/* FAQs */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="mt-12">
              <FAQAccordion faqs={article.faqs} />
            </div>
          )}

          {/* Author bio */}
          {article.authorName && (
            <div className="mt-12 pt-8 border-t border-border-light">
              <p className="text-xs font-body font-semibold uppercase tracking-widest text-text-muted mb-4">
                About the author
              </p>
              <AuthorBio
                name={article.authorName}
                photo={article.authorPhoto}
                bio={article.authorBio}
                credentials={article.authorCredentials}
                publishedAt={article.publishedAt}
                readTime={article.readTime}
              />
            </div>
          )}

          {/* Share buttons */}
          <div className="mt-8 pt-6 border-t border-border-light">
            <ShareButtons url={articleUrl} title={article.title} />
          </div>

          {/* Related articles */}
          <RelatedArticles />
        </article>

        {/* Sticky sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-6 lg:sticky lg:top-28">
          <TableOfContents contentSelector=".article-content" />
          <NewsletterCTA variant="inline" />
        </aside>
      </div>
    </>
  );
}

// ─── Template C — Blog Post / News ────────────────────────────────────────

function BlogPostTemplate({
  article,
  articleUrl,
}: {
  article: Awaited<ReturnType<typeof api.getArticle>>;
  articleUrl: string;
}) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: article.title },
          ]}
        />
      </div>

      {/* Article header */}
      <header className="mb-8">
        {article.type && (
          <span
            className={`inline-block text-xs font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded mb-4 ${
              article.type === 'news'
                ? 'bg-purple-50 text-purple-700'
                : 'bg-green-50 text-green-700'
            }`}
          >
            {article.type === 'news' ? 'News' : 'Blog Post'}
          </span>
        )}
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary leading-tight mb-3">
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="font-body text-text-secondary text-lg leading-relaxed">{article.subtitle}</p>
        )}
      </header>

      {/* Trust bar */}
      <div className="mb-8">
        <TrustBar
          authorName={article.authorName}
          authorPhoto={article.authorPhoto}
          authorCredentials={article.authorCredentials}
          reviewerName={article.reviewerName}
          reviewerCredentials={article.reviewerCredentials}
          publishedAt={article.publishedAt}
          updatedAt={article.updatedAt}
          readTime={article.readTime}
        />
      </div>

      {/* Hero image */}
      {article.heroImage && (
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-10">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div
        className="article-content prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content || '' }}
      />

      {/* Author bio */}
      {article.authorName && (
        <div className="mt-12 pt-8 border-t border-border-light">
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-text-muted mb-4">
            About the author
          </p>
          <AuthorBio
            name={article.authorName}
            photo={article.authorPhoto}
            bio={article.authorBio}
            credentials={article.authorCredentials}
            publishedAt={article.publishedAt}
            readTime={article.readTime}
          />
        </div>
      )}

      {/* Share buttons */}
      <div className="mt-8 pt-6 border-t border-border-light">
        <ShareButtons url={articleUrl} title={article.title} />
      </div>

      {/* Newsletter */}
      <div className="mt-12">
        <NewsletterCTA variant="full" />
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article: Awaited<ReturnType<typeof api.getArticle>>;
  try {
    article = await api.getArticle(slug);
  } catch {
    notFound();
  }

  if (!article || article.status !== 'PUBLISHED') {
    notFound();
  }

  const articleUrl = `${SITE_URL}/blog/${article.slug}`;

  return (
    <div className="pt-24 lg:pt-32 pb-24">
      <div className="editorial-container">
        {article.type === 'buyers-guide' && (
          <BuyersGuideTemplate article={article} articleUrl={articleUrl} />
        )}
        {article.type === 'comparison' && (
          <ComparisonTemplate article={article} articleUrl={articleUrl} />
        )}
        {(article.type === 'blog-post' || article.type === 'news') && (
          <BlogPostTemplate article={article} articleUrl={articleUrl} />
        )}
      </div>
    </div>
  );
}
