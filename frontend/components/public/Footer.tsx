import Link from 'next/link';
import FooterNewsletterForm from './FooterNewsletterForm';
import { PawIcon } from '@/components/PawIcon';
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

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
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 gold-gradient rounded-sm flex items-center justify-center">
                <PawIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-semibold text-white">PetGearHub</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
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
                    className="text-sm text-white/50 hover:text-accent transition-colors duration-200"
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
                    className="text-sm text-white/50 hover:text-accent transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Stay Updated
            </h4>
            <p className="text-sm text-white/50 mb-4">
              Get our latest finds delivered weekly.
            </p>
            <FooterNewsletterForm />
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <h4 className="font-display text-sm font-semibold text-white tracking-wide uppercase">
            Follow Us
          </h4>
          <div className="flex items-center gap-4">
            {[
              { label: 'Twitter', icon: Twitter, href: '#' },
              { label: 'Instagram', icon: Instagram, href: '#' },
              { label: 'Facebook', icon: Facebook, href: '#' },
              { label: 'YouTube', icon: Youtube, href: '#' },
            ].map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${label}`}
                className="text-white/60 hover:text-[#D4763C] transition-colors duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} PetGearHub. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
