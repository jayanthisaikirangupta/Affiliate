import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'PetGearHub — Curated Gear for Happy, Healthy Pets',
    template: '%s | PetGearHub',
  },
  description: 'Discover expert-picked pet products for dogs, cats, birds, fish, and small animals. Honest reviews and top recommendations from fellow pet owners.',
  openGraph: {
    description: 'Your go-to source for curated pet gear — honest reviews and expert picks for dogs, cats, birds, fish, and small animals. Find what your pet actually needs.',
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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
