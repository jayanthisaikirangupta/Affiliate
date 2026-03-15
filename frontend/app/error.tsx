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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4 text-center">
      <PawIcon className="w-12 h-12 text-text-muted" />
      <h1 className="font-display text-2xl text-primary">Something Went Wrong</h1>
      <p className="text-text-secondary max-w-sm">
        We hit an unexpected snag. Give it another try or head back to browse our picks.
      </p>
      <button
        onClick={reset}
        className="bg-accent text-white rounded-lg px-6 py-3 font-body font-semibold hover:bg-accent-dark transition-colors"
      >
        Try Again
      </button>
      <Link href="/" className="text-text-muted text-sm underline underline-offset-4 hover:text-primary transition-colors">
        Return to homepage
      </Link>
    </div>
  );
}
