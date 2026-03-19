'use client';

import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface NewsletterCTAProps {
  variant?: 'inline' | 'full';
  heading?: string;
  description?: string;
}

function Form({ onSuccess }: { onSuccess: (msg: string) => void }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to subscribe');
      onSuccess(data.message || 'You\'re subscribed!');
    } catch (err) {
      setStatus('error');
      setErrMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
        <label htmlFor="nl-cta-email" className="sr-only">Email address</label>
        <input
          id="nl-cta-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          disabled={status === 'loading'}
          className="flex-1 px-4 py-2.5 border border-border rounded-full font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent disabled:opacity-50"
        />
        <button type="submit" disabled={status === 'loading'} className="btn-primary py-2.5 whitespace-nowrap text-xs disabled:opacity-50">
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && <p className="text-red-500 text-xs font-body mt-2 text-center">{errMsg}</p>}
    </>
  );
}

export default function NewsletterCTA({
  variant = 'inline',
  heading = 'Join the Pack',
  description = 'Get weekly pet gear picks, honest reviews, and exclusive UK deals delivered to your inbox.',
}: NewsletterCTAProps) {
  const [successMsg, setSuccessMsg] = useState('');

  if (variant === 'full') {
    return (
      <section className="py-16 bg-primary rounded-2xl px-8 text-center">
        <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent">Newsletter</span>
        <h2 className="font-display text-3xl font-semibold text-white mt-3 mb-3">{heading}</h2>
        <p className="text-white/60 font-body mb-8 max-w-md mx-auto">{description}</p>
        {successMsg ? (
          <div className="py-3 px-5 bg-green-50 border border-green-100 rounded-xl inline-block">
            <p className="text-green-700 font-body font-medium text-sm">{successMsg}</p>
          </div>
        ) : (
          <Form onSuccess={setSuccessMsg} />
        )}
      </section>
    );
  }

  return (
    <div className="bg-background border border-border-light rounded-2xl p-8">
      <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent">Newsletter</span>
      <h3 className="font-display text-xl font-semibold text-primary mt-2 mb-2">{heading}</h3>
      <p className="text-text-secondary font-body text-sm mb-6">{description}</p>
      {successMsg ? (
        <div className="py-3 px-5 bg-green-50 border border-green-100 rounded-xl inline-block">
          <p className="text-green-700 font-body font-medium text-sm">{successMsg}</p>
        </div>
      ) : (
        <Form onSuccess={setSuccessMsg} />
      )}
    </div>
  );
}
