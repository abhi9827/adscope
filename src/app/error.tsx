'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="w-20 h-20 rounded-full bg-error/10 text-error flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-display font-bold uppercase tracking-tight text-on-surface mb-2 text-center">
        Something went wrong!
      </h2>
      <p className="text-on-surface-variant max-w-md text-center mb-8">
        We ran into an unexpected issue while loading this page. Our team has been notified.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-primary text-on-primary font-headline-sm uppercase tracking-wider rounded-lg hover:bg-primary-container transition-colors"
        >
          Try again
        </button>
        <Link href="/" className="px-8 py-3 border border-outline-variant text-on-surface font-headline-sm uppercase tracking-wider rounded-lg hover:bg-surface-container transition-colors">
          Go Home
        </Link>
      </div>
    </div>
  );
}
