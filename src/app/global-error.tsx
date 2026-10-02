'use client';

import { AlertCircle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-surface text-on-surface font-body-md">
          <div className="w-20 h-20 rounded-full bg-error/10 text-error flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-2 text-center">
            Critical System Error
          </h2>
          <p className="text-on-surface-variant max-w-md text-center mb-8">
            The application encountered a critical error. We apologize for the inconvenience.
          </p>
          
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-primary text-on-primary font-headline-sm uppercase tracking-wider rounded-lg hover:bg-primary-container transition-colors"
          >
            Recover Application
          </button>
        </div>
      </body>
    </html>
  );
}
