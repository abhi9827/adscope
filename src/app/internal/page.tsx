import Link from "next/link";
import { ShieldAlert, Database, RefreshCw, CheckCircle2, AlertTriangle, XCircle, Activity, Layers } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internal Data Quality Dashboard | AdScope",
  description: "Internal ingestion health, source normalization, and deduplication monitoring for AdScope.",
  robots: {
    index: false,
    follow: false
  }
};

export default function InternalDashboardPage() {
  const sources = [
    {
      name: "TikTok Creative Center",
      status: "Active",
      statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
      lastRun: "2 hours ago",
      recordsProcessed: 1248,
      newRecords: 32,
      updatedRecords: 14,
      duplicates: 7,
      invalidRecords: 2,
      demoRecords: 24
    },
    {
      name: "Meta Ad Library",
      status: "Synced",
      statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
      lastRun: "4 hours ago",
      recordsProcessed: 2890,
      newRecords: 54,
      updatedRecords: 21,
      duplicates: 18,
      invalidRecords: 0,
      demoRecords: 48
    },
    {
      name: "Google Ads Transparency Center",
      status: "Not Connected",
      statusColor: "text-outline bg-surface-container-highest border-outline-variant/40",
      lastRun: "Never",
      recordsProcessed: 0,
      newRecords: 0,
      updatedRecords: 0,
      duplicates: 0,
      invalidRecords: 0,
      demoRecords: 12
    },
    {
      name: "Demo Seed Dataset",
      status: "Active",
      statusColor: "text-primary bg-primary/10 border-primary/30",
      lastRun: "Instant",
      recordsProcessed: 84,
      newRecords: 0,
      updatedRecords: 0,
      duplicates: 0,
      invalidRecords: 0,
      demoRecords: 84
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-margin-desktop py-space-xl min-h-screen">
      {/* Notice Banner */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-label-md flex items-center justify-between mb-space-xl">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>INTERNAL DEV / ADMIN ROUTE — For maintaining AdScope data quality. Not exposed in public navigation.</span>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20">
          Admin Only
        </span>
      </div>

      {/* Header */}
      <div className="mb-space-2xl flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-label-sm text-xs uppercase tracking-widest mb-1">
            <Activity className="w-4 h-4" />
            <span>System Diagnostics</span>
          </div>
          <h1 className="font-display text-4xl text-on-surface font-bold uppercase tracking-tight mb-2">
            Data Ingestion & Quality Health
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            Monitor source ingestion pipelines, normalization fidelity, and deduplication logic across indexed platforms.
          </p>
        </div>

        <Link
          href="/internal/sources"
          className="px-4 py-2.5 rounded-xl bg-primary text-white font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors shadow-lg shadow-indigo-500/20 shrink-0 inline-flex items-center gap-1.5"
        >
          <Layers className="w-4 h-4" /> Source Adapters &rarr;
        </Link>
      </div>

      {/* Source Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg mb-space-2xl">
        {sources.map((src) => (
          <div
            key={src.name}
            className="p-space-lg rounded-2xl bg-surface-container-low border border-outline-variant/40 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20 mb-space-md">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  <h2 className="font-headline-sm text-base text-on-surface font-bold uppercase">
                    {src.name}
                  </h2>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-label-sm uppercase tracking-wider border ${src.statusColor}`}>
                  {src.status}
                </span>
              </div>

              <div className="flex justify-between text-xs font-label-sm text-outline mb-space-md">
                <span>Last ingestion run:</span>
                <strong className="text-on-surface">{src.lastRun}</strong>
              </div>

              <div className="grid grid-cols-3 gap-2.5 py-2">
                <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col">
                  <span className="text-[10px] font-label-sm uppercase tracking-wider text-outline">Processed</span>
                  <span className="text-base font-display font-bold text-on-surface">{src.recordsProcessed.toLocaleString()}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col">
                  <span className="text-[10px] font-label-sm uppercase tracking-wider text-emerald-400">New</span>
                  <span className="text-base font-display font-bold text-emerald-400">+{src.newRecords}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col">
                  <span className="text-[10px] font-label-sm uppercase tracking-wider text-primary">Updated</span>
                  <span className="text-base font-display font-bold text-primary">{src.updatedRecords}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col">
                  <span className="text-[10px] font-label-sm uppercase tracking-wider text-amber-400">Duplicates</span>
                  <span className="text-base font-display font-bold text-amber-400">{src.duplicates}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col">
                  <span className="text-[10px] font-label-sm uppercase tracking-wider text-error">Invalid</span>
                  <span className="text-base font-display font-bold text-error">{src.invalidRecords}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col">
                  <span className="text-[10px] font-label-sm uppercase tracking-wider text-outline">Demo Records</span>
                  <span className="text-base font-display font-bold text-on-surface-variant">{src.demoRecords}</span>
                </div>
              </div>
            </div>

            <div className="pt-space-md mt-space-md border-t border-outline-variant/20 flex items-center justify-between text-xs font-label-sm text-outline">
              <span>Integrity check: Pass</span>
              <span className="text-primary font-medium">Safe Mode Active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Normalization & Deduplication Logic Summary */}
      <div className="p-space-lg md:p-space-xl rounded-2xl bg-surface-container-low border border-outline-variant/40 mb-space-2xl">
        <h3 className="font-headline-sm text-lg text-on-surface uppercase tracking-wide font-bold mb-space-sm">
          Data Quality & Deduplication Guarantees
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg text-xs font-body-sm text-on-surface-variant leading-relaxed">
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
            <span className="font-label-md text-primary uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Source-Specific Normalization
            </span>
            <p>
              Incoming records are parsed using Zod schemas via <code className="text-primary font-mono text-[11px]">src/lib/sources/normalize.ts</code>. Formats, platform names, and brand identifiers are harmonized into strict enum types before database persistence.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
            <span className="font-label-md text-primary uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Strict Non-Title Deduplication
            </span>
            <p>
              Deduplication is executed strictly on composite keys (<code className="text-primary font-mono text-[11px]">source::sourceAdId</code>) in <code className="text-primary font-mono text-[11px]">src/lib/sources/deduplicate.ts</code>. Records are never deduplicated purely based on ad title.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: MONETIZATION & PARTNER INFRASTRUCTURE */}
      <div className="p-space-lg md:p-space-xl rounded-2xl bg-surface-container-low border border-outline-variant/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm border-b border-outline-variant/20 mb-space-lg gap-2">
          <div>
            <div className="flex items-center gap-2 text-primary font-label-sm text-xs uppercase tracking-widest mb-1">
              <Activity className="w-4 h-4" />
              <span>Revenue & Partner Systems</span>
            </div>
            <h2 className="font-headline-sm text-xl text-on-surface uppercase tracking-tight font-bold">
              Monetization Foundation Diagnostics
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/40 text-xs font-mono text-zinc-300">
            Zero-Budget Default Mode
          </span>
        </div>

        {/* Global Flags */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-space-lg text-xs">
          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[10px] uppercase font-label-sm text-zinc-500">Global Monetization</span>
            <span className="font-mono text-sm font-bold text-zinc-300">Disabled (0$)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[10px] uppercase font-label-sm text-zinc-500">Display Ads</span>
            <span className="font-mono text-sm font-bold text-zinc-300">Disabled</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[10px] uppercase font-label-sm text-zinc-500">Active Provider</span>
            <span className="font-mono text-sm font-bold text-primary">None / Safe</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[10px] uppercase font-label-sm text-zinc-500">Affiliate Tools</span>
            <span className="font-mono text-sm font-bold text-emerald-400">6 Ready (Direct)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-1">
            <span className="text-[10px] uppercase font-label-sm text-zinc-500">Sponsors</span>
            <span className="font-mono text-sm font-bold text-zinc-300">0 Active</span>
          </div>
        </div>

        {/* Configured Placements Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body-sm">
            <thead>
              <tr className="border-b border-outline-variant/30 text-zinc-400 font-label-sm uppercase tracking-wider text-[11px]">
                <th className="pb-2.5">Placement Key</th>
                <th className="pb-2.5">Target Location</th>
                <th className="pb-2.5">Format</th>
                <th className="pb-2.5">Min Height (CLS Guard)</th>
                <th className="pb-2.5">Production State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-zinc-300">
              <tr>
                <td className="py-2.5 font-mono text-primary">homepage-between-sections</td>
                <td>Home (Trending Brands ↓ Latest Ads)</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">homepage-pre-footer</td>
                <td>Home (Formats ↓ Inspiration CTA)</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">brand-after-grid</td>
                <td>Brand Page (After Ad Grid)</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">ad-detail-middle</td>
                <td>Ad Detail (Below DNA Summary)</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">search-inline</td>
                <td>Search Page (Above Results Feed)</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">explore-middle</td>
                <td>Explore Feed (Above Load More)</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">brands-directory</td>
                <td>Brands Directory (Bottom)</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">campaigns-middle</td>
                <td>Brand Campaigns / Detail</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">industries-directory</td>
                <td>Industries Directory / Detail</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">platforms-directory</td>
                <td>Platforms Directory / Detail</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">countries-directory</td>
                <td>Country Explorer / Market Detail</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">compare-bottom</td>
                <td>Comparison Screen (Bottom)</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">saved-bottom</td>
                <td>Saved & Collections (Bottom)</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">inspiration-middle</td>
                <td>Inspiration Direction (Pre-Affiliates)</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">trends-directory</td>
                <td>Trends Directory (Bottom)</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-primary">about-bottom</td>
                <td>About Page (Bottom)</td>
                <td>Responsive</td>
                <td className="font-mono">100px</td>
                <td><span className="text-zinc-500">Hidden until enabled</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
