import { AlertCircle, Sparkles, Filter, RotateCcw } from "lucide-react";
import { MasonryAdGrid } from "@/components/ads/MasonryAdGrid";
import { AdSlot } from "@/components/monetization/AdSlot";
import Link from "next/link";
import { searchAdsWithFilters, SearchFilters } from "@/lib/db/actions";
import { AdvancedSearchFilters } from "@/components/search/AdvancedSearchFilters";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const parts = [];
  if (params.brand) parts.push(params.brand);
  if (params.creativeStyle) parts.push(`${params.creativeStyle} Style`);
  if (params.platform) parts.push(`on ${params.platform}`);
  if (params.format) parts.push(`${params.format}s`);
  if (params.q) parts.push(`"${params.q}"`);

  const summary = parts.length > 0 ? parts.join(" · ") : "Discover Advertising Creative";
  const title = `${summary} | AdScope Search`;
  const description = `Search indexed advertising creative by brand, platform, format, and Creative DNA attributes on AdScope.`;

  return {
    title,
    description,
    alternates: {
      canonical: "/search"
    }
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  const filters: SearchFilters = {
    q: params.q,
    brand: params.brand,
    platform: params.platform,
    format: params.format,
    country: params.country,
    creativeStyle: params.creativeStyle,
    hook: params.hook,
    industry: params.industry
  };

  const searchResults = await searchAdsWithFilters(filters);
  const hasResults = searchResults && searchResults.length > 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-margin-desktop py-10 min-h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-label-sm text-xs text-primary uppercase tracking-widest font-semibold">
            Multi-Dimensional Creative Discovery
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-zinc-100 uppercase tracking-tight font-bold">
          Creative Intelligence Search
        </h1>
        <p className="font-body-sm text-xs md:text-sm text-zinc-400 mt-1 max-w-2xl">
          Search indexed advertising specimens by opening hook, visual language, production format, platform, and brand.
        </p>
      </div>

      {/* Advanced URL-linked Search Bar & Filters */}
      <AdvancedSearchFilters />

      {/* Results Count & Quick Status */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-outline-variant/30 text-xs font-label-md">
        <span className="text-zinc-300 font-medium">
          Found <strong className="text-primary font-mono">{searchResults.length}</strong> matching {searchResults.length === 1 ? 'specimen' : 'specimens'}
        </span>
        <span className="text-zinc-500 uppercase tracking-wider text-[11px] hidden sm:inline">
          Obsidian Atelier Grid
        </span>
      </div>

      {/* DISPLAY AD SLOT: SEARCH INLINE */}
      <div className="my-4">
        <AdSlot placement="search-inline" format="responsive" />
      </div>

      {hasResults ? (
        /* Masonry Grid of Search Results */
        <MasonryAdGrid ads={searchResults} />
      ) : (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20 obsidian-card p-8 my-8">
          <div className="w-16 h-16 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center mb-4 text-zinc-400 shadow-xl">
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-xl text-zinc-100 uppercase tracking-tight mb-2 font-bold">
            No indexed creative matched your filters.
          </h2>
          <p className="font-body-md text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
            Try broadening your search keywords or clearing specific platform and visual style filters.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/search"
              className="px-4 py-2 bg-primary text-white text-xs font-label-md uppercase tracking-wider font-semibold rounded-lg hover:bg-primary-container transition-colors"
            >
              Clear All Filters
            </Link>
            <Link
              href="/explore"
              className="px-4 py-2 bg-surface-container-high border border-outline-variant/40 text-zinc-300 text-xs font-label-md uppercase tracking-wider rounded-lg hover:text-white transition-colors"
            >
              Browse Full Catalog
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
