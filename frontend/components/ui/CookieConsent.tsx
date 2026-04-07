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
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-warm-300 shadow-hover"
    >
      <div className="editorial-container py-4">
        {!showSettings ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm font-body text-navy-700 flex-1">
              We use cookies to improve your experience and analyse site traffic.{' '}
              <Link href="/privacy-policy" className="text-amber-600 underline hover:no-underline">
                Learn more
              </Link>
            </p>
            <div className="flex flex-wrap gap-2 flex-shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-xs font-body font-semibold text-navy-700 border border-warm-300 rounded-full hover:border-amber-500 hover:text-amber-500 transition-colors"
              >
                Cookie Settings
              </button>
              <button
                onClick={rejectNonEssential}
                className="px-4 py-2 text-xs font-body font-semibold text-navy-700 border border-warm-300 rounded-full hover:border-amber-500 hover:text-amber-500 transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-xs font-body font-semibold bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="py-2">
            <h3 className="font-display text-base font-semibold text-navy-900 mb-4">Cookie Settings</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between py-2 border-b border-warm-200">
                <div>
                  <p className="text-sm font-body font-semibold text-navy-900">Necessary Cookies</p>
                  <p className="text-xs font-body text-warm-600">Required for the site to function. Cannot be disabled.</p>
                </div>
                <div className="w-10 h-6 bg-amber-500 rounded-full flex items-center justify-end pr-1 opacity-50 cursor-not-allowed">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-warm-200">
                <div>
                  <p className="text-sm font-body font-semibold text-navy-900">Analytics Cookies</p>
                  <p className="text-xs font-body text-warm-600">Help us understand how visitors use the site.</p>
                </div>
                <button
                  onClick={() => setConsent(c => ({ ...c, analytics: !c.analytics }))}
                  aria-pressed={consent.analytics}
                  className={`w-10 h-6 rounded-full flex items-center transition-all duration-200 ${
                    consent.analytics ? 'bg-amber-500 justify-end pr-1' : 'bg-warm-300 justify-start pl-1'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-body font-semibold text-navy-900">Marketing Cookies</p>
                  <p className="text-xs font-body text-warm-600">Used to show relevant advertisements.</p>
                </div>
                <button
                  onClick={() => setConsent(c => ({ ...c, marketing: !c.marketing }))}
                  aria-pressed={consent.marketing}
                  className={`w-10 h-6 rounded-full flex items-center transition-all duration-200 ${
                    consent.marketing ? 'bg-amber-500 justify-end pr-1' : 'bg-warm-300 justify-start pl-1'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-xs font-body font-semibold text-navy-700 border border-warm-300 rounded-full hover:border-amber-500 hover:text-amber-500 transition-colors"
              >
                Back
              </button>
              <button
                onClick={saveSettings}
                className="px-4 py-2 text-xs font-body font-semibold bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
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
