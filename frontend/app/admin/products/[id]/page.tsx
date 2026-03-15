'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import type { Category } from '@/lib/types';

type FormState = {
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  currency: string;
  rating: string;
  reviewCount: string;
  images: string[];
  affiliateLink: string;
  platform: string;
  pros: string[];
  cons: string[];
  aiSummary: string;
  seoTitle: string;
  metaDescription: string;
  categoryId: string;
  status: string;
  featured: boolean;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    currency: 'USD',
    rating: '',
    reviewCount: '',
    images: [],
    affiliateLink: '',
    platform: '',
    pros: [''],
    cons: [''],
    aiSummary: '',
    seoTitle: '',
    metaDescription: '',
    categoryId: '',
    status: 'DRAFT',
    featured: false,
  });

  useEffect(() => {
    Promise.all([
      api.getProductById(id),
      api.getCategories(),
    ]).then(([product, cats]) => {
      setCategories(cats);
      setForm({
        title: product.title ?? '',
        description: product.description ?? '',
        price: product.price != null ? String(product.price) : '',
        originalPrice: product.originalPrice != null ? String(product.originalPrice) : '',
        currency: product.currency ?? 'USD',
        rating: product.rating != null ? String(product.rating) : '',
        reviewCount: product.reviewCount != null ? String(product.reviewCount) : '',
        images: product.images ?? [],
        affiliateLink: product.affiliateLink ?? '',
        platform: product.platform ?? '',
        pros: product.pros?.length ? product.pros : [''],
        cons: product.cons?.length ? product.cons : [''],
        aiSummary: product.aiSummary ?? '',
        seoTitle: product.seoTitle ?? '',
        metaDescription: product.metaDescription ?? '',
        categoryId: product.categoryId ?? '',
        status: product.status ?? 'DRAFT',
        featured: product.featured ?? false,
      });
      setLoading(false);
    }).catch(() => {
      setError('Failed to load product.');
      setLoading(false);
    });
  }, [id]);

  const updateForm = (field: keyof FormState, value: FormState[keyof FormState]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateListItem = (field: 'pros' | 'cons', index: number, value: string) => {
    setForm((prev) => {
      const list = [...prev[field]];
      list[index] = value;
      return { ...prev, [field]: list };
    });
  };

  const addListItem = (field: 'pros' | 'cons') => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeListItem = (field: 'pros' | 'cons', index: number) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (status?: string) => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await api.updateProduct(id, {
        title: form.title,
        description: form.description || undefined,
        price: form.price ? parseFloat(form.price) : undefined,
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
        currency: form.currency,
        rating: form.rating ? parseFloat(form.rating) : undefined,
        reviewCount: form.reviewCount ? parseInt(form.reviewCount) : undefined,
        images: form.images.filter(Boolean),
        affiliateLink: form.affiliateLink,
        platform: form.platform || undefined,
        pros: form.pros.filter(Boolean),
        cons: form.cons.filter(Boolean),
        aiSummary: form.aiSummary || undefined,
        seoTitle: form.seoTitle || undefined,
        metaDescription: form.metaDescription || undefined,
        categoryId: form.categoryId || undefined,
        status: status ?? form.status,
        featured: form.featured,
      });
      setSuccess('Product saved successfully.');
      if (status) setForm((prev) => ({ ...prev, status: status }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save product.');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin/products" className="text-xs text-text-muted hover:text-accent">
              ← Products
            </Link>
          </div>
          <h1 className="font-display text-2xl font-semibold text-primary">Edit Product</h1>
          <p className="text-sm font-body text-text-secondary mt-1">Update product details and republish</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
          <p className="text-sm font-body text-red-700">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg" role="status">
          <p className="text-sm font-body text-green-700">{success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic info */}
          <div className="admin-card">
            <h2 className="font-display text-lg font-semibold text-primary mb-4">Product Details</h2>
            <div className="space-y-4">
              <div>
                <label className="admin-label">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => updateForm('title', e.target.value)}
                  className="admin-input"
                  placeholder="Product title"
                />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => updateForm('description', e.target.value)}
                  className="admin-input min-h-[120px] resize-y"
                  placeholder="Product description"
                />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="admin-label">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => updateForm('price', e.target.value)}
                    className="admin-input"
                    placeholder="29.99"
                  />
                </div>
                <div>
                  <label className="admin-label">Original Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.originalPrice}
                    onChange={(e) => updateForm('originalPrice', e.target.value)}
                    className="admin-input"
                    placeholder="49.99"
                  />
                </div>
                <div>
                  <label className="admin-label">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={form.rating}
                    onChange={(e) => updateForm('rating', e.target.value)}
                    className="admin-input"
                    placeholder="4.5"
                  />
                </div>
                <div>
                  <label className="admin-label">Reviews</label>
                  <input
                    type="number"
                    value={form.reviewCount}
                    onChange={(e) => updateForm('reviewCount', e.target.value)}
                    className="admin-input"
                    placeholder="1234"
                  />
                </div>
              </div>
              <div>
                <label className="admin-label">Affiliate Link *</label>
                <input
                  value={form.affiliateLink}
                  onChange={(e) => updateForm('affiliateLink', e.target.value)}
                  className="admin-input"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="admin-card">
            <h2 className="font-display text-lg font-semibold text-primary mb-4">Images</h2>
            <div className="space-y-3">
              {form.images.map((img, i) => (
                <div key={i} className="flex gap-3 items-center">
                  {img && (
                    <img src={img} alt="" className="w-12 h-12 rounded object-cover border border-border-light" />
                  )}
                  <input
                    value={img}
                    onChange={(e) => {
                      const imgs = [...form.images];
                      imgs[i] = e.target.value;
                      updateForm('images', imgs);
                    }}
                    className="admin-input flex-1"
                    placeholder="Image URL"
                  />
                  <button
                    onClick={() => updateForm('images', form.images.filter((_, j) => j !== i))}
                    className="text-red-400 hover:text-red-600 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => updateForm('images', [...form.images, ''])}
                className="text-sm font-body font-medium text-accent hover:underline"
              >
                + Add Image URL
              </button>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="admin-card">
            <h2 className="font-display text-lg font-semibold text-primary mb-4">Pros &amp; Cons</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="admin-label text-green-700">Pros</label>
                {form.pros.map((pro, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      value={pro}
                      onChange={(e) => updateListItem('pros', i, e.target.value)}
                      className="admin-input flex-1"
                      placeholder="Pro point"
                    />
                    <button onClick={() => removeListItem('pros', i)} className="text-red-400 text-sm">✕</button>
                  </div>
                ))}
                <button onClick={() => addListItem('pros')} className="text-sm font-body font-medium text-accent hover:underline">
                  + Add Pro
                </button>
              </div>
              <div>
                <label className="admin-label text-red-700">Cons</label>
                {form.cons.map((con, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      value={con}
                      onChange={(e) => updateListItem('cons', i, e.target.value)}
                      className="admin-input flex-1"
                      placeholder="Con point"
                    />
                    <button onClick={() => removeListItem('cons', i)} className="text-red-400 text-sm">✕</button>
                  </div>
                ))}
                <button onClick={() => addListItem('cons')} className="text-sm font-body font-medium text-accent hover:underline">
                  + Add Con
                </button>
              </div>
            </div>
          </div>

          {/* Editorial Summary */}
          <div className="admin-card">
            <h2 className="font-display text-lg font-semibold text-primary mb-4">Editorial Summary</h2>
            <textarea
              value={form.aiSummary}
              onChange={(e) => updateForm('aiSummary', e.target.value)}
              className="admin-input min-h-[100px] resize-y"
              placeholder="Write a brief editorial summary of this product..."
            />
          </div>

          {/* SEO */}
          <div className="admin-card">
            <h2 className="font-display text-lg font-semibold text-primary mb-4">SEO</h2>
            <div className="space-y-4">
              <div>
                <label className="admin-label">SEO Title</label>
                <input
                  value={form.seoTitle}
                  onChange={(e) => updateForm('seoTitle', e.target.value)}
                  className="admin-input"
                  placeholder="SEO-optimized title"
                />
                <p className="text-xs text-text-muted mt-1">{form.seoTitle.length}/60 characters</p>
              </div>
              <div>
                <label className="admin-label">Meta Description</label>
                <textarea
                  value={form.metaDescription}
                  onChange={(e) => updateForm('metaDescription', e.target.value)}
                  className="admin-input min-h-[80px] resize-y"
                  placeholder="Brief meta description for search engines"
                />
                <p className="text-xs text-text-muted mt-1">{form.metaDescription.length}/160 characters</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 self-start sticky top-24">
          <div className="admin-card">
            <h2 className="font-display text-lg font-semibold text-primary mb-4">Publish</h2>
            <div className="space-y-4">
              <div>
                <label className="admin-label">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => updateForm('status', e.target.value)}
                  className="admin-input"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <div>
                <label className="admin-label">Category</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => updateForm('categoryId', e.target.value)}
                  className="admin-input"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="admin-label">Platform</label>
                <input
                  value={form.platform}
                  onChange={(e) => updateForm('platform', e.target.value)}
                  className="admin-input"
                  placeholder="amazon, ebay..."
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => updateForm('featured', e.target.checked)}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-sm font-body text-primary">Featured product</span>
              </label>
              <div className="border-t border-border-light pt-4 space-y-3">
                <button
                  onClick={() => handleSave()}
                  disabled={saving || !form.title || !form.affiliateLink}
                  className="w-full btn-primary text-xs disabled:opacity-40"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => router.push('/admin/products')}
                  className="w-full btn-outline text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {form.images?.[0] && (
            <div className="admin-card">
              <h2 className="font-display text-sm font-semibold text-text-secondary mb-3">Preview</h2>
              <div className="aspect-square rounded-lg overflow-hidden bg-background mb-3">
                <img src={form.images[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="font-display text-sm font-semibold text-primary line-clamp-2">
                {form.title || 'Product Title'}
              </p>
              {form.price && (
                <p className="text-lg font-display font-bold text-primary mt-1">
                  ${parseFloat(form.price).toFixed(2)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
