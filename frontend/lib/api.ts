import type { Product, Category, AnalyticsDashboard, User, Article } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

type TokenExpiredCallback = () => void;

class ApiClient {
  private token: string | null = null;
  private onTokenExpired: TokenExpiredCallback | null = null;

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken(): string | null {
    if (this.token) return this.token;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  onExpired(cb: TokenExpiredCallback) {
    this.onTokenExpired = cb;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${path}`, { ...options, headers });

    if (res.status === 401) {
      this.clearToken();
      if (this.onTokenExpired) this.onTokenExpired();
      throw new Error('Session expired. Please log in again.');
    }

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Request failed' }));
      throw new Error((error as { message?: string }).message || `HTTP ${res.status}`);
    }

    // Handle empty responses (e.g. 204 No Content)
    const text = await res.text();
    if (!text) return undefined as unknown as T;
    return JSON.parse(text) as T;
  }

  // ── Auth ──────────────────────────────────────────
  async login(email: string, password: string) {
    const data = await this.request<{ access_token: string; user: { id: string; email: string; role: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.access_token);
    return data;
  }

  logout() {
    this.clearToken();
  }

  // ── Products ──────────────────────────────────────
  async getProducts(params?: Record<string, string | number | boolean>) {
    const query = params
      ? '?' +
        new URLSearchParams(
          Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
        ).toString()
      : '';
    return this.request<{ data: Product[]; meta: { total: number; page: number; limit: number; totalPages: number } }>(`/products${query}`);
  }

  async getProduct(slug: string) {
    return this.request<Product>(`/products/${slug}`);
  }

  async getProductById(id: string) {
    return this.request<Product>(`/products/id/${id}`);
  }

  async getFeatured(limit = 6) {
    return this.request<Product[]>(`/products/featured?limit=${limit}`);
  }

  async getLatest(limit = 12) {
    return this.request<Product[]>(`/products/latest?limit=${limit}`);
  }

  async createProduct(data: unknown) {
    return this.request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: string, data: unknown) {
    return this.request<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string) {
    return this.request<void>(`/products/${id}`, { method: 'DELETE' });
  }

  async getProductStats() {
    return this.request<{ total: number; published: number; draft: number; categories: number }>('/products/stats');
  }

  // ── Extraction ────────────────────────────────────
  async extractProduct(url: string) {
    return this.request<ExtractedProduct>('/extract', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
  }

  // ── Categories ────────────────────────────────────
  async getCategories() {
    return this.request<Category[]>('/categories');
  }

  async getCategory(slug: string) {
    return this.request<CategoryWithProducts>(`/categories/${slug}`);
  }

  async createCategory(data: { name: string; description?: string }) {
    return this.request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: string) {
    return this.request<void>(`/categories/${id}`, { method: 'DELETE' });
  }

  // ── Analytics ─────────────────────────────────────
  async trackView(productId: string) {
    return this.request<void>(`/analytics/view/${productId}`, { method: 'POST' });
  }

  async trackClick(productId: string) {
    return this.request<void>(`/analytics/click/${productId}`, { method: 'POST' });
  }

  async getAnalytics(days = 30) {
    return this.request<AnalyticsDashboard>(`/analytics/dashboard?days=${days}`);
  }

  // ── Users ──────────────────────────────────────
  async getMe() {
    return this.request<{ id: string; email: string; role: string }>('/users/me');
  }

  async getUsers() {
    return this.request<User[]>('/users');
  }

  async createUser(data: { email: string; password: string; role?: string }) {
    return this.request<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUserRole(id: string, role: string) {
    return this.request<User>(`/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  async resetUserPassword(id: string, newPassword: string) {
    return this.request<void>(`/users/${id}/password`, {
      method: 'PUT',
      body: JSON.stringify({ newPassword }),
    });
  }

  async deleteUser(id: string) {
    return this.request<void>(`/users/${id}`, { method: 'DELETE' });
  }

  // ── Articles ──────────────────────────────────────
  async getArticles(params?: Record<string, string | number | boolean>) {
    const query = params
      ? '?' + new URLSearchParams(Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))).toString()
      : '';
    return this.request<{ data: Article[]; meta: { total: number; page: number; limit: number; totalPages: number } }>(`/articles${query}`);
  }

  async getArticle(slug: string) {
    return this.request<Article>(`/articles/${slug}`);
  }

  async getArticleById(id: string) {
    return this.request<Article>(`/articles/id/${id}`);
  }

  async getFeaturedArticles(limit = 4) {
    return this.request<Article[]>(`/articles/featured?limit=${limit}`);
  }

  async createArticle(data: unknown) {
    return this.request<Article>('/articles', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateArticle(id: string, data: unknown) {
    return this.request<Article>(`/articles/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteArticle(id: string) {
    return this.request<void>(`/articles/${id}`, { method: 'DELETE' });
  }

  async getArticleStats() {
    return this.request<{ total: number; published: number; draft: number }>('/articles/stats');
  }

  // ── Contact ───────────────────────────────────────
  async submitContact(data: { name: string; email: string; subject: string; message: string }) {
    return this.request<{ message: string }>('/contact', { method: 'POST', body: JSON.stringify(data) });
  }

  async getContactSubmissions() {
    return this.request<unknown[]>('/contact');
  }

  // ── Newsletter ────────────────────────────────────
  async subscribeNewsletter(email: string) {
    return this.request<{ message: string }>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async getNewsletterSubscribers() {
    return this.request<unknown[]>('/newsletter/subscribers');
  }
}

// Shape of data returned by the /extract endpoint
export interface ExtractedProduct {
  title?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  affiliateLink?: string;
  platform?: string;
}

// Category with its products (returned by /categories/:slug)
export interface CategoryWithProducts {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  _count?: { products: number };
  products?: Product[];
}

export const api = new ApiClient();
export default api;
