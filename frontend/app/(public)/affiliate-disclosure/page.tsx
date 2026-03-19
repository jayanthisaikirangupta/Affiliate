import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'PetGearHub participates in affiliate programmes. Learn how we earn commissions, and how this is handled in compliance with UK CMA guidelines.',
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 lg:pt-28 bg-background">
        <div className="editorial-container">
          <nav className="flex items-center gap-2 text-sm font-body text-text-muted py-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-text-secondary">Affiliate Disclosure</span>
          </nav>
        </div>
      </div>

      <section className="py-20 lg:py-28">
        <div className="editorial-container max-w-3xl">
          <div className="mb-12">
            <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent mb-4 block">
              Transparency
            </span>
            <h1 className="font-display text-4xl font-semibold text-primary mb-4">Affiliate Disclosure</h1>
            <p className="text-sm font-body text-text-muted">Last updated: March 2026</p>
          </div>

          <div className="prose-custom space-y-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">What Is an Affiliate Link?</h2>
              <p className="font-body text-text-secondary leading-relaxed mb-4">
                PetGearHub participates in affiliate advertising programmes. This means that when you click a link to a product on our site and make a purchase, we may earn a small commission from the retailer — at absolutely no extra cost to you. The price you pay is exactly the same whether or not you arrive at the retailer via our link.
              </p>
              <p className="font-body text-text-secondary leading-relaxed">
                These commissions are how we fund the site, pay our writers, and continue producing free, independent reviews for UK pet owners.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">What This Means For You</h2>
              <ul className="space-y-3">
                {[
                  'You never pay more — affiliate commissions are paid by the retailer, not added to your price.',
                  'Our recommendations are not influenced by commission rates. A product with a higher commission rate is not featured simply because it pays us more.',
                  'We recommend products we genuinely believe in, regardless of whether an affiliate programme exists.',
                  'All affiliate links on the site are clearly identified.',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-text-secondary leading-relaxed">
                    <span className="text-accent font-semibold mt-0.5 flex-shrink-0">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">Our Affiliate Partners</h2>
              <p className="font-body text-text-secondary leading-relaxed mb-4">
                We currently participate in affiliate programmes with the following retailers:
              </p>
              <ul className="space-y-2">
                {[
                  'Amazon Associates UK (amazon.co.uk)',
                  'Pets at Home Affiliate Programme',
                  'Zooplus UK Affiliate Programme',
                  'PetPlanet',
                  'Other UK pet retailers (disclosed on a per-link basis)',
                ].map((partner, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-text-secondary text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                    {partner}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">UK CMA Compliance</h2>
              <p className="font-body text-text-secondary leading-relaxed mb-4">
                PetGearHub operates in compliance with the UK Competition and Markets Authority (CMA) guidelines on endorsements and reviews. We are required to clearly disclose material commercial relationships — including affiliate links — and we take this obligation seriously.
              </p>
              <p className="font-body text-text-secondary leading-relaxed">
                Under the Consumer Protection from Unfair Trading Regulations 2008 and the CAP Code, failing to disclose commercial relationships is a breach of consumer protection law. We believe transparency is not just a legal obligation but the ethical foundation of trustworthy editorial content.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">Editorial Honesty Policy</h2>
              <p className="font-body text-text-secondary leading-relaxed mb-4">
                Our editorial team operates independently of our commercial relationships. No brand, advertiser, or affiliate partner has editorial control over what we publish or how we score products.
              </p>
              <p className="font-body text-text-secondary leading-relaxed">
                For full details of how we research and write our recommendations, please read our{' '}
                <Link href="/editorial-policy" className="text-accent underline hover:no-underline">Editorial Policy</Link>.
              </p>
            </div>

            <div className="bg-background border border-border-light rounded-xl p-6">
              <p className="font-body text-text-secondary text-sm leading-relaxed">
                <strong className="text-primary">Questions?</strong> If you have any questions about how we handle affiliate relationships, or if you believe a recommendation on this site does not reflect honest editorial judgement, please{' '}
                <Link href="/contact" className="text-accent underline hover:no-underline">contact us</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
