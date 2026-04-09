import '../styles/globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://petgearhub.co.uk'),
  title: {
    default: 'PetGearHub — Expert Pet Product Reviews for UK Pet Owners',
    template: '%s | PetGearHub',
  },
  description: 'Independent, expert-reviewed pet product guides and comparisons. UK prices, honest opinions, no paid reviews.',
  keywords: ['pet products', 'dog supplies', 'cat products', 'pet reviews', 'UK pet shop'],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://petgearhub.co.uk',
    siteName: 'PetGearHub',
    title: 'PetGearHub — Expert Pet Product Reviews',
    description: 'Independent, expert-reviewed pet product guides and comparisons for UK pet owners.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'PetGearHub' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@petgearhub',
    creator: '@petgearhub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://petgearhub.co.uk',
  },
  icons: {
    icon: '/petgearhub-logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen font-body bg-warm-100 text-navy-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'PetGearHub',
              url: 'https://petgearhub.co.uk',
              description: 'Independent, expert-reviewed pet product guides and comparisons for UK pet owners.',
              logo: 'https://petgearhub.co.uk/favicon.svg',
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
