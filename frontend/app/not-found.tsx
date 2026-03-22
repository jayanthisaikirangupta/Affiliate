import Link from 'next/link';
import { PawIcon } from '@/components/PawIcon';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4 text-center">
        <p className="font-display text-8xl font-bold text-text-muted">404</p>
        <PawIcon className="w-9 h-9 text-accent" />
        <h1 className="font-display text-2xl text-primary">Page Not Found</h1>
        <p className="text-text-secondary max-w-sm">
          This page may have wandered off. Head back home and explore our latest curated picks.
        </p>
        <Link
          href="/"
          className="bg-accent text-white rounded-lg px-6 py-3 font-body font-semibold hover:bg-accent-dark transition-colors"
        >
          Back to Homepage
        </Link>
        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          {['Dog Supplies', 'Cat Products', 'Bird Supplies', 'Fish & Aquatics'].map((cat) => (
            <Link
              key={cat}
              href={`/categories/${cat.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-')}`}
              className="text-text-secondary text-sm hover:text-primary transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
