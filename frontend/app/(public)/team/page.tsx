import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Meet the Team | PetGearHub',
  description:
    'Meet the passionate team of pet owners, veterinary professionals, and specialists behind PetGearHub — dedicated to helping you make the best choices for your pets.',
};

interface TeamMember {
  initials: string;
  avatarColor: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
}

const team: TeamMember[] = [
  {
    initials: 'SM',
    avatarColor: 'bg-orange-500',
    name: 'Sarah Mitchell',
    role: 'Editor-in-Chief',
    credentials: 'BSc Zoology · 15 years as pet journalist',
    bio: 'Sarah has three dogs and two cats. She oversees all editorial content and ensures every review meets our strict standards.',
  },
  {
    initials: 'JC',
    avatarColor: 'bg-[#2C4A3E]',
    name: 'Dr. James Chen',
    role: 'Veterinary Consultant',
    credentials: 'BVetMed MRCVS · Small Animal Veterinarian',
    bio: 'Dr. Chen reviews all health-related content to ensure accuracy and pet safety. He runs a small animal practice in London.',
  },
  {
    initials: 'ER',
    avatarColor: 'bg-[#6B3A2A]',
    name: 'Emma Rodriguez',
    role: 'Dog & Cat Specialist',
    credentials: 'Certified Animal Behaviourist',
    bio: 'Emma specialises in dog and cat behaviour and product testing. She personally tests every product with her pack of three rescue dogs.',
  },
  {
    initials: 'OT',
    avatarColor: 'bg-[#1A3A5C]',
    name: 'Oliver Thompson',
    role: 'Aquatics & Small Pet Expert',
    credentials: '20 years fishkeeping experience',
    bio: 'Oliver runs one of the UK\'s most popular fishkeeping blogs and brings deep expertise to our aquatics and small pet coverage.',
  },
  {
    initials: 'PS',
    avatarColor: 'bg-[#4A2C6B]',
    name: 'Priya Sharma',
    role: 'SEO & Content Manager',
    credentials: 'MA Digital Marketing',
    bio: 'Priya ensures our guides reach the people who need them. She\'s a proud rabbit owner and advocates for small pet welfare.',
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 lg:pt-28 bg-warm-100">
        <div className="editorial-container">
          <nav
            className="flex items-center gap-2 text-sm font-body text-warm-600 py-4"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-orange-500 transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-navy-700">Team</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-warm-100 py-20 lg:py-28">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-orange-500 mb-4 block">
                The People Behind the Reviews
              </span>
              <h1 className="font-display text-4xl lg:text-5xl font-semibold text-navy-900 leading-tight mb-6">
                Meet the PetGearHub Team
              </h1>
              <p className="text-navy-700 font-body text-lg leading-relaxed">
                We&apos;re a passionate team of pet owners and experts dedicated to helping you
                make the best choices for your pets.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-20 lg:py-28 bg-warm-100">
        <div className="editorial-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-8 border border-warm-200 shadow-card flex flex-col h-full hover:shadow-hover transition-shadow">
                  {/* Avatar */}
                  <div
                    className={`w-16 h-16 rounded-full ${member.avatarColor} flex items-center justify-center mb-5 flex-shrink-0`}
                    aria-hidden="true"
                  >
                    <span className="font-display text-xl font-semibold text-white">
                      {member.initials}
                    </span>
                  </div>

                  {/* Name & role */}
                  <h2 className="font-display text-xl font-semibold text-navy-900 mb-1">
                    {member.name}
                  </h2>
                  <p className="text-xs font-body font-bold uppercase tracking-widest text-orange-500 mb-3">
                    {member.role}
                  </p>

                  {/* Credentials badge */}
                  <div className="inline-flex items-center gap-1.5 bg-warm-100-alt border border-warm-200 rounded-full px-3 py-1 mb-4 self-start">
                    <svg
                      className="w-3 h-3 text-orange-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs font-body text-navy-700">
                      {member.credentials}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-sm font-body text-navy-700 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="py-20 lg:py-24 bg-warm-100">
        <div className="editorial-container">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-orange-500 mb-4 block">
                  How We Operate
                </span>
                <h2 className="font-display text-3xl lg:text-4xl font-semibold text-navy-900 mb-4">
                  Our Editorial Standards
                </h2>
                <div className="w-12 h-px bg-orange-500 mx-auto" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-2xl p-8 lg:p-10 border border-warm-200 shadow-card">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    {
                      icon: '🔒',
                      title: 'Full Independence',
                      text: 'No brand has editorial influence over our content. Every recommendation is made on merit alone.',
                    },
                    {
                      icon: '🚫',
                      title: 'No Paid Reviews',
                      text: 'We do not accept payment for reviews or guaranteed coverage. Our opinions cannot be bought.',
                    },
                    {
                      icon: '✅',
                      title: 'Genuine Opinions',
                      text: 'All views expressed are those of our team, based on research, testing, and real-world experience.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="text-center">
                      <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
                      <h3 className="font-display text-base font-semibold text-navy-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm font-body text-navy-700 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-warm-200 mt-8 pt-6 text-center">
                  <Link
                    href="/editorial-policy"
                    className="text-sm font-body text-orange-500 font-semibold hover:underline"
                  >
                    Read our full editorial policy &rarr;
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Work With Us */}
      <section className="py-20 lg:py-24 bg-warm-100">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-orange-500 mb-4 block">
                Press &amp; Partnerships
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-navy-900 mb-4">
                Work With Us
              </h2>
              <p className="text-navy-700 font-body text-lg leading-relaxed mb-8">
                Interested in press enquiries or brand partnerships? We&apos;d love to hear from you.
              </p>
              <a
                href="mailto:hello@petgearhub.co.uk"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-500/90 text-white font-body font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@petgearhub.co.uk
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
