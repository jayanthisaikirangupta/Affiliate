'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

interface Article {
  id: string;
  title: string;
  slug: string;
  type?: string; // 'buyers-guide' | 'comparison' | 'blog-post' | 'news'
  status: 'PUBLISHED' | 'DRAFT';
  publishedAt?: string;
  updatedAt: string;
}

const TYPE_STYLES: Record<string, { label: string; className: string }> = {
  'buyers-guide': { label: "Buyer's Guide", className: 'bg-orange-50 text-orange-700' },
  comparison:     { label: 'Comparison',    className: 'bg-blue-50 text-blue-700' },
  'blog-post':    { label: 'Blog Post',     className: 'bg-green-50 text-green-700' },
  news:           { label: 'News',          className: 'bg-purple-50 text-purple-700' },
};

const STATUS_FILTERS = ['', 'PUBLISHED', 'DRAFT'] as const;

function formatDate(iso?: string) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1 });
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchArticles = useCallback(async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const params: Record<string, string | number> = { page, limit: 20 };
      if (statusFilter) params.status = statusFilter;
      if (search) params.search = search;
      const res = await api.getArticles(params);
      setArticles(res.data);
      setMeta(res.meta);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to load articles';
      setError(msg);
    }
    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => {
    fetchArticles(1);
  }, [fetchArticles]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await api.deleteArticle(id);
      fetchArticles(meta.page);
    } catch {
      alert('Failed to delete article.');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary">Articles</h1>
          <p className="text-sm font-body text-navy-700 mt-1">
            {loading ? 'Loading...' : `${meta.total} total article${meta.total !== 1 ? 's' : ''}`}
          </p>
        </div>
        <Link href="/admin/articles/new" className="btn-primary text-xs">
          + New Article
        </Link>
      </div>

      {/* Filters and search */}
      <div className="admin-card mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex gap-2">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s || 'all'}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-colors ${
                  statusFilter === s
                    ? 'bg-primary text-white'
                    : 'bg-background text-navy-700 hover:bg-border-light'
                }`}
              >
                {s || 'All'}
              </button>
            ))}
          </div>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="admin-input w-64"
              placeholder="Search articles..."
            />
            <button type="submit" className="btn-outline text-xs">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm font-body text-red-700">{error}</p>
        </div>
      )}

      {/* Articles table */}
      <div className="admin-card overflow-x-auto">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 bg-background rounded animate-pulse" />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-warm-200">
                <th className="text-left text-xs font-body font-semibold text-warm-600 uppercase tracking-wide pb-3">
                  Title
                </th>
                <th className="text-left text-xs font-body font-semibold text-warm-600 uppercase tracking-wide pb-3">
                  Type
                </th>
                <th className="text-left text-xs font-body font-semibold text-warm-600 uppercase tracking-wide pb-3">
                  Status
                </th>
                <th className="text-left text-xs font-body font-semibold text-warm-600 uppercase tracking-wide pb-3">
                  Published
                </th>
                <th className="text-right text-xs font-body font-semibold text-warm-600 uppercase tracking-wide pb-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {articles.map((article) => {
                const typeStyle = article.type ? TYPE_STYLES[article.type] : null;
                return (
                  <tr key={article.id} className="group">
                    {/* Title */}
                    <td className="py-3 pr-4 max-w-xs">
                      <p className="text-sm font-body font-medium text-primary line-clamp-1">
                        {article.title}
                      </p>
                      <p className="text-xs text-warm-600 mt-0.5">{article.slug}</p>
                    </td>

                    {/* Type badge */}
                    <td className="py-3 pr-4">
                      {typeStyle ? (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-body font-semibold uppercase ${typeStyle.className}`}
                        >
                          {typeStyle.label}
                        </span>
                      ) : (
                        <span className="text-xs text-warm-600">—</span>
                      )}
                    </td>

                    {/* Status badge */}
                    <td className="py-3 pr-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-body font-semibold uppercase ${
                          article.status === 'PUBLISHED'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-orange-50 text-orange-700'
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>

                    {/* Published date */}
                    <td className="py-3 pr-4">
                      <span className="text-sm font-body text-navy-700">
                        {formatDate(article.publishedAt)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="text-xs font-body text-orange-500 hover:underline font-medium"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/articles/${article.slug}`}
                          target="_blank"
                          className="text-xs font-body text-warm-600 hover:text-orange-500"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          className="text-xs font-body text-red-400 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-warm-600 font-body py-8 text-center">
            No articles found.{' '}
            <Link href="/admin/articles/new" className="text-orange-500 hover:underline">
              Create your first article
            </Link>
          </p>
        )}

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-6 mt-6 border-t border-warm-200">
            {Array.from({ length: meta.totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => fetchArticles(i + 1)}
                className={`w-8 h-8 rounded text-xs font-body font-medium transition-colors ${
                  meta.page === i + 1
                    ? 'bg-orange-500 text-white'
                    : 'text-warm-600 hover:bg-background'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
