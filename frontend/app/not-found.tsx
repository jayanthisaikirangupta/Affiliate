import Link from 'next/link';
import { PawIcon } from '@/components/PawIcon';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-warm-100 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <p className="font-display text-8xl font-bold text-warm-600">404</p>
        <PawIcon className="w-9 h-9 text-orange-500" />
        <h1 className="font-display text-2xl text-navy-900">Page Not Found</h1>
        <p className="text-navy-700 max-w-sm">
          This page may have wandered off. Head back home and explore our latest curated picks.
        </p>
        <Link
          href="/"
          className="bg-orange-500 text-white rounded-lg px-6 py-3 font-body font-semibold hover:bg-orange-600 transition-colors"
        >
          Back to Homepage
        </Link>
        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          {['Dog Supplies', 'Cat Products', 'Bird Supplies', 'Fish & Aquatics'].map((cat) => (
            <Link
              key={cat}
              href={`/categories/${cat.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-')}`}
              className="text-navy-700 text-sm hover:text-navy-900 transition-colors"
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
