import React from 'react';
import { Sparkles, Info } from 'lucide-react';
import { AffiliateCard } from './AffiliateCard';
import { SponsoredCard } from './SponsoredCard';
import { getRecommendedCreativeTools } from '@/lib/monetization/affiliates';
import { getFeaturedSponsor } from '@/lib/monetization/sponsors';
import { ToolCategory } from '@/lib/monetization/types';

interface MonetizationSectionProps {
  type: 'affiliate' | 'sponsored';
  title?: string;
  subtitle?: string;
  category?: ToolCategory;
  count?: number;
  className?: string;
}

export function MonetizationSection({
  type,
  title,
  subtitle,
  count = 4,
  className = '',
}: MonetizationSectionProps) {
  if (type === 'sponsored') {
    const sponsor = getFeaturedSponsor();
    if (!sponsor) return null;

    return (
      <section className={`w-full max-w-7xl mx-auto my-8 ${className}`}>
        <SponsoredCard sponsor={sponsor} />
      </section>
    );
  }

  // Affiliate recommendations
  const tools = getRecommendedCreativeTools(count);
  if (tools.length === 0) return null;

  const defaultTitle = title || "Recommended Creative Production Tools";
  const defaultSubtitle = subtitle || "Software and resources frequently used to execute high-retention advertising concepts.";

  return (
    <section className={`w-full max-w-7xl mx-auto my-12 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-outline-variant/30 gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-label-sm text-xs text-primary uppercase tracking-widest font-semibold">
              Production Toolkit
            </span>
          </div>
          <h2 className="font-display text-2xl text-zinc-100 uppercase tracking-tight font-bold">
            {defaultTitle}
          </h2>
          <p className="font-body-sm text-xs sm:text-sm text-zinc-400 mt-1">
            {defaultSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-label-sm text-zinc-500">
          <Info className="w-3.5 h-3.5 text-zinc-500" />
          <span>Curated ecosystem links</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <AffiliateCard key={tool.id} tool={tool} />
        ))}
      </div>

      {/* Ethical Disclosure Statement */}
      <div className="mt-4 text-center">
        <p className="font-label-sm text-[10px] text-zinc-500 uppercase tracking-wider">
          Transparency Notice: AdScope may earn an affiliate commission from qualifying partner links. This does not affect how advertising information is indexed.
        </p>
      </div>
    </section>
  );
}
