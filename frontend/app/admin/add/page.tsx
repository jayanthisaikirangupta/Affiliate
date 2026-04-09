'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import type { Category } from '@/lib/types';

type Step = 'input' | 'extracting' | 'preview' | 'saving';

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

export default function AddProductPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('input');
  const [url, setUrl] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
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
    api.getCategories().then(setCategories).catch(() => {});
  }, []);

  const handleExtract = async () => {
    if (!url.trim()) return;
    setError('');
    setStep('extracting');
    try {
      const data = await api.extractProduct(url.trim());
      setForm((prev) => ({
        ...prev,
        title: data.title ?? '',
        description: data.description ?? '',
        price: data.price != null ? String(data.price) : '',
        originalPrice: data.originalPrice != null ? String(data.originalPrice) : '',
        currency: data.currency ?? 'USD',
        rating: data.rating != null ? String(data.rating) : '',
        reviewCount: data.reviewCount != null ? String(data.reviewCount) : '',
        images: data.images ?? [],
        affiliateLink: data.affiliateLink ?? url,
        platform: data.platform ?? '',
        seoTitle: data.title ?? '',
        metaDescription: (data.description ?? '').slice(0, 160),
      }));
      setStep('preview');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || 'Extraction failed. Please fill in details manually.');
      setForm((prev) => ({ ...prev, affiliateLink: url }));
      setStep('preview');
    }
  };

  const handleManualEntry = () => {
    setStep('preview');
  };

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

  const handlePublish = async (status: 'DRAFT' | 'PUBLISHED') => {
    setStep('saving');
    try {
      await api.createProduct({
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
        status,
        featured: form.featured,
      });
      router.push('/admin/products');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || 'Failed to save product');
      setStep('preview');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-primary">Add Product</h1>
        <p className="text-sm font-body text-navy-700 mt-1">
          {step === 'input' && 'Paste an affiliate link to auto-extract product details'}
          {step === 'extracting' && 'Extracting product data...'}
          {step === 'preview' && 'Review and edit the extracted data before publishing'}
          {step === 'saving' && 'Saving product...'}
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {['Paste Link', 'Review', 'Publish'].map((label, i) => {
          const stepIndex = step === 'input' || step === 'extracting' ? 0 : step === 'preview' ? 1 : 2;
          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-semibold ${
                  i <= stepIndex ? 'gold-gradient text-white' : 'bg-border-light text-warm-600'
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-xs font-body ${i <= stepIndex ? 'text-primary' : 'text-warm-600'}`}>
                {label}
              </span>
              {i < 2 && <div className="w-8 h-px bg-border mx-1" />}
            </div>
          );
        })}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm font-body text-orange-800">{error}</p>
        </div>
      )}

      {/* ── Step 1: Input ──────────────────── */}
      {step === 'input' && (
        <div className="admin-card max-w-2xl">
          <h2 className="font-display text-lg font-semibold text-primary mb-4">
            Paste Affiliate Link
          </h2>
          <p className="text-sm font-body text-navy-700 mb-6">
            Supports Amazon and eBay product URLs. The system will automatically extract title,
            images, price, rating, and description.
          </p>
          <div className="space-y-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.amazon.com/dp/B0BSHF7WHW"
              className="admin-input"
            />
            <div className="flex gap-3">
              <button
                onClick={handleExtract}
                disabled={!url.trim()}
                className="btn-primary text-xs disabled:opacity-40"
              >
                Extract Product Data
              </button>
              <button onClick={handleManualEntry} className="btn-outline text-xs">
                Manual Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 1.5: Extracting ───────────── */}
      {step === 'extracting' && (
        <div className="admin-card max-w-2xl text-center py-12">
          <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" aria-label="Extracting" />
          <h2 className="font-display text-lg font-semibold text-primary mb-2">
            Extracting Product Data
          </h2>
          <p className="text-sm font-body text-navy-700">
            Fetching details from the product page...
          </p>
        </div>
      )}

      {/* ── Step 2: Preview / Edit ─────────── */}
      {step === 'preview' && (
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
                      <img src={img} alt="" className="w-12 h-12 rounded object-cover border border-warm-200" />
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
                  className="text-sm font-body font-medium text-orange-500 hover:underline"
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
                  <button onClick={() => addListItem('pros')} className="text-sm font-body font-medium text-orange-500 hover:underline">
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
                  <button onClick={() => addListItem('cons')} className="text-sm font-body font-medium text-orange-500 hover:underline">
                    + Add Con
                  </button>
                </div>
              </div>
            </div>

            {/* AI Summary */}
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
                  <p className="text-xs text-warm-600 mt-1">{form.seoTitle.length}/60 characters</p>
                </div>
                <div>
                  <label className="admin-label">Meta Description</label>
                  <textarea
                    value={form.metaDescription}
                    onChange={(e) => updateForm('metaDescription', e.target.value)}
                    className="admin-input min-h-[80px] resize-y"
                    placeholder="Brief meta description for search engines"
                  />
                  <p className="text-xs text-warm-600 mt-1">{form.metaDescription.length}/160 characters</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 self-start sticky top-24">
            {/* Publish card */}
            <div className="admin-card">
              <h2 className="font-display text-lg font-semibold text-primary mb-4">Publish</h2>
              <div className="space-y-4">
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
                    className="w-4 h-4 rounded border-warm-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm font-body text-primary">Featured product</span>
                </label>
                <div className="border-t border-warm-200 pt-4 space-y-3">
                  <button
                    onClick={() => handlePublish('PUBLISHED')}
                    disabled={!form.title || !form.affiliateLink}
                    className="w-full btn-primary text-xs disabled:opacity-40"
                  >
                    Publish Now
                  </button>
                  <button
                    onClick={() => handlePublish('DRAFT')}
                    disabled={!form.title || !form.affiliateLink}
                    className="w-full btn-outline text-xs disabled:opacity-40"
                  >
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>

            {/* Preview card */}
            {form.images?.[0] && (
              <div className="admin-card">
                <h2 className="font-display text-sm font-semibold text-navy-700 mb-3">Preview</h2>
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
      )}

      {/* ── Step 3: Saving ─────────────────── */}
      {step === 'saving' && (
        <div className="admin-card max-w-2xl text-center py-12">
          <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" aria-label="Saving" />
          <h2 className="font-display text-lg font-semibold text-primary mb-2">Saving Product</h2>
          <p className="text-sm font-body text-navy-700">Please wait...</p>
        </div>
      )}
    </div>
  );
}
