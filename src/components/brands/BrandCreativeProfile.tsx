import { Sparkles, Layers, Share2, Globe, LayoutGrid, AlertCircle } from "lucide-react";
import Link from "next/link";

interface StatItem {
  name: string;
  count: number;
}

interface BrandCreativeProfileProps {
  profile: {
    brandName: string;
    brandSlug: string;
    totalIndexedAds: number;
    disclaimer: string;
    platforms: StatItem[];
    formats: StatItem[];
    themes: StatItem[];
    countries: StatItem[];
  };
}

export function BrandCreativeProfile({ profile }: BrandCreativeProfileProps) {
  const {
    brandName,
    brandSlug,
    totalIndexedAds,
    disclaimer,
    platforms,
    formats,
    themes,
    countries,
  } = profile;

  // Helper to calculate bar percentage relative to max in group
  const getPercentage = (count: number, items: StatItem[]) => {
    const max = Math.max(...items.map((i) => i.count), 1);
    return Math.round((count / max) * 100);
  };

  return (
    <section className="w-full bg-surface-container-low border border-outline-variant/40 rounded-2xl p-space-lg md:p-space-xl mb-space-xl shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-md border-b border-outline-variant/20 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-headline-md text-xl md:text-2xl text-on-surface uppercase tracking-wider font-bold">
              Creative Profile
            </h2>
          </div>
          <p className="font-body-sm text-xs text-outline tracking-wide flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-primary" />
            {disclaimer}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col md:items-end">
            <span className="font-label-sm text-xs uppercase tracking-widest text-outline">
              Indexed Creative
            </span>
            <span className="font-display text-3xl font-bold text-primary">
              {totalIndexedAds} <span className="text-sm font-sans font-normal text-on-surface-variant">ads</span>
            </span>
          </div>
        </div>
      </div>

      {/* Summary Chips: Platforms, Formats, Themes, Countries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md my-space-lg">
        {/* Platforms */}
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
          <span className="font-label-sm text-xs text-outline uppercase tracking-widest flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-primary" /> Platforms
          </span>
          <div className="flex flex-wrap gap-1.5">
            {platforms.map((p) => (
              <Link
                key={p.name}
                href={`/search?brand=${brandSlug}&platform=${encodeURIComponent(p.name.toLowerCase())}`}
                className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs font-label-md text-on-surface hover:border-primary transition-colors"
              >
                {p.name} ({p.count})
              </Link>
            ))}
          </div>
        </div>

        {/* Formats */}
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
          <span className="font-label-sm text-xs text-outline uppercase tracking-widest flex items-center gap-1.5">
            <LayoutGrid className="w-3.5 h-3.5 text-primary" /> Formats
          </span>
          <div className="flex flex-wrap gap-1.5">
            {formats.map((f) => (
              <Link
                key={f.name}
                href={`/search?brand=${brandSlug}&format=${encodeURIComponent(f.name.toLowerCase())}`}
                className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs font-label-md text-on-surface hover:border-primary transition-colors"
              >
                {f.name} ({f.count})
              </Link>
            ))}
          </div>
        </div>

        {/* Creative Themes */}
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
          <span className="font-label-sm text-xs text-outline uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Creative Themes
          </span>
          <div className="flex flex-wrap gap-1.5">
            {themes.slice(0, 4).map((t) => (
              <Link
                key={t.name}
                href={`/search?brand=${brandSlug}&q=${encodeURIComponent(t.name.toLowerCase())}`}
                className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs font-label-md text-primary hover:border-primary transition-colors"
              >
                {t.name}
              </Link>
            ))}
            {themes.length === 0 && (
              <span className="text-xs text-outline">Brand storytelling</span>
            )}
          </div>
        </div>

        {/* Countries */}
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
          <span className="font-label-sm text-xs text-outline uppercase tracking-widest flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-primary" /> Countries
          </span>
          <div className="flex flex-wrap gap-1.5">
            {countries.map((c) => (
              <Link
                key={c.name}
                href={`/countries/${c.name.toLowerCase()}`}
                className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs font-label-md text-on-surface hover:border-primary transition-colors"
              >
                {c.name} ({c.count})
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Charts: Lightweight CSS Bars */}
      <div className="pt-space-md border-t border-outline-variant/20">
        <h3 className="font-label-sm text-xs uppercase tracking-widest text-outline mb-space-md">
          Creative Breakdown (Observed Dataset)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Format Distribution */}
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
            <span className="font-label-md text-xs text-on-surface uppercase tracking-wider font-semibold flex items-center justify-between">
              <span>Format Distribution</span>
              <span className="w-2 h-2 rounded-full bg-primary" />
            </span>
            <div className="flex flex-col gap-2.5">
              {formats.map((f) => {
                const pct = getPercentage(f.count, formats);
                return (
                  <div key={f.name} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-label-sm">
                      <span className="text-on-surface-variant">{f.name}</span>
                      <span className="text-outline font-mono">{f.count} ads</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
            <span className="font-label-md text-xs text-on-surface uppercase tracking-wider font-semibold flex items-center justify-between">
              <span>Platform Distribution</span>
              <span className="w-2 h-2 rounded-full bg-secondary" />
            </span>
            <div className="flex flex-col gap-2.5">
              {platforms.map((p) => {
                const pct = getPercentage(p.count, platforms);
                return (
                  <div key={p.name} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-label-sm">
                      <span className="text-on-surface-variant">{p.name}</span>
                      <span className="text-outline font-mono">{p.count} ads</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div
                        className="h-full rounded-full bg-secondary transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Creative Themes */}
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
            <span className="font-label-md text-xs text-on-surface uppercase tracking-wider font-semibold flex items-center justify-between">
              <span>Creative Themes & Angles</span>
              <span className="w-2 h-2 rounded-full bg-[#b95f00]" />
            </span>
            <div className="flex flex-col gap-2.5">
              {(themes.length > 0 ? themes : [{ name: "Performance", count: 2 }, { name: "Lifestyle", count: 1 }]).slice(0, 4).map((t) => {
                const pct = getPercentage(t.count, themes.length > 0 ? themes : [{ name: "Performance", count: 2 }]);
                return (
                  <div key={t.name} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-label-sm">
                      <span className="text-on-surface-variant">{t.name}</span>
                      <span className="text-outline font-mono">{t.count}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#b95f00] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
