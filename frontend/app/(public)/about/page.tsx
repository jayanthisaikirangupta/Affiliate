import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'We help UK pet owners find the best gear through honest, expert-driven reviews. Learn about the PetGearHub team and our editorial process.',
};

const steps = [
  {
    icon: '🔍',
    number: '01',
    title: 'Research',
    description: 'We identify products worth reviewing from Amazon UK, Pets at Home, Zooplus, and other trusted UK retailers — focusing on quality, safety, and value.',
  },
  {
    icon: '⚖️',
    number: '02',
    title: 'Compare',
    description: 'We compare specifications, prices, and real user reviews across multiple platforms to separate the genuinely great from the merely marketed.',
  },
  {
    icon: '📊',
    number: '03',
    title: 'Analyse',
    description: 'Our editorial team analyses performance, value for money, durability, and pet safety — consulting specialist sources where appropriate.',
  },
  {
    icon: '✅',
    number: '04',
    title: 'Recommend',
    description: 'Only products that pass our full criteria make it onto the site. We are selective so you don\'t have to be.',
  },
];

const team = [
  {
    initials: 'ER',
    name: 'Emma Richards',
    role: 'Editor in Chief',
    bio: 'Emma has been writing about pet health and nutrition for over eight years. She shares her home with two rescue greyhounds and a very opinionated tabby cat.',
  },
  {
    initials: 'JW',
    name: 'James Watson',
    role: 'Dog Product Specialist',
    bio: 'James is a qualified canine behaviourist and lifelong dog owner. He tests every dog product with his three working cocker spaniels before it earns a recommendation.',
  },
  {
    initials: 'SC',
    name: 'Sarah Chen',
    role: 'Cat & Small Pets Expert',
    bio: 'Sarah volunteers at a local cat rescue and keeps a pair of guinea pigs. She brings hands-on experience to every feline and small-pet review.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 lg:pt-28 bg-warm-100">
        <div className="editorial-container">
          <nav className="flex items-center gap-2 text-sm font-body text-warm-600 py-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-navy-700">About</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-warm-100 py-20 lg:py-28">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-orange-500 mb-4 block">
                Our Story
              </span>
              <h1 className="font-display text-4xl lg:text-5xl font-semibold text-navy-900 leading-tight mb-6">
                About PetGearHub
              </h1>
              <p className="text-navy-700 font-body text-lg leading-relaxed">
                We help UK pet owners find the best gear through honest, expert-driven reviews — cutting through the noise so you can focus on what matters: your pet.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-28 bg-warm-100">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-orange-500 mb-4 block">
                Our Mission
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-navy-900 mb-6 leading-tight">
                Honest recommendations. No fluff.
              </h2>
              <p className="text-navy-700 font-body leading-relaxed mb-4">
                The UK pet industry is worth billions — and a lot of marketing is designed to confuse rather than inform. PetGearHub exists to cut through that noise with straightforward, research-backed recommendations you can actually trust.
              </p>
              <p className="text-navy-700 font-body leading-relaxed mb-4">
                We are pet owners ourselves. We understand the frustration of buying something that looked perfect online and turned out to be a disappointment. Every product on this site is here because we genuinely believe it delivers value for UK pet owners.
              </p>
              <p className="text-navy-700 font-body leading-relaxed">
                As an affiliate site, we earn a small commission when you buy through our links — but this never influences our recommendations. Our editorial independence is non-negotiable.{' '}
                <Link href="/affiliate-disclosure" className="text-orange-500 underline hover:no-underline">
                  Learn more about how we earn.
                </Link>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-white rounded-2xl p-8 border border-warm-200 shadow-card">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="font-display text-4xl font-bold text-orange-500 mb-1">Expert</p>
                    <p className="text-xs font-body text-warm-600 uppercase tracking-wide">Trusted Reviews</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-bold text-orange-500 mb-1">7</p>
                    <p className="text-xs font-body text-warm-600 uppercase tracking-wide">Categories</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-bold text-orange-500 mb-1">🇬🇧</p>
                    <p className="text-xs font-body text-warm-600 uppercase tracking-wide">UK-Based</p>
                  </div>
                </div>
                <div className="border-t border-warm-200 mt-8 pt-8">
                  <p className="text-sm font-body text-navy-700 italic leading-relaxed text-center">
                    &ldquo;We don&apos;t list everything — we list the right things.&rdquo;
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 lg:py-28 bg-warm-100">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-orange-500 mb-4 block">
                How We Work
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-navy-900 mb-4">
                Our Review Process
              </h2>
              <div className="divider" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-warm-200 shadow-card h-full hover:shadow-hover transition-shadow">
                  <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl" role="img" aria-hidden="true">{step.icon}</span>
                  </div>
                  <span className="text-xs font-body font-semibold tracking-widest text-warm-600 uppercase">{step.number}</span>
                  <h3 className="font-display text-xl font-semibold text-navy-900 mt-1 mb-3">{step.title}</h3>
                  <p className="text-sm font-body text-navy-700 leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-10">
              <Link href="/editorial-policy" className="btn-primary">
                Read Our Full Editorial Policy
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-warm-100">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-orange-500 mb-4 block">
                The People Behind the Reviews
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-navy-900 mb-4">
                Our Team
              </h2>
              <div className="divider" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 border border-warm-200 shadow-card text-center hover:shadow-hover transition-shadow">
                  <div className="w-20 h-20 rounded-full bg-warm-100-alt mx-auto mb-4 flex items-center justify-center">
                    <span className="font-display text-2xl font-semibold text-navy-700">{member.initials}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-navy-900 mb-1">{member.name}</h3>
                  <p className="text-xs font-body font-semibold uppercase tracking-widest text-orange-500 mb-4">{member.role}</p>
                  <p className="text-sm font-body text-navy-700 leading-relaxed">{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-warm-100 py-12">
        <div className="editorial-container">
          <div className="flex flex-wrap justify-center gap-12 text-center">
            {[
              { value: 'Expert', label: 'Trusted Reviews' },
              { value: '7', label: 'Categories' },
              { value: 'UK', label: 'Based & Focused' },
              { value: '100%', label: 'Editorial Independence' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold text-orange-500">{stat.value}</p>
                <p className="text-xs font-body text-navy-700 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
