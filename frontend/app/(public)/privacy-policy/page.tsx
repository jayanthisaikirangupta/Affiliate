import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How PetGearHub collects, uses, and protects your personal data — UK GDPR compliant privacy policy.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 lg:pt-28 bg-background">
        <div className="editorial-container">
          <nav className="flex items-center gap-2 text-sm font-body text-text-muted py-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-text-secondary">Privacy Policy</span>
          </nav>
        </div>
      </div>

      <section className="py-20 lg:py-28">
        <div className="editorial-container max-w-3xl">
          <div className="mb-12">
            <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent mb-4 block">
              Legal
            </span>
            <h1 className="font-display text-4xl font-semibold text-primary mb-4">Privacy Policy</h1>
            <p className="text-sm font-body text-text-muted">Last updated: March 2026</p>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">1. Who We Are</h2>
              <p className="font-body text-text-secondary leading-relaxed">
                PetGearHub (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website petgearhub.co.uk. We are a UK-based affiliate editorial website. For questions about this policy, contact us at{' '}
                <a href="mailto:privacy@petgearhub.co.uk" className="text-accent underline hover:no-underline">privacy@petgearhub.co.uk</a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">2. What Personal Data We Collect</h2>
              <p className="font-body text-text-secondary leading-relaxed mb-4">
                We collect personal data only when you actively provide it, or when it is collected automatically as part of your use of our site.
              </p>
              <ul className="space-y-3">
                {[
                  { title: 'Email address', desc: 'Collected when you subscribe to our newsletter or submit our contact form.' },
                  { title: 'Name', desc: 'Collected when you submit our contact form.' },
                  { title: 'Usage data', desc: 'Pages visited, time spent on site, browser type, device type — collected automatically via analytics tools.' },
                  { title: 'Cookie data', desc: 'As described in section 4 below.' },
                ].map((item) => (
                  <li key={item.title} className="font-body text-text-secondary leading-relaxed">
                    <strong className="text-primary">{item.title}:</strong> {item.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">3. How We Use Your Data</h2>
              <ul className="space-y-3">
                {[
                  'To send our newsletter (email address — only with your explicit consent).',
                  'To respond to enquiries submitted through our contact form.',
                  'To analyse how the site is used and improve our content (anonymised usage data).',
                  'To comply with legal obligations.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-text-secondary leading-relaxed">
                    <span className="text-accent font-semibold mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-body text-text-secondary leading-relaxed mt-4">
                We do not sell your personal data to third parties, and we do not use it for any purpose beyond what is described in this policy.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">4. Cookies</h2>
              <p className="font-body text-text-secondary leading-relaxed mb-4">
                We use three categories of cookies:
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Necessary cookies', desc: 'Essential for the site to function. These cannot be disabled. They include cookies that remember your cookie consent preferences.' },
                  { title: 'Analytics cookies', desc: 'Used to understand how visitors interact with the site (e.g., Google Analytics). These are only set with your consent.' },
                  { title: 'Marketing cookies', desc: 'Used by affiliate networks to track conversions. Only set with your consent.' },
                ].map((cookie) => (
                  <div key={cookie.title} className="bg-background rounded-lg p-4 border border-border-light">
                    <p className="font-body font-semibold text-primary text-sm mb-1">{cookie.title}</p>
                    <p className="font-body text-text-secondary text-sm leading-relaxed">{cookie.desc}</p>
                  </div>
                ))}
              </div>
              <p className="font-body text-text-secondary leading-relaxed mt-4">
                You can manage your cookie preferences at any time via the cookie consent banner at the bottom of the page.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">5. Third-Party Services</h2>
              <p className="font-body text-text-secondary leading-relaxed mb-4">
                We use the following third-party services, each of which has its own privacy policy:
              </p>
              <ul className="space-y-2">
                {[
                  'Google Analytics — website analytics',
                  'Amazon Associates — affiliate tracking',
                  'Vercel — website hosting and infrastructure',
                  'Neon — database hosting',
                ].map((service, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-text-secondary text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">6. Data Retention</h2>
              <ul className="space-y-2 font-body text-text-secondary leading-relaxed">
                <li><strong className="text-primary">Newsletter subscribers:</strong> Your email is retained until you unsubscribe. Each newsletter email includes an unsubscribe link.</li>
                <li><strong className="text-primary">Contact form submissions:</strong> Retained for up to 12 months, then deleted.</li>
                <li><strong className="text-primary">Analytics data:</strong> Aggregated and anonymised; individual data retained for up to 26 months by Google Analytics.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">7. Your Rights Under UK GDPR</h2>
              <p className="font-body text-text-secondary leading-relaxed mb-4">
                Under UK GDPR, you have the following rights in relation to your personal data:
              </p>
              <ul className="space-y-2">
                {[
                  'Right of access — to obtain a copy of your personal data.',
                  'Right to rectification — to correct inaccurate data.',
                  'Right to erasure — to request deletion of your data (the &ldquo;right to be forgotten&rdquo;).',
                  'Right to portability — to receive your data in a machine-readable format.',
                  'Right to object — to processing based on legitimate interests.',
                  'Right to withdraw consent — for any processing based on consent, at any time.',
                ].map((right, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-text-secondary text-sm leading-relaxed">
                    <span className="text-accent font-semibold mt-0.5 flex-shrink-0">→</span>
                    <span dangerouslySetInnerHTML={{ __html: right }} />
                  </li>
                ))}
              </ul>
              <p className="font-body text-text-secondary leading-relaxed mt-4">
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:privacy@petgearhub.co.uk" className="text-accent underline hover:no-underline">privacy@petgearhub.co.uk</a>.
                We will respond within 30 days. You also have the right to lodge a complaint with the{' '}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:no-underline">Information Commissioner&apos;s Office (ICO)</a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">8. Contact</h2>
              <p className="font-body text-text-secondary leading-relaxed">
                For any privacy-related enquiries, please email{' '}
                <a href="mailto:privacy@petgearhub.co.uk" className="text-accent underline hover:no-underline">privacy@petgearhub.co.uk</a>{' '}
                or use our{' '}
                <Link href="/contact" className="text-accent underline hover:no-underline">contact form</Link>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">9. Changes to This Policy</h2>
              <p className="font-body text-text-secondary leading-relaxed">
                We may update this privacy policy from time to time. The &ldquo;last updated&rdquo; date at the top of this page reflects the most recent revision. Continued use of our site after changes constitutes acceptance of the updated policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
