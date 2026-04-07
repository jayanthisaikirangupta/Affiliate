'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

interface ArticleFormState {
  title: string;
  slug: string;
  subtitle: string;
  type: string;
  status: string;
  excerpt: string;
  content: string;
  heroImageUrl: string;
  seoTitle: string;
  metaDescription: string;
  readTime: string;
  authorName: string;
}

const ARTICLE_TYPES = [
  { value: 'buyers-guide', label: "Buyer's Guide" },
  { value: 'comparison',   label: 'Comparison' },
  { value: 'blog-post',    label: 'Blog Post' },
  { value: 'news',         label: 'News' },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);

  const [form, setForm] = useState<ArticleFormState>({
    title: '',
    slug: '',
    subtitle: '',
    type: 'blog-post',
    status: 'DRAFT',
    excerpt: '',
    content: '',
    heroImageUrl: '',
    seoTitle: '',
    metaDescription: '',
    readTime: '',
    authorName: '',
  });

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    api
      .getArticleById(id)
      .then((article) => {
        setForm({
          title: article.title ?? '',
          slug: article.slug ?? '',
          subtitle: article.subtitle ?? '',
          type: article.type ?? 'blog-post',
          status: article.status ?? 'DRAFT',
          excerpt: article.excerpt ?? '',
          content: article.content ?? '',
          heroImageUrl: article.heroImage ?? '',
          seoTitle: article.seoTitle ?? '',
          metaDescription: article.metaDescription ?? '',
          readTime: article.readTime != null ? String(article.readTime) : '',
          authorName: article.authorName ?? '',
        });
        setSlugEdited(true); // treat loaded slug as manually set — don't auto-overwrite
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const updateForm = (field: keyof ArticleFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      title: value,
      // Only auto-generate slug if user hasn't manually edited it
      slug: slugEdited ? prev.slug : slugify(value),
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugEdited(true);
    updateForm('slug', e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!form.slug.trim()) {
      setError('Slug is required.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await api.updateArticle(id, {
        title: form.title,
        slug: form.slug,
        subtitle: form.subtitle || undefined,
        type: form.type || undefined,
        status: form.status,
        excerpt: form.excerpt || undefined,
        content: form.content || undefined,
        heroImageUrl: form.heroImageUrl || undefined,
        seoTitle: form.seoTitle || undefined,
        metaDescription: form.metaDescription || undefined,
        readTime: form.readTime ? parseInt(form.readTime, 10) : undefined,
        authorName: form.authorName || undefined,
      });
      router.push('/admin/articles');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update article';
      setError(msg);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-card max-w-2xl mx-auto text-center py-12">
        <div
          className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"
          aria-label="Loading"
        />
        <h2 className="font-display text-lg font-semibold text-primary mb-2">Loading Article</h2>
        <p className="text-sm font-body text-navy-700">Please wait...</p>
      </div>
    );
  }

  if (saving) {
    return (
      <div className="admin-card max-w-2xl mx-auto text-center py-12">
        <div
          className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"
          aria-label="Saving"
        />
        <h2 className="font-display text-lg font-semibold text-primary mb-2">Saving Article</h2>
        <p className="text-sm font-body text-navy-700">Please wait...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/admin/articles"
            className="text-xs font-body text-warm-600 hover:text-amber-500 transition-colors mb-2 inline-block"
          >
            ← Back to Articles
          </Link>
          <h1 className="font-display text-2xl font-semibold text-primary">Edit Article</h1>
          <p className="text-sm font-body text-navy-700 mt-1">
            Update the details below to edit this article
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm font-body text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content — left 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic info */}
            <div className="admin-card">
              <h2 className="font-display text-lg font-semibold text-primary mb-4">Article Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="admin-label" htmlFor="title">Title *</label>
                  <input
                    id="title"
                    type="text"
                    value={form.title}
                    onChange={handleTitleChange}
                    className="admin-input"
                    placeholder="e.g. Best Dog Harnesses for 2026"
                    required
                  />
                </div>

                <div>
                  <label className="admin-label" htmlFor="slug">Slug *</label>
                  <input
                    id="slug"
                    type="text"
                    value={form.slug}
                    onChange={handleSlugChange}
                    className="admin-input font-mono text-sm"
                    placeholder="best-dog-harnesses-2026"
                    required
                  />
                  <p className="text-xs text-warm-600 mt-1">
                    URL: /articles/{form.slug || 'your-slug-here'}
                  </p>
                </div>

                <div>
                  <label className="admin-label" htmlFor="subtitle">Subtitle</label>
                  <input
                    id="subtitle"
                    type="text"
                    value={form.subtitle}
                    onChange={(e) => updateForm('subtitle', e.target.value)}
                    className="admin-input"
                    placeholder="A short supporting headline"
                  />
                </div>

                <div>
                  <label className="admin-label" htmlFor="excerpt">Excerpt</label>
                  <textarea
                    id="excerpt"
                    value={form.excerpt}
                    onChange={(e) => updateForm('excerpt', e.target.value)}
                    className="admin-input min-h-[80px] resize-y"
                    placeholder="A brief summary shown in article listings..."
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="admin-card">
              <h2 className="font-display text-lg font-semibold text-primary mb-4">Content</h2>
              <div className="space-y-4">
                <div>
                  <label className="admin-label" htmlFor="content">Body (HTML)</label>
                  <textarea
                    id="content"
                    value={form.content}
                    onChange={(e) => updateForm('content', e.target.value)}
                    className="admin-input min-h-[300px] resize-y font-mono text-sm"
                    placeholder="<p>Write your article content here...</p>"
                  />
                  <p className="text-xs text-warm-600 mt-1">
                    HTML is supported. Use heading tags, paragraphs, lists, etc.
                  </p>
                </div>

                <div>
                  <label className="admin-label" htmlFor="heroImageUrl">Hero Image URL</label>
                  <input
                    id="heroImageUrl"
                    type="url"
                    value={form.heroImageUrl}
                    onChange={(e) => updateForm('heroImageUrl', e.target.value)}
                    className="admin-input"
                    placeholder="https://example.com/hero.jpg"
                  />
                  {form.heroImageUrl && (
                    <div className="mt-3 aspect-video w-48 rounded-lg overflow-hidden bg-background border border-warm-200">
                      <img
                        src={form.heroImageUrl}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="admin-card">
              <h2 className="font-display text-lg font-semibold text-primary mb-4">SEO</h2>
              <div className="space-y-4">
                <div>
                  <label className="admin-label" htmlFor="seoTitle">SEO Title</label>
                  <input
                    id="seoTitle"
                    type="text"
                    value={form.seoTitle}
                    onChange={(e) => updateForm('seoTitle', e.target.value)}
                    className="admin-input"
                    placeholder="SEO-optimized title (leave blank to use article title)"
                  />
                  <p className="text-xs text-warm-600 mt-1">
                    {form.seoTitle.length}/60 characters
                  </p>
                </div>
                <div>
                  <label className="admin-label" htmlFor="metaDescription">Meta Description</label>
                  <textarea
                    id="metaDescription"
                    value={form.metaDescription}
                    onChange={(e) => updateForm('metaDescription', e.target.value)}
                    className="admin-input min-h-[80px] resize-y"
                    placeholder="Brief description for search engines (150–160 characters recommended)"
                  />
                  <p className="text-xs text-warm-600 mt-1">
                    {form.metaDescription.length}/160 characters
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar — right 1 column */}
          <div className="space-y-6 self-start sticky top-24">
            {/* Publish card */}
            <div className="admin-card">
              <h2 className="font-display text-lg font-semibold text-primary mb-4">Publish</h2>
              <div className="space-y-4">
                <div>
                  <label className="admin-label" htmlFor="type">Article Type</label>
                  <select
                    id="type"
                    value={form.type}
                    onChange={(e) => updateForm('type', e.target.value)}
                    className="admin-input"
                  >
                    {ARTICLE_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="admin-label" htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(e) => updateForm('status', e.target.value)}
                    className="admin-input"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>

                <div>
                  <label className="admin-label" htmlFor="authorName">Author Name</label>
                  <input
                    id="authorName"
                    type="text"
                    value={form.authorName}
                    onChange={(e) => updateForm('authorName', e.target.value)}
                    className="admin-input"
                    placeholder="e.g. Jane Smith"
                  />
                </div>

                <div>
                  <label className="admin-label" htmlFor="readTime">Read Time (minutes)</label>
                  <input
                    id="readTime"
                    type="number"
                    min="1"
                    value={form.readTime}
                    onChange={(e) => updateForm('readTime', e.target.value)}
                    className="admin-input"
                    placeholder="5"
                  />
                </div>

                <div className="border-t border-warm-200 pt-4 space-y-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full btn-primary text-xs disabled:opacity-40"
                  >
                    {form.status === 'PUBLISHED' ? 'Update Article' : 'Save as Draft'}
                  </button>
                  <Link
                    href="/admin/articles"
                    className="w-full btn-outline text-xs text-center block"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>

            {/* Type badge preview */}
            {form.type && (
              <div className="admin-card">
                <h2 className="font-display text-sm font-semibold text-navy-700 mb-3">
                  Badge Preview
                </h2>
                <div className="flex gap-2 flex-wrap">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-body font-semibold uppercase ${
                      form.type === 'buyers-guide'
                        ? 'bg-amber-50 text-amber-700'
                        : form.type === 'comparison'
                        ? 'bg-blue-50 text-blue-700'
                        : form.type === 'blog-post'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-purple-50 text-purple-700'
                    }`}
                  >
                    {ARTICLE_TYPES.find((t) => t.value === form.type)?.label ?? form.type}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-body font-semibold uppercase ${
                      form.status === 'PUBLISHED'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {form.status}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
