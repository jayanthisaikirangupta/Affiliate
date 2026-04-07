'use client';

import Link from 'next/link';
import { PawIcon } from '@/components/PawIcon';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-warm-100 flex flex-col items-center justify-center gap-6 px-4 text-center">
      <PawIcon className="w-12 h-12 text-warm-600" />
      <h1 className="font-display text-2xl text-navy-900">Something Went Wrong</h1>
      <p className="text-navy-700 max-w-sm">
        We hit an unexpected snag. Give it another try or head back to browse our picks.
      </p>
      <button
        onClick={reset}
        className="bg-amber-500 text-white rounded-lg px-6 py-3 font-body font-semibold hover:bg-amber-600 transition-colors"
      >
        Try Again
      </button>
      <Link href="/" className="text-warm-600 text-sm underline underline-offset-4 hover:text-navy-900 transition-colors">
        Return to homepage
      </Link>
    </div>
  );
}
