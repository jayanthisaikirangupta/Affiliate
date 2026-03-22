'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import type { Category } from '@/lib/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      const cats = await api.getCategories();
      setCategories(cats);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setSaving(true);
    try {
      await api.createCategory({ name: newName.trim(), description: newDesc.trim() || undefined });
      setNewName('');
      setNewDesc('');
      fetchCategories();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create category';
      alert(msg);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    try {
      await api.deleteCategory(id);
      fetchCategories();
    } catch (e) {
      alert('Failed to delete — make sure no products are in this category');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-primary">Categories</h1>
        <p className="text-sm font-body text-text-secondary mt-1">Manage product categories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category list */}
        <div className="lg:col-span-2 admin-card">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <div key={i} className="h-14 bg-background rounded animate-pulse" />)}
            </div>
          ) : categories.length > 0 ? (
            <div className="divide-y divide-border-light">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between py-4 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center opacity-70">
                      <span className="text-white font-display font-bold">{cat.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-body font-semibold text-primary">{cat.name}</p>
                      <p className="text-xs text-text-muted">
                        {cat._count?.products || 0} {(cat._count?.products ?? 0) === 1 ? 'product' : 'products'} · /{cat.slug}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="text-xs font-body text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted font-body py-8 text-center">No categories yet</p>
          )}
        </div>

        {/* Add category form */}
        <div className="admin-card h-fit">
          <h2 className="font-display text-lg font-semibold text-primary mb-4">Add Category</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="admin-label">Name</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="admin-input"
                placeholder="e.g. Smart Home"
                required
              />
            </div>
            <div>
              <label className="admin-label">Description</label>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="admin-input min-h-[80px] resize-y"
                placeholder="Brief description..."
              />
            </div>
            <button type="submit" disabled={saving} className="w-full btn-primary text-xs disabled:opacity-50">
              {saving ? 'Creating...' : 'Create Category'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
