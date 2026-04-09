'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function FooterNewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setMessage('');
    try {
      const res = await api.subscribeNewsletter(email.trim());
      setStatus('success');
      setMessage(res.message || 'Successfully subscribed!');
      setEmail('');
    } catch (err: unknown) {
      setStatus('error');
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setMessage(msg.includes('already') ? 'You are already subscribed!' : msg);
    }
  };

  if (status === 'success') {
    return (
      <p className="text-sm text-orange-400 font-semibold" role="status">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Footer newsletter subscription">
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="footer-newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          aria-required="true"
          disabled={status === 'loading'}
          className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg
                     text-sm text-white placeholder:text-navy-400
                     focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-colors
                     disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2.5 gold-gradient text-white text-sm font-semibold rounded-lg
                     hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'Join'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
