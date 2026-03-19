'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = 'petgearhub_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage not available
    }
  }, []);

  const save = (state: ConsentState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
    setVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectNonEssential = () => save({ necessary: true, analytics: false, marketing: false });
  const saveSettings = () => save(consent);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="true"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border-light shadow-lg"
    >
      <div className="editorial-container py-4">
        {!showSettings ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm font-body text-text-secondary flex-1">
              We use cookies to improve your experience and analyse site traffic.{' '}
              <Link href="/privacy-policy" className="text-accent underline hover:no-underline">
                Learn more
              </Link>
            </p>
            <div className="flex flex-wrap gap-2 flex-shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-xs font-body font-semibold text-text-secondary border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
              >
                Cookie Settings
              </button>
              <button
                onClick={rejectNonEssential}
                className="px-4 py-2 text-xs font-body font-semibold text-text-secondary border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-xs font-body font-semibold bg-accent text-white rounded-full hover:bg-accent-dark transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="py-2">
            <h3 className="font-display text-base font-semibold text-primary mb-4">Cookie Settings</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between py-2 border-b border-border-light">
                <div>
                  <p className="text-sm font-body font-semibold text-primary">Necessary Cookies</p>
                  <p className="text-xs font-body text-text-muted">Required for the site to function. Cannot be disabled.</p>
                </div>
                <div className="w-10 h-6 bg-accent rounded-full flex items-center justify-end pr-1 opacity-50 cursor-not-allowed">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border-light">
                <div>
                  <p className="text-sm font-body font-semibold text-primary">Analytics Cookies</p>
                  <p className="text-xs font-body text-text-muted">Help us understand how visitors use the site.</p>
                </div>
                <button
                  onClick={() => setConsent(c => ({ ...c, analytics: !c.analytics }))}
                  aria-pressed={consent.analytics}
                  className={`w-10 h-6 rounded-full flex items-center transition-all duration-200 ${
                    consent.analytics ? 'bg-accent justify-end pr-1' : 'bg-gray-200 justify-start pl-1'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-body font-semibold text-primary">Marketing Cookies</p>
                  <p className="text-xs font-body text-text-muted">Used to show relevant advertisements.</p>
                </div>
                <button
                  onClick={() => setConsent(c => ({ ...c, marketing: !c.marketing }))}
                  aria-pressed={consent.marketing}
                  className={`w-10 h-6 rounded-full flex items-center transition-all duration-200 ${
                    consent.marketing ? 'bg-accent justify-end pr-1' : 'bg-gray-200 justify-start pl-1'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-xs font-body font-semibold text-text-secondary border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
              >
                Back
              </button>
              <button
                onClick={saveSettings}
                className="px-4 py-2 text-xs font-body font-semibold bg-accent text-white rounded-full hover:bg-accent-dark transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
