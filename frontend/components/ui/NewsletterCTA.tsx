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
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
        <label htmlFor="nl-cta-email" className="sr-only">Email address</label>
        <input
          id="nl-cta-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          disabled={status === 'loading'}
          className="flex-1 min-w-0 px-4 py-2.5 border border-white/20 rounded-full font-body text-sm text-white placeholder:text-navy-300 bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 disabled:opacity-50"
        />
        <button type="submit" disabled={status === 'loading'} className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-full whitespace-nowrap text-xs transition-colors disabled:opacity-50">
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
      <section className="py-16 px-8 bg-navy-900 rounded-3xl text-center">
        <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-amber-400">Newsletter</span>
        <h2 className="font-display text-3xl font-semibold text-white mt-3 mb-3">{heading}</h2>
        <p className="text-navy-200 font-body mb-8 max-w-md mx-auto">{description}</p>
        {successMsg ? (
          <div className="py-3 px-5 bg-green-500/20 border border-green-500/50 rounded-xl inline-block">
            <p className="text-green-300 font-body font-medium text-sm">{successMsg}</p>
          </div>
        ) : (
          <Form onSuccess={setSuccessMsg} />
        )}
      </section>
    );
  }

  return (
    <div className="bg-navy-900 rounded-3xl p-8 overflow-hidden">
      <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-amber-400">Newsletter</span>
      <h3 className="font-display text-xl font-semibold text-white mt-2 mb-2">{heading}</h3>
      <p className="text-navy-200 font-body text-sm mb-6">{description}</p>
      {successMsg ? (
        <div className="py-3 px-5 bg-green-500/20 border border-green-500/50 rounded-xl inline-block">
          <p className="text-green-300 font-body font-medium text-sm">{successMsg}</p>
        </div>
      ) : (
        <Form onSuccess={setSuccessMsg} />
      )}
    </div>
  );
}
