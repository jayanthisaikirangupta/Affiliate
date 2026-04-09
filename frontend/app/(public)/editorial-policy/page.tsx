import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'How PetGearHub reviews and recommends pet products — our methodology, scoring criteria, and commitment to editorial independence.',
};

const scoringCriteria = [
  {
    icon: '💰',
    title: 'Value for Money',
    description: 'Does the product deliver genuine quality relative to its price? We assess across budget, mid-range, and premium tiers.',
  },
  {
    icon: '🛡️',
    title: 'Pet Safety',
    description: 'Is it made from pet-safe, non-toxic materials? We check for choking hazards, harmful coatings, and structural integrity.',
  },
  {
    icon: '🔩',
    title: 'Durability',
    description: 'Will it hold up to daily use by active, boisterous, or heavy-chewing pets? We factor in build quality and materials.',
  },
  {
    icon: '🐾',
    title: 'Pet Appeal',
    description: 'Do pets actually engage with it? We consider real user feedback and expert behavioural insight.',
  },
  {
    icon: '👋',
    title: 'Ease of Use',
    description: 'Is it straightforward for pet owners to use, clean, and maintain? Convenience matters as much as quality.',
  },
];

const steps = [
  { number: '01', title: 'Research', description: 'We identify candidate products from UK retailers including Amazon UK, Pets at Home, Zooplus, and PetPlanet. We focus on products with genuine user reviews and demonstrable track records.' },
  { number: '02', title: 'Compare', description: 'Each product is compared against similar alternatives across our scoring criteria. We analyse specifications, price histories, and independent review sources.' },
  { number: '03', title: 'Analyse', description: 'Our editorial team synthesises the data, consulting veterinary or specialist sources where product claims involve health or safety. We apply our scoring rubric systematically.' },
  { number: '04', title: 'Recommend', description: 'Only products that score well across our criteria earn a place on PetGearHub. We update our recommendations when better products emerge or existing ones decline in quality.' },
];

export default function EditorialPolicyPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 lg:pt-28 bg-warm-100">
        <div className="editorial-container">
          <nav className="flex items-center gap-2 text-sm font-body text-warm-600 py-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-navy-800">Editorial Policy</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-warm-50 py-20 lg:py-28">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-orange-600 mb-4 block">
                Standards & Process
              </span>
              <h1 className="font-display text-4xl lg:text-5xl font-semibold text-navy-900 leading-tight mb-6">
                How We Review & Recommend Products
              </h1>
              <p className="text-navy-800 font-body text-lg leading-relaxed">
                Our commitment to honest, independent editorial — explained in full.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Review Process */}
      <section className="py-20 lg:py-28 bg-warm-100">
        <div className="editorial-container max-w-3xl">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-semibold text-navy-900 mb-8">Our Review Process</h2>
            <p className="text-navy-800 font-body leading-relaxed mb-8">
              Every product featured on PetGearHub goes through a consistent four-stage review process. We do not list products simply because a brand has asked us to, or because they offer a higher affiliate commission rate. Our editorial process is the same regardless of the commercial relationship.
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.08}>
                <div className="flex gap-6 bg-white rounded-xl p-6 border border-warm-200 shadow-card hover:shadow-hover transition-shadow">
                  <div className="flex-shrink-0">
                    <span className="font-display text-2xl font-bold text-orange-600">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">{step.title}</h3>
                    <p className="font-body text-navy-800 leading-relaxed text-sm">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scoring Criteria */}
      <section className="py-20 lg:py-28 bg-warm-100">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-orange-600 mb-4 block">
                What We Measure
              </span>
              <h2 className="font-display text-3xl font-semibold text-navy-900 mb-4">
                Our Scoring Criteria
              </h2>
              <p className="text-navy-800 font-body leading-relaxed">
                Every product is assessed against five core criteria. No single criterion dominates — we look for a balanced score across all five.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {scoringCriteria.map((criterion, i) => (
              <ScrollReveal key={criterion.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 border border-warm-200 shadow-card text-center h-full hover:shadow-hover transition-shadow">
                  <span className="text-3xl block mb-3" role="img" aria-hidden="true">{criterion.icon}</span>
                  <h3 className="font-display text-base font-semibold text-navy-900 mb-2">{criterion.title}</h3>
                  <p className="text-xs font-body text-navy-800 leading-relaxed">{criterion.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Test */}
      <section className="py-20 lg:py-28 bg-warm-100-alt">
        <div className="editorial-container max-w-3xl">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-semibold text-navy-900 mb-6">How We Test</h2>
            <p className="text-navy-800 font-body leading-relaxed mb-4">
              PetGearHub operates as a research-driven editorial operation. Our reviews are based on thorough analysis of product specifications, verified user feedback, independent test results, and expert consultation — rather than brief hands-on trial.
            </p>
            <p className="text-navy-800 font-body leading-relaxed mb-4">
              For health-related products — supplements, veterinary aids, specialist diets — we consult published veterinary guidance and peer-reviewed sources. We never make health claims that exceed the available evidence.
            </p>
            <p className="text-navy-800 font-body leading-relaxed">
              We update our reviews regularly. When a product's quality changes, its price moves significantly, or a better alternative emerges, we revise our recommendation accordingly. All review dates are displayed on product and article pages.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Editorial Independence */}
      <section className="py-20 lg:py-28 bg-warm-100">
        <div className="editorial-container max-w-3xl">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-semibold text-navy-900 mb-6">Editorial Independence</h2>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5" role="img" aria-hidden="true">⚠️</span>
                <p className="font-body text-navy-800 leading-relaxed">
                  <strong className="text-navy-900">Important:</strong> PetGearHub earns affiliate commissions from purchases made through our links. This is how we fund the site. However, our editorial recommendations are made independently — no commission rate, payment, or brand relationship influences which products we recommend or how we score them.
                </p>
              </div>
            </div>

            <p className="text-navy-800 font-body leading-relaxed mb-4">
              We have turned down paid placement requests and declined to feature products that did not meet our standards, regardless of the commercial offer. We have also negatively reviewed products from brands we have commercial relationships with when the evidence supported that conclusion.
            </p>
            <p className="text-navy-800 font-body leading-relaxed">
              If you ever feel a recommendation on PetGearHub does not reflect honest editorial judgement, please{' '}
              <Link href="/contact" className="text-orange-600 underline hover:text-orange-600-text hover:no-underline">contact us</Link>{' '}
              and we will investigate.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
