import Link from 'next/link';

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*&\s*/g, '-and-')
    .replace(/\s+/g, '-');
}

export default function Footer() {
  return (
    <footer className="bg-primary text-white/80">
      <div className="editorial-container py-16 lg:py-24">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img src="/logo-white.svg" alt="PetGearHub" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-white/75 leading-relaxed max-w-xs">
              PetGearHub helps you find the best gear for dogs, cats, birds, fish, and small animals through honest reviews and curated recommendations. As an affiliate site, we may earn a commission on purchases made through our links at no extra cost to you.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {['Dog Supplies', 'Cat Products', 'Bird Supplies', 'Fish & Aquatics', 'Small Pets', 'Pet Accessories'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/categories/${toSlug(cat)}`}
                    className="text-sm text-white/75 hover:text-accent transition-colors duration-200"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
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
                    className="text-sm text-white/75 hover:text-accent transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-wide uppercase mb-4">
              About PetGearHub
            </h4>
            <p className="text-sm text-white/75 leading-relaxed mb-4">
              Independent product reviews and buyer's guides for UK pet owners. No paid reviews, no sponsored rankings.
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-white/75 hover:text-accent transition-colors duration-200">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/75 hover:text-accent transition-colors duration-200">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} PetGearHub. All rights reserved.
          </p>
          <p className="text-xs text-white/50">
            Built with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
