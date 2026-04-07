'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import type { DashboardStats, Product } from '@/lib/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ total: 0, published: 0, draft: 0, categories: 0 });
  const [recent, setRecent] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getProductStats().catch(() => ({ total: 0, published: 0, draft: 0, categories: 0 })),
      api.getProducts({ limit: 5, sortBy: 'createdAt', sortOrder: 'desc' }).catch(() => ({ data: [] })),
    ]).then(([s, p]) => {
      setStats(s);
      setRecent(p.data || []);
      setLoading(false);
    });
  }, []);

  const statCards = [
    { label: 'Total Products', value: stats.total, color: 'bg-primary' },
    { label: 'Published', value: stats.published, color: 'bg-green-600' },
    { label: 'Drafts', value: stats.draft, color: 'bg-amber-500' },
    { label: 'Categories', value: stats.categories, color: 'bg-amber-500' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary">Dashboard</h1>
          <p className="text-sm font-body text-navy-700 mt-1">Overview of your product site</p>
        </div>
        <Link href="/admin/add" className="btn-primary text-xs">
          + Add Product
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="admin-card">
            <div className={`w-2 h-2 rounded-full ${card.color} mb-3`} />
            <p className="text-2xl font-display font-bold text-primary">
              {loading ? '—' : card.value}
            </p>
            <p className="text-xs font-body text-warm-600 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <Link href="/admin/add" className="admin-card hover:border-amber-500/30 group">
          <span className="text-2xl mb-2 block">+</span>
          <h3 className="font-body font-semibold text-primary text-sm group-hover:text-amber-500 transition-colors">
            Add New Product
          </h3>
          <p className="text-xs text-warm-600 mt-1">Paste an affiliate link to get started</p>
        </Link>
        <Link href="/admin/products" className="admin-card hover:border-amber-500/30 group">
          <span className="text-2xl mb-2 block">☰</span>
          <h3 className="font-body font-semibold text-primary text-sm group-hover:text-amber-500 transition-colors">
            Manage Products
          </h3>
          <p className="text-xs text-warm-600 mt-1">Edit, publish, or archive products</p>
        </Link>
        <Link href="/admin/analytics" className="admin-card hover:border-amber-500/30 group">
          <span className="text-2xl mb-2 block">◔</span>
          <h3 className="font-body font-semibold text-primary text-sm group-hover:text-amber-500 transition-colors">
            View Analytics
          </h3>
          <p className="text-xs text-warm-600 mt-1">Track views and affiliate clicks</p>
        </Link>
      </div>

      {/* Recent products */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-primary">Recent Products</h2>
          <Link href="/admin/products" className="text-xs font-body font-semibold text-amber-500 hover:underline">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-background rounded animate-pulse" />
            ))}
          </div>
        ) : recent.length > 0 ? (
          <div className="divide-y divide-border-light">
            {recent.map((product) => (
              <div key={product.id} className="flex items-center gap-4 py-3">
                <div className="w-10 h-10 rounded-lg bg-background overflow-hidden flex-shrink-0">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-border text-sm">C</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-primary truncate">{product.title}</p>
                  <p className="text-xs text-warm-600 capitalize">{product.platform || 'Manual'}</p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-body font-semibold uppercase ${
                    product.status === 'PUBLISHED'
                      ? 'bg-green-50 text-green-700'
                      : product.status === 'DRAFT'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  {product.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-warm-600 font-body py-6 text-center">
            No products yet. <Link href="/admin/add" className="text-amber-500 hover:underline">Add your first product</Link>
          </p>
        )}
      </div>
    </div>
  );
}
