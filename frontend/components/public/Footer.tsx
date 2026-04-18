'use client';

import Link from 'next/link';

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*&\s*/g, '-and-')
    .replace(/\s+/g, '-');
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-navy-950 text-navy-300 overflow-hidden">
      {/* Decorative gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>

      {/* Subtle radial glow decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-radial from-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="editorial-container py-16 lg:py-24 relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img src="/petgearhub-logo.png" alt="PetGearHub" className="h-20 w-auto" />
            </div>
            <p className="text-sm text-navy-300 leading-relaxed max-w-xs font-light">
              PetGearHub helps you find the best gear for dogs, cats, birds, fish, and small animals through honest reviews and curated recommendations. As an affiliate site, we may earn a commission on purchases made through our links at no extra cost to you.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-display font-semibold text-white uppercase tracking-widest mb-6">
              Categories
            </h4>
            <ul className="space-y-3">
              {['Dog Supplies', 'Cat Products', 'Bird Supplies', 'Fish & Aquatics', 'Small Pets', 'Pet Accessories'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/categories/${toSlug(cat)}`}
                    className="text-sm text-navy-200 hover:text-orange-400 transition-colors duration-300 font-light"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-display font-semibold text-white uppercase tracking-widest mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About', href: '/about' },
                { label: 'Editorial Policy', href: '/editorial-policy' },
                { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Use', href: '/terms' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-navy-200 hover:text-orange-400 transition-colors duration-300 font-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-display font-semibold text-white uppercase tracking-widest mb-6">
              About PetGearHub
            </h4>
            <p className="text-sm text-navy-300 leading-relaxed mb-6 font-light">
              Independent product reviews and buyer's guides for UK pet owners. No paid reviews, no sponsored rankings.
            </p>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-navy-200 hover:text-orange-400 transition-colors duration-300 font-light">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-navy-200 hover:text-orange-400 transition-colors duration-300 font-light">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Back to top button and divider */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 pt-8 border-t border-navy-800">
          <div className="flex flex-col gap-4">
            <p className="text-xs text-navy-400 font-light">
              © {new Date().getFullYear()} PetGearHub. All rights reserved.
            </p>
            <p className="text-xs text-navy-400 font-light">
              Curated with precision for premium pet care.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-navy-400 hover:text-orange-400 transition-colors duration-300 font-light"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <svg
              className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
