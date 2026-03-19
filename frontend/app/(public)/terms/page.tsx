import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for petgearhub.co.uk — governing your use of the site, affiliate links, intellectual property, and limitation of liability.',
};

export default function TermsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 lg:pt-28 bg-background">
        <div className="editorial-container">
          <nav className="flex items-center gap-2 text-sm font-body text-text-muted py-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-text-secondary">Terms of Use</span>
          </nav>
        </div>
      </div>

      <section className="py-20 lg:py-28">
        <div className="editorial-container max-w-3xl">
          <div className="mb-12">
            <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent mb-4 block">
              Legal
            </span>
            <h1 className="font-display text-4xl font-semibold text-primary mb-4">Terms of Use</h1>
            <p className="text-sm font-body text-text-muted">Last updated: March 2026</p>
          </div>

          <div className="space-y-10 font-body text-text-secondary leading-relaxed">
            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using petgearhub.co.uk (&ldquo;the Site&rdquo;), you accept and agree to be bound by these Terms of Use. If you do not agree, please discontinue use of the Site immediately. We reserve the right to update these terms at any time; continued use of the Site following changes constitutes your acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">2. Use of the Site</h2>
              <p className="mb-4">
                The Site is provided for personal, non-commercial use only. You may not use the Site for any unlawful purpose or in a manner that could damage, disable, or impair its operation.
              </p>
              <p>
                You agree not to: copy, reproduce, or redistribute Site content without prior written permission; use automated tools to scrape or aggregate content; attempt to gain unauthorised access to any part of the Site or its infrastructure.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">3. Affiliate Links &amp; Third-Party Sites</h2>
              <p className="mb-4">
                PetGearHub contains links to third-party websites and products via affiliate programmes. When you click these links and make a purchase, we may earn a commission. This is disclosed on every page containing affiliate links — see our full{' '}
                <Link href="/affiliate-disclosure" className="text-accent underline hover:no-underline">Affiliate Disclosure</Link>.
              </p>
              <p>
                We are not responsible for the content, accuracy, availability, or practices of third-party websites. Links to external sites do not constitute endorsement beyond the specific product recommendation. Your interaction with any third-party site is governed by that site&apos;s own terms and privacy policy.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">4. Intellectual Property</h2>
              <p>
                All content on petgearhub.co.uk — including text, images, graphics, logos, and editorial copy — is the intellectual property of PetGearHub or its licensors and is protected by UK copyright law. You may not reproduce, distribute, or create derivative works from any Site content without express written permission.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">5. Disclaimer of Warranties</h2>
              <p className="mb-4">
                The information on this Site is provided &ldquo;as is&rdquo; without warranty of any kind, express or implied. While we make every effort to ensure accuracy and currency, we do not guarantee that content is free from errors or that the Site will operate without interruption.
              </p>
              <p>
                Product recommendations are editorial opinions based on research at the time of publication. We do not guarantee that any product will meet your specific requirements or that pricing information will remain accurate. Always verify pricing and availability directly with the retailer before purchase.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">6. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, PetGearHub shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of — or inability to use — the Site, or from reliance on any information provided herein. This includes, but is not limited to, loss resulting from purchasing a product recommended on the Site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">7. Governing Law</h2>
              <p>
                These Terms of Use are governed by the laws of England and Wales. Any dispute arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">8. Contact</h2>
              <p>
                For legal enquiries, please contact us at{' '}
                <a href="mailto:legal@petgearhub.co.uk" className="text-accent underline hover:no-underline">legal@petgearhub.co.uk</a>{' '}
                or via our{' '}
                <Link href="/contact" className="text-accent underline hover:no-underline">contact form</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
