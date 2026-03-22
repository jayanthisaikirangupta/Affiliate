import '../styles/globals.css';
import type { Metadata } from 'next';

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
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
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
