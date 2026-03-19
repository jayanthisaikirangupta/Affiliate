'use client';

import { useState } from 'react';

interface FAQ { question: string; answer: string; }

export default function FAQAccordion({ faqs, title = 'Frequently Asked Questions' }: { faqs: FAQ[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs?.length) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {title && <h2 className="font-display text-2xl font-semibold text-primary mb-8">{title}</h2>}
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-border-light rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-background transition-colors"
            >
              <span className="font-body font-semibold text-primary text-sm sm:text-base pr-4">{faq.question}</span>
              <span className={`flex-shrink-0 w-5 h-5 text-accent transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`} aria-hidden="true">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {openIndex === i && (
              <div className="px-6 pb-5 border-t border-border-light">
                <p className="font-body text-text-secondary text-sm leading-relaxed pt-4">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
