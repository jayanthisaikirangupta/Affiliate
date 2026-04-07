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
      {title && <h2 className="font-display text-2xl font-semibold text-navy-900 mb-8">{title}</h2>}
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className={`border border-warm-300 rounded-xl overflow-hidden ${openIndex === i ? 'bg-warm-50' : 'bg-white'}`}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-warm-50 transition-colors"
            >
              <span className="font-body font-bold text-navy-900 text-lg pr-4">{faq.question}</span>
              <span className={`flex-shrink-0 w-5 h-5 text-navy-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} aria-hidden="true">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 border-t border-warm-300">
                <p className="font-body text-navy-800 text-base leading-relaxed pt-4">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
