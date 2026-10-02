'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
  title?: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, url, className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy URL', err);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShare}
        className={`w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high hover:text-primary transition-all border border-outline-variant/40 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/40 ${className}`}
        title="Share link"
        aria-label="Share link"
      >
        {copied ? (
          <Check className="w-4 h-4 text-primary animate-in zoom-in-50 duration-200" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
      </button>

      {/* Toast Notification */}
      {copied && (
        <div 
          role="status"
          aria-live="polite"
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface-container-highest border border-primary/40 text-primary font-label-sm text-xs rounded-full shadow-xl whitespace-nowrap z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          Link copied.
        </div>
      )}
    </div>
  );
}
