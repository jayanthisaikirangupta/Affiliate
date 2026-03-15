'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import type { AnalyticsDashboard } from '@/lib/types';

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsDashboard | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async (d: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getAnalytics(d);
      setData(res);
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'Failed to load analytics.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAnalytics(days);
  }, [days, fetchAnalytics]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary">Analytics</h1>
          <p className="text-sm font-body text-text-secondary mt-1">Track views and affiliate clicks</p>
        </div>
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-colors ${
                days === d ? 'bg-primary text-white' : 'bg-background text-text-secondary hover:bg-border-light'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-red-700 text-sm font-body" role="alert">{error}</p>
          <button
            onClick={() => fetchAnalytics(days)}
            className="btn-primary text-xs mt-3"
          >
            Retry
          </button>
        </div>
      )}

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="admin-card">
          <p className="text-xs font-body font-semibold text-text-muted uppercase tracking-wide">Total Views</p>
          <p className="text-3xl font-display font-bold text-primary mt-2">
            {loading ? '—' : (data?.totalViews || 0).toLocaleString()}
          </p>
        </div>
        <div className="admin-card">
          <p className="text-xs font-body font-semibold text-text-muted uppercase tracking-wide">Total Clicks</p>
          <p className="text-3xl font-display font-bold text-accent mt-2">
            {loading ? '—' : (data?.totalClicks || 0).toLocaleString()}
          </p>
        </div>
        <div className="admin-card">
          <p className="text-xs font-body font-semibold text-text-muted uppercase tracking-wide">Click-Through Rate</p>
          <p className="text-3xl font-display font-bold text-primary mt-2">
            {loading ? '—' : `${data?.ctr || '0'}%`}
          </p>
        </div>
      </div>

      {/* Daily chart (simple bar visualization) */}
      {data?.dailyStats && data.dailyStats.length > 0 && (
        <div className="admin-card mb-8">
          <h2 className="font-display text-lg font-semibold text-primary mb-6">Daily Trend</h2>
          <div className="flex items-end gap-1 h-48">
            {data.dailyStats.map((day, i) => {
              const maxViews = Math.max(...data.dailyStats.map((d) => d.views), 1);
              const height = (day.views / maxViews) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1" title={`${day.date}: ${day.views} views, ${day.clicks} clicks`}>
                  <div className="w-full flex flex-col items-center justify-end" style={{ height: '100%' }}>
                    <div
                      className="w-full bg-accent/20 rounded-t hover:bg-accent/40 transition-colors relative group"
                      style={{ height: `${Math.max(height, 2)}%` }}
                    >
                      {/* Click bar overlay */}
                      {day.clicks > 0 && (
                        <div
                          className="absolute bottom-0 left-0 right-0 gold-gradient rounded-t"
                          style={{ height: `${(day.clicks / day.views) * 100}%` }}
                        />
                      )}
                      {/* Tooltip */}
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px]
                                      px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100
                                      transition-opacity pointer-events-none z-10">
                        {day.date}<br />
                        {day.views} views · {day.clicks} clicks
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-text-muted font-body">{data.dailyStats[0]?.date}</span>
            <span className="text-[10px] text-text-muted font-body">{data.dailyStats[data.dailyStats.length - 1]?.date}</span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent/20 rounded" />
              <span className="text-xs text-text-muted font-body">Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 gold-gradient rounded" />
              <span className="text-xs text-text-muted font-body">Clicks</span>
            </div>
          </div>
        </div>
      )}

      {/* Top products */}
      <div className="admin-card">
        <h2 className="font-display text-lg font-semibold text-primary mb-4">Top Products</h2>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-12 bg-background rounded animate-pulse" />)}
          </div>
        ) : data?.topProducts && data.topProducts.length > 0 ? (
          <div className="divide-y divide-border-light">
            {data.topProducts.map((product, i) => (
              <div key={product.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-sm font-display font-bold text-text-muted">
                    {i + 1}
                  </span>
                  <p className="text-sm font-body font-medium text-primary">{product.title}</p>
                </div>
                <div className="flex items-center gap-6 text-sm font-body">
                  <span className="text-text-secondary">{product.views.toLocaleString()} views</span>
                  <span className="text-accent font-semibold">{product.clicks.toLocaleString()} clicks</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-muted font-body py-8 text-center">
            No analytics data yet. Views and clicks will appear as users visit your site.
          </p>
        )}
      </div>
    </div>
  );
}
