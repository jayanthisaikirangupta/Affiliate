'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import type { Product } from '@/lib/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1 });
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params: Record<string, string | number | boolean> = { page, limit: 20 };
      if (filter) params.status = filter;
      if (search) params.search = search;
      const res = await api.getProducts(params);
      setProducts(res.data);
      setMeta(res.meta);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [filter, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(1);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await api.deleteProduct(id);
      fetchProducts(meta.page);
    } catch (e) {
      alert('Failed to delete product');
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.updateProduct(id, { status });
      fetchProducts(meta.page);
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return '—';
    return `$${price.toFixed(2)}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary">Products</h1>
          <p className="text-sm font-body text-text-secondary mt-1">{meta.total} total products</p>
        </div>
        <Link href="/admin/add" className="btn-primary text-xs">+ Add Product</Link>
      </div>

      {/* Filters and search */}
      <div className="admin-card mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex gap-2">
            {['', 'PUBLISHED', 'DRAFT', 'ARCHIVED'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-colors ${
                  filter === s ? 'bg-primary text-white' : 'bg-background text-text-secondary hover:bg-border-light'
                }`}
              >
                {s || 'All'}
              </button>
            ))}
          </div>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input w-64"
              placeholder="Search products..."
            />
            <button type="submit" className="btn-outline text-xs">Search</button>
          </form>
        </div>
      </div>

      {/* Products table */}
      <div className="admin-card overflow-x-auto">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 bg-background rounded animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left text-xs font-body font-semibold text-text-muted uppercase tracking-wide pb-3">
                  Product
                </th>
                <th className="text-left text-xs font-body font-semibold text-text-muted uppercase tracking-wide pb-3">
                  Category
                </th>
                <th className="text-left text-xs font-body font-semibold text-text-muted uppercase tracking-wide pb-3">
                  Price
                </th>
                <th className="text-left text-xs font-body font-semibold text-text-muted uppercase tracking-wide pb-3">
                  Status
                </th>
                <th className="text-right text-xs font-body font-semibold text-text-muted uppercase tracking-wide pb-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {products.map((product) => (
                <tr key={product.id} className="group">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-background overflow-hidden flex-shrink-0">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-border text-xs">C</div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-body font-medium text-primary line-clamp-1 max-w-xs">
                          {product.title}
                        </p>
                        <p className="text-xs text-text-muted capitalize">{product.platform || '—'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-sm font-body text-text-secondary">
                      {product.category?.name || '—'}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="text-sm font-body font-medium text-primary">
                      {formatPrice(product.price)}
                    </span>
                  </td>
                  <td className="py-3">
                    <select
                      value={product.status}
                      onChange={(e) => handleStatusChange(product.id, e.target.value)}
                      className={`text-xs font-body font-semibold px-2 py-1 rounded border-0 cursor-pointer ${
                        product.status === 'PUBLISHED'
                          ? 'bg-green-50 text-green-700'
                          : product.status === 'DRAFT'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-xs font-body text-accent hover:underline font-medium"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="text-xs font-body text-text-muted hover:text-accent"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.title)}
                        className="text-xs font-body text-red-400 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-text-muted font-body py-8 text-center">
            No products found. <Link href="/admin/add" className="text-accent hover:underline">Add your first product</Link>
          </p>
        )}

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-6 mt-6 border-t border-border-light">
            {Array.from({ length: meta.totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => fetchProducts(i + 1)}
                className={`w-8 h-8 rounded text-xs font-body font-medium ${
                  meta.page === i + 1 ? 'bg-accent text-white' : 'text-text-muted hover:bg-background'
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
