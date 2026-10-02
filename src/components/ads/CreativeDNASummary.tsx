import Link from "next/link";
import { Dna, Sparkles, HelpCircle } from "lucide-react";
import { CreativeDNAData } from "@/types/creative-dna";

interface CreativeDNASummaryProps {
  dna?: CreativeDNAData | null;
  adFormat?: string;
}

export function CreativeDNASummary({ dna, adFormat }: CreativeDNASummaryProps) {
  const hook = dna?.hookType || "Bold Statement";
  const visualStyle = dna?.visualStyle || "Cinematic";
  const emotionalAngle = dna?.emotionalAngle || "Inspiration";
  const format = dna?.contentFormat || adFormat || "Short-form Video";
  const cta = dna?.ctaType || "Shop Now";
  const audience = dna?.audienceInterpretation || "Athletes";
  const themes = dna?.themes && dna.themes.length > 0 
    ? dna.themes 
    : ["Athlete", "Performance", "Sports"];

  return (
    <div className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-space-lg">
      <div className="flex items-center justify-between mb-space-md pb-space-sm border-b border-outline-variant/20">
        <div className="flex items-center gap-2">
          <Dna className="w-5 h-5 text-primary" />
          <h3 className="font-headline-sm text-headline-sm uppercase tracking-wider text-on-surface font-semibold">
            Creative DNA
          </h3>
        </div>
        <span className="font-label-sm text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">
          Indexed Attributes
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md mb-space-md">
        {/* Hook */}
        <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
          <span className="font-label-sm text-xs text-outline uppercase tracking-widest">Hook</span>
          <Link
            href={`/search?hook=${encodeURIComponent(hook.toLowerCase())}`}
            className="inline-flex items-center gap-1.5 font-label-md text-sm text-on-surface hover:text-primary transition-colors group"
          >
            <span className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/40 text-primary group-hover:border-primary transition-colors">
              {hook}
            </span>
          </Link>
        </div>

        {/* Visual Style */}
        <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
          <span className="font-label-sm text-xs text-outline uppercase tracking-widest">Visual Style</span>
          <Link
            href={`/search?creativeStyle=${encodeURIComponent(visualStyle.toLowerCase())}`}
            className="inline-flex items-center gap-1.5 font-label-md text-sm text-on-surface hover:text-primary transition-colors group"
          >
            <span className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/40 text-primary group-hover:border-primary transition-colors">
              {visualStyle}
            </span>
          </Link>
        </div>

        {/* Emotional Angle */}
        <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
          <span className="font-label-sm text-xs text-outline uppercase tracking-widest">Emotional Angle</span>
          <Link
            href={`/search?q=${encodeURIComponent(emotionalAngle.toLowerCase())}`}
            className="inline-flex items-center gap-1.5 font-label-md text-sm text-on-surface hover:text-primary transition-colors group"
          >
            <span className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/40 text-on-surface group-hover:border-primary transition-colors">
              {emotionalAngle}
            </span>
          </Link>
        </div>

        {/* Format */}
        <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
          <span className="font-label-sm text-xs text-outline uppercase tracking-widest">Format</span>
          <Link
            href={`/search?format=${encodeURIComponent(format.toLowerCase())}`}
            className="inline-flex items-center gap-1.5 font-label-md text-sm text-on-surface hover:text-primary transition-colors group"
          >
            <span className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/40 text-on-surface group-hover:border-primary transition-colors">
              {format}
            </span>
          </Link>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
          <span className="font-label-sm text-xs text-outline uppercase tracking-widest">CTA</span>
          <Link
            href={`/search?q=${encodeURIComponent(cta.toLowerCase())}`}
            className="inline-flex items-center gap-1.5 font-label-md text-sm text-on-surface hover:text-primary transition-colors group"
          >
            <span className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/40 text-on-surface group-hover:border-primary transition-colors">
              {cta}
            </span>
          </Link>
        </div>

        {/* Audience Interpretation */}
        <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
          <div className="flex items-center gap-1">
            <span className="font-label-sm text-xs text-outline uppercase tracking-widest">Audience Interpretation</span>
          </div>
          <Link
            href={`/search?q=${encodeURIComponent(audience.toLowerCase())}`}
            className="inline-flex items-center gap-1.5 font-label-md text-sm text-on-surface hover:text-primary transition-colors group"
          >
            <span className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/40 text-on-surface group-hover:border-primary transition-colors">
              {audience}
            </span>
          </Link>
        </div>
      </div>

      {/* Themes */}
      <div className="pt-space-sm border-t border-outline-variant/20">
        <span className="font-label-sm text-xs text-outline uppercase tracking-widest block mb-2">
          Themes & Visual Motifs
        </span>
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <Link
              key={theme}
              href={`/search?q=${encodeURIComponent(theme.toLowerCase())}`}
              className="px-3 py-1 rounded-full bg-surface-container border border-outline-variant/40 font-label-sm text-xs text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
            >
              {theme}
            </Link>
          ))}
        </div>
      </div>

      {/* Important Disclaimer Note */}
      <div className="mt-space-md flex items-start gap-2 pt-space-xs text-outline font-body-sm text-xs">
        <HelpCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <span>
          Audience interpretation is an editorial hypothesis inferred from creative styling, not verified demographic measurement.
        </span>
      </div>
    </div>
  );
}
