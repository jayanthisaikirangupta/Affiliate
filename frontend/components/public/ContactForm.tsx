'use client';

import { useState } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const subjects = [
  'General Inquiry',
  'Product Suggestion',
  'Partnership',
  'Report an Issue',
  'Press Inquiry',
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: subjects[0], message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setStatus('success');
      setStatusMessage('Thank you! We\'ll be in touch within 2 business days.');
      setForm({ name: '', email: '', subject: subjects[0], message: '' });
    } catch {
      setStatus('error');
      setStatusMessage('Something went wrong. Please try emailing us directly at hello@petgearhub.co.uk.');
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 lg:pt-28 bg-background">
        <div className="editorial-container">
          <nav className="flex items-center gap-2 text-sm font-body text-text-muted py-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-text-secondary">Contact</span>
          </nav>
        </div>
      </div>

      <section className="py-20 lg:py-28">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent mb-4 block">
                Say Hello
              </span>
              <h1 className="font-display text-4xl font-semibold text-primary mb-6 leading-tight">
                Get in Touch
              </h1>
              <p className="text-text-secondary font-body leading-relaxed mb-8">
                Whether you have a product suggestion, partnership enquiry, or just want to say hello — we&apos;d love to hear from you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg" role="img" aria-hidden="true">✉️</span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-primary text-sm mb-1">Email Us</p>
                    <a href="mailto:hello@petgearhub.co.uk" className="font-body text-text-secondary hover:text-accent transition-colors">
                      hello@petgearhub.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg" role="img" aria-hidden="true">⏱️</span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-primary text-sm mb-1">Response Time</p>
                    <p className="font-body text-text-secondary text-sm">We aim to respond within 2 business days.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg" role="img" aria-hidden="true">🇬🇧</span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-primary text-sm mb-1">Based In</p>
                    <p className="font-body text-text-secondary text-sm">United Kingdom</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-5 bg-background border border-border-light rounded-xl">
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  <strong className="text-primary">For product partnerships:</strong> We only partner with brands whose products we can genuinely recommend. Please include details of the product and why you think it would suit our audience.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              {status === 'success' ? (
                <div className="bg-white rounded-2xl p-10 border border-border-light text-center">
                  <div className="text-5xl mb-6" role="img" aria-label="Success">✅</div>
                  <h2 className="font-display text-2xl font-semibold text-primary mb-3">Message Sent!</h2>
                  <p className="font-body text-text-secondary mb-6">{statusMessage}</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-outline text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 border border-border-light">
                  <h2 className="font-display text-xl font-semibold text-primary mb-6">Send a Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="contact-name" className="admin-label">Full Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        required
                        className="admin-input"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="admin-label">Email Address *</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        required
                        className="admin-input"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="admin-label">Subject *</label>
                      <select
                        id="contact-subject"
                        value={form.subject}
                        onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                        className="admin-input"
                      >
                        {subjects.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="admin-label">Message *</label>
                      <textarea
                        id="contact-message"
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="How can we help?"
                        required
                        rows={5}
                        className="admin-input resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p role="alert" className="text-red-600 text-sm font-body">{statusMessage}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full btn-primary disabled:opacity-50"
                    >
                      {status === 'loading' ? 'Sending...' : 'Send Message →'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
