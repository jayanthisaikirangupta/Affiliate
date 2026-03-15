'use client';

import { useState, useEffect } from 'react';

const SETTINGS_KEY = 'petgearhub_site_settings';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  metaTitleSuffix: string;
  metaDescription: string;
}

const defaultSettings: SiteSettings = {
  siteName: 'PetGearHub',
  siteDescription: 'Curated Gear for Happy, Healthy Pets',
  metaTitleSuffix: '| PetGearHub',
  metaDescription: 'Discover expert-picked pet products for dogs, cats, birds, fish, and small animals.',
};

function loadSettings(): SiteSettings {
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) return { ...defaultSettings, ...JSON.parse(saved) };
  } catch {
    // ignore
  }
  return defaultSettings;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setLoaded(true);
  }, []);

  const handleChange = (key: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" aria-label="Loading settings" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-primary">Settings</h1>
        <p className="text-sm font-body text-text-secondary mt-1">Configure your affiliate site</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* General */}
        <div className="admin-card">
          <h2 className="font-display text-lg font-semibold text-primary mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="site-name" className="admin-label">Site Name</label>
              <input
                id="site-name"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                className="admin-input"
              />
            </div>
            <div>
              <label htmlFor="site-description" className="admin-label">Site Description</label>
              <input
                id="site-description"
                value={settings.siteDescription}
                onChange={(e) => handleChange('siteDescription', e.target.value)}
                className="admin-input"
              />
            </div>
          </div>
        </div>

        {/* Affiliate API instructions */}
        <div className="admin-card">
          <h2 className="font-display text-lg font-semibold text-primary mb-2">Affiliate API Keys</h2>
          <p className="text-xs font-body text-text-muted mb-4">
            API credentials are managed in the backend <code className="bg-background px-1 rounded">.env</code> file for security.
            See <code className="bg-background px-1 rounded">.env.example</code> for setup instructions.
          </p>
          <div className="space-y-3 text-sm font-body">
            <div className="p-3 bg-background rounded-lg">
              <p className="font-semibold text-primary">Amazon PA-API</p>
              <p className="text-text-muted text-xs mt-1">
                Set <code>AMAZON_ACCESS_KEY</code>, <code>AMAZON_SECRET_KEY</code>, and <code>AMAZON_PARTNER_TAG</code> in backend .env
              </p>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <p className="font-semibold text-primary">eBay Browse API</p>
              <p className="text-text-muted text-xs mt-1">
                Set <code>EBAY_APP_ID</code> and <code>EBAY_CLIENT_SECRET</code> in backend .env
              </p>
            </div>
          </div>
        </div>

        {/* SEO Defaults */}
        <div className="admin-card">
          <h2 className="font-display text-lg font-semibold text-primary mb-4">SEO Defaults</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="meta-title-suffix" className="admin-label">Default Meta Title Suffix</label>
              <input
                id="meta-title-suffix"
                value={settings.metaTitleSuffix}
                onChange={(e) => handleChange('metaTitleSuffix', e.target.value)}
                className="admin-input"
                placeholder="| Your Site Name"
              />
            </div>
            <div>
              <label htmlFor="meta-description" className="admin-label">Default Meta Description</label>
              <textarea
                id="meta-description"
                value={settings.metaDescription}
                onChange={(e) => handleChange('metaDescription', e.target.value)}
                className="admin-input min-h-[80px]"
                placeholder="Site-wide default meta description"
              />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button onClick={handleSave} className="btn-primary text-xs">
            Save Settings
          </button>
          {saved && (
            <span className="text-sm font-body text-green-600" role="status">
              Settings saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
