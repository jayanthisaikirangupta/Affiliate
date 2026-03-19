'use client';

import { useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { PawIcon } from '@/components/PawIcon';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '◫' },
  { href: '/admin/add', label: 'Add Product', icon: '+' },
  { href: '/admin/products', label: 'Products', icon: '☰' },
  { href: '/admin/articles', label: 'Articles', icon: '✎' },
  { href: '/admin/categories', label: 'Categories', icon: '⊞' },
  { href: '/admin/analytics', label: 'Analytics', icon: '◔' },
  { href: '/admin/users', label: 'Users', icon: '⊕' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSessionExpired = useCallback(() => {
    setAuthed(false);
    setError('Your session has expired. Please log in again.');
  }, []);

  useEffect(() => {
    // Register the 401 handler so any API call auto-logs out on token expiry
    api.onExpired(handleSessionExpired);
  }, [handleSessionExpired]);

  useEffect(() => {
    const token = api.getToken();
    if (!token) {
      setChecking(false);
      return;
    }
    // Validate token by calling /users/me
    api
      .getMe()
      .then(() => {
        setAuthed(true);
      })
      .catch(() => {
        api.clearToken();
        setAuthed(false);
      })
      .finally(() => {
        setChecking(false);
      });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setError('');
    try {
      await api.login(email, password);
      setAuthed(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials';
      setError(message);
    }
    setLoginLoading(false);
  };

  const handleLogout = () => {
    api.logout();
    setAuthed(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" aria-label="Loading" />
      </div>
    );
  }

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center mx-auto mb-4" aria-hidden="true">
              <PawIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-white">Admin Login</h1>
            <p className="text-white/40 text-sm font-body mt-2">Sign in to manage products</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="sr-only">Email address</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg
                           text-white placeholder:text-white/30 text-sm font-body
                           focus:outline-none focus:border-accent/50 transition-colors"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="sr-only">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg
                           text-white placeholder:text-white/30 text-sm font-body
                           focus:outline-none focus:border-accent/50 transition-colors"
                required
                aria-required="true"
              />
            </div>
            {error && (
              <p role="alert" className="text-red-400 text-sm font-body">{error}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 gold-gradient text-white font-body font-semibold text-sm
                         rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-border
                    transform transition-transform duration-200 lg:transform-none
                    flex flex-col h-screen lg:h-auto lg:min-h-screen
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        aria-label="Admin navigation"
      >
        <div className="p-6 flex-shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 gold-gradient rounded-sm flex items-center justify-center" aria-hidden="true">
              <PawIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-lg font-semibold text-primary">PetGearHub</span>
          </Link>
          <p className="text-[10px] font-body text-text-muted tracking-widest uppercase mt-1 ml-11">
            Admin
          </p>
        </div>

        <nav className="px-3 mt-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-body font-medium
                           transition-all duration-200 ${
                             isActive
                               ? 'bg-accent/10 text-accent'
                               : 'text-text-secondary hover:bg-background hover:text-primary'
                           }`}
              >
                <span className="text-base w-5 text-center" aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-shrink-0 p-4 border-t border-border-light">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-body text-text-muted hover:text-red-600
                       transition-colors text-left"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-border-light px-6 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden w-8 h-8 flex items-center justify-center"
            aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
          >
            <span className="text-xl" aria-hidden="true">☰</span>
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-body font-medium text-text-muted hover:text-accent transition-colors"
            >
              View Site →
            </Link>
          </div>
        </header>

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
