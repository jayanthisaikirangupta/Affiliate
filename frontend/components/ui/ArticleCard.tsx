import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';

const typeLabels: Record<string, string> = {
  'buyers-guide': "Buyer's Guide",
  'comparison': 'Comparison',
  'blog-post': 'Blog Post',
  'news': 'News',
};

const typeColors: Record<string, string> = {
  'buyers-guide': 'bg-accent/10 text-accent',
  'comparison': 'bg-blue-50 text-blue-700',
  'blog-post': 'bg-green-50 text-green-700',
  'news': 'bg-purple-50 text-purple-700',
};

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const fmt = (d?: string) =>
    d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;

  if (variant === 'compact') {
    return (
      <Link href={`/blog/${article.slug}`} className="flex items-start gap-3 group">
        {article.heroImage && (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={article.heroImage} alt={article.heroImageAlt || article.title} fill className="object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {article.type && (
            <span className={`inline-block text-[10px] font-semibold font-body uppercase tracking-wider px-1.5 py-0.5 rounded mb-1 ${typeColors[article.type]}`}>
              {typeLabels[article.type]}
            </span>
          )}
          <p className="text-sm font-body font-semibold text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
            {article.title}
          </p>
          {fmt(article.publishedAt) && (
            <p className="text-xs font-body text-text-muted mt-0.5">{fmt(article.publishedAt)}</p>
          )}
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/blog/${article.slug}`} className="group block relative overflow-hidden rounded-2xl">
        <div className="relative h-80 w-full">
          {article.heroImage ? (
            <Image src={article.heroImage} alt={article.heroImageAlt || article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary/70" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {article.type && (
            <span className={`inline-block text-xs font-semibold font-body uppercase tracking-wider px-2 py-0.5 rounded mb-3 ${typeColors[article.type]}`}>
              {typeLabels[article.type]}
            </span>
          )}
          <h3 className="font-display text-xl text-white font-bold leading-snug mb-2 group-hover:text-accent/90 transition-colors">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-sm font-body text-white/70 line-clamp-2 mb-3">{article.excerpt}</p>
          )}
          <div className="flex items-center gap-3 text-xs font-body text-white/60">
            {article.authorName && <span>By {article.authorName}</span>}
            {fmt(article.publishedAt) && <span>{fmt(article.publishedAt)}</span>}
            {article.readTime && <span>{article.readTime} min read</span>}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${article.slug}`} className="group block bg-background border border-border-light rounded-2xl overflow-hidden card-hover">
      {article.heroImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          {article.type && (
            <span className={`text-xs font-semibold font-body uppercase tracking-wider px-2 py-0.5 rounded ${typeColors[article.type]}`}>
              {typeLabels[article.type]}
            </span>
          )}
          {article.category && (
            <span className="text-xs font-body text-text-muted">{article.category.name}</span>
          )}
        </div>
        <h3 className="font-display text-lg text-primary font-bold leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-sm font-body text-text-secondary leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-border-light">
          <div className="flex items-center gap-2">
            {article.authorName && (
              <span className="text-xs font-body text-text-muted">By {article.authorName}</span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs font-body text-text-muted">
            {fmt(article.publishedAt) && <span>{fmt(article.publishedAt)}</span>}
            {article.readTime && <span>{article.readTime} min</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
