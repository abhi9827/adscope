import Link from "next/link";
import { ArrowLeft, Database, Key, CheckCircle2, AlertTriangle, XCircle, RefreshCw, Globe, ExternalLink, ShieldCheck, Layers } from "lucide-react";
import { Metadata } from "next";
import { getAllSourceAdapters, getSourceStatus, isIngestEnabled, isSourceEnabled } from "@/lib/sources/registry";
import prisma from "@/lib/db/prisma";

export const metadata: Metadata = {
  title: "Source Ingestion Management | AdScope Internal",
  description: "Monitor and manage legitimate real-data source adapters and transparency feeds.",
  robots: {
    index: false,
    follow: false
  }
};

export default async function InternalSourcesPage() {
  const adapters = getAllSourceAdapters();
  const globalIngestEnabled = isIngestEnabled();

  // Try to load real recent ingestion runs from Prisma
  let recentRuns: any[] = [];
  try {
    recentRuns = await prisma.ingestionRun.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });
  } catch {
    // Graceful fallback when database is in zero-budget standby
    recentRuns = [];
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-margin-desktop py-space-xl min-h-screen">
      {/* Navigation */}
      <div className="mb-space-lg flex items-center justify-between">
        <Link
          href="/internal"
          className="inline-flex items-center gap-1.5 font-label-md text-xs text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Internal Diagnostics
        </Link>
        <span className="px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/40 text-[11px] font-mono text-zinc-400">
          Internal Restricted • Non-Public
        </span>
      </div>

      {/* Header */}
      <div className="mb-space-xl">
        <div className="flex items-center gap-space-xs text-primary font-label-sm text-xs uppercase tracking-widest mb-space-xs">
          <Database className="w-4 h-4" />
          <span>Real-Data Ingestion Architecture</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-on-surface font-bold tracking-tight uppercase mb-space-sm">
          Source Adapters
        </h1>
        <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-3xl leading-relaxed">
          Monitor official transparency adapters, API connection status, rate-limit policies, and recent synchronization history. Scraping and anti-bot circumvention are strictly disallowed.
        </p>
      </div>

      {/* Global Ingestion Banner */}
      <div className={`p-space-lg rounded-2xl border mb-space-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        globalIngestEnabled
          ? 'bg-emerald-950/20 border-emerald-500/30'
          : 'bg-surface-container-low border-outline-variant/40'
      }`}>
        <div className="flex items-center gap-space-md">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            globalIngestEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-surface-container-high text-zinc-400'
          }`}>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-headline-sm text-base text-on-surface uppercase font-bold">
              Global Ingestion Engine: {globalIngestEnabled ? 'Enabled' : 'Standby / Disabled'}
            </h3>
            <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
              Control via <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-zinc-300">INGEST_ENABLED=true</code>. Default is false (zero-budget safety).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <code className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/40 font-mono text-xs text-primary">
            npm run ingest
          </code>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg mb-space-2xl">
        {adapters.map((adapter) => {
          const status = getSourceStatus(adapter.source);
          const isEnabled = isSourceEnabled(adapter.source);
          const meta = adapter.metadata;

          // Find latest run for this source
          const latestRun = recentRuns.find(r => r.source === adapter.source);

          let statusBadge = (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-400">
              <XCircle className="w-3.5 h-3.5 text-zinc-500" /> Disabled
            </span>
          );

          if (isEnabled && meta.requiresCredentials && !meta.available) {
            statusBadge = (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-600/30 text-xs font-mono text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" /> Requires Credentials
              </span>
            );
          } else if (isEnabled && (meta.available || !meta.requiresCredentials)) {
            statusBadge = (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Available / Ready
              </span>
            );
          }

          return (
            <div
              key={adapter.source}
              className="p-space-lg rounded-2xl bg-surface-container-low border border-outline-variant/40 flex flex-col justify-between hover:border-primary/50 transition-all shadow-md"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-space-md">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
                      {adapter.source.toUpperCase()} ADAPTER
                    </span>
                    <h3 className="font-headline-md text-xl text-on-surface uppercase font-bold tracking-tight mt-0.5">
                      {adapter.name}
                    </h3>
                  </div>
                  {statusBadge}
                </div>

                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mb-space-md">
                  {meta.description}
                </p>

                {/* Metadata Details */}
                <div className="space-y-2 text-xs font-body-sm mb-space-md pt-space-sm border-t border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Official Portal:</span>
                    <a
                      href={meta.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                    >
                      {new URL(meta.officialSourceUrl).hostname} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Supported Platforms:</span>
                    <span className="text-zinc-300">{meta.supportedPlatforms.join(', ')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Supported Regions:</span>
                    <span className="text-zinc-300 font-mono text-[11px]">{meta.supportedCountries.join(', ')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Credentials Required:</span>
                    <span className="font-mono text-[11px] text-zinc-300">
                      {meta.requiresCredentials ? 'Yes (API Key / OAuth)' : 'No (Local Mock)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistics / Recent Run */}
              <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 flex items-center justify-between text-xs mt-space-sm">
                <div>
                  <span className="text-[10px] uppercase font-label-sm text-zinc-500 block">Last Run</span>
                  <span className="font-mono font-medium text-zinc-300">
                    {latestRun ? new Date(latestRun.createdAt).toLocaleDateString() : 'Never'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-label-sm text-zinc-500 block">Fetched</span>
                  <span className="font-mono font-bold text-primary">
                    {latestRun ? latestRun.recordsFetched : '0'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-label-sm text-zinc-500 block">Inserted</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {latestRun ? latestRun.recordsInserted : '0'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-label-sm text-zinc-500 block">Duplicates</span>
                  <span className="font-mono text-zinc-400">
                    {latestRun ? latestRun.duplicates : '0'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Ingestion Runs Table */}
      <div className="p-space-xl rounded-2xl bg-surface-container-low border border-outline-variant/40">
        <div className="flex items-center justify-between mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="font-headline-sm text-xl text-on-surface uppercase tracking-tight font-bold">
              Recent Ingestion Logs
            </h2>
          </div>
          <span className="font-mono text-xs text-zinc-500">
            {recentRuns.length} recorded run(s)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-body-sm">
            <thead>
              <tr className="border-b border-outline-variant/30 text-zinc-400 font-label-sm uppercase tracking-wider text-[11px]">
                <th className="pb-2.5">Source</th>
                <th className="pb-2.5">Status</th>
                <th className="pb-2.5">Fetched</th>
                <th className="pb-2.5">Inserted</th>
                <th className="pb-2.5">Updated</th>
                <th className="pb-2.5">Duplicates</th>
                <th className="pb-2.5">Errors</th>
                <th className="pb-2.5">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-zinc-300">
              {recentRuns.length > 0 ? (
                recentRuns.map((run: any) => (
                  <tr key={run.id}>
                    <td className="py-2.5 font-mono text-primary uppercase font-bold">{run.source}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        run.status === 'SUCCESS'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : run.status === 'PARTIAL'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {run.status}
                      </span>
                    </td>
                    <td className="font-mono">{run.recordsFetched}</td>
                    <td className="font-mono text-emerald-400">{run.recordsInserted}</td>
                    <td className="font-mono text-primary">{run.recordsUpdated}</td>
                    <td className="font-mono">{run.duplicates}</td>
                    <td className="font-mono text-rose-400">{run.failed}</td>
                    <td className="font-mono text-zinc-500">{new Date(run.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-zinc-500">
                    No recorded ingestion runs found. Execute <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-zinc-400">npm run ingest</code> to start.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
