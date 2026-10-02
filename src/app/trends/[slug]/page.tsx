import Link from "next/link";
import { getTrendDetails } from "@/lib/db/actions";
import { notFound } from "next/navigation";
import { AdCard } from "@/components/ads/AdCard";
import { AdSlot } from "@/components/monetization/AdSlot";
import { TrendingUp, ArrowLeft, AlertCircle, Building2, Layers, Globe, Tag } from "lucide-react";
import { ShareButton } from "@/components/ui/ShareButton";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trend = await getTrendDetails(slug);
  if (!trend) return { title: "Trend Not Found | AdScope" };

  const title = `${trend.title} Advertising Trend | AdScope`;
  const description = `${trend.description} Observed in AdScope's indexed dataset across top brands and platforms.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/trends/${slug}`
    }
  };
}

export default async function TrendDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trend = await getTrendDetails(slug);

  if (!trend) {
    notFound();
  }

  const ads = trend.ads || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-margin-desktop py-space-xl min-h-screen">
      {/* Back Navigation */}
      <div className="mb-space-lg flex items-center justify-between">
        <Link
          href="/trends"
          className="inline-flex items-center gap-1.5 font-label-md text-xs text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Macro Trends
        </Link>
        <ShareButton title={`${trend.title} Trend on AdScope`} />
      </div>

      {/* Trend Overview Header */}
      <div className="p-space-lg md:p-space-xl rounded-2xl bg-surface-container-low border border-outline-variant/40 mb-space-xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-space-md border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-2 mb-1 text-primary">
              <TrendingUp className="w-5 h-5" />
              <span className="font-label-sm text-xs uppercase tracking-widest">Observed Creative Trend</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-on-surface font-bold uppercase tracking-tight">
              {trend.title}
            </h1>
            <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
              {trend.description}
            </p>
            <p className="font-body-sm text-xs text-outline mt-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-primary" />
              {trend.disclaimer}
            </p>
          </div>

          <div className="flex flex-col md:items-end">
            <span className="font-label-sm text-xs uppercase tracking-widest text-outline">
              Observed Creative
            </span>
            <span className="font-display text-3xl font-bold text-primary">
              {ads.length} <span className="text-sm font-sans font-normal text-on-surface-variant">ads</span>
            </span>
          </div>
        </div>

        {/* Structured Dimensions: Brands, Platforms, Industries, Countries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mt-space-lg">
          {/* Brands */}
          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
            <span className="font-label-sm text-xs text-outline uppercase tracking-widest flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-primary" /> Brands Using Pattern
            </span>
            <div className="flex flex-wrap gap-1.5">
              {trend.brands.map((b: string) => (
                <Link
                  key={b}
                  href={`/brands/${b.toLowerCase()}`}
                  className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs font-label-md text-on-surface hover:border-primary transition-colors"
                >
                  {b}
                </Link>
              ))}
              {trend.brands.length === 0 && <span className="text-xs text-outline">Various</span>}
            </div>
          </div>

          {/* Platforms */}
          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
            <span className="font-label-sm text-xs text-outline uppercase tracking-widest flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-primary" /> Platforms
            </span>
            <div className="flex flex-wrap gap-1.5">
              {trend.platforms.map((p: string) => (
                <span
                  key={p}
                  className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs font-label-md text-on-surface"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
            <span className="font-label-sm text-xs text-outline uppercase tracking-widest flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-primary" /> Industries
            </span>
            <div className="flex flex-wrap gap-1.5">
              {trend.industries.map((i: string) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs font-label-md text-on-surface-variant"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>

          {/* Countries */}
          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
            <span className="font-label-sm text-xs text-outline uppercase tracking-widest flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-primary" /> Countries Represented
            </span>
            <div className="flex flex-wrap gap-1.5">
              {trend.countries.map((c: string) => (
                <span
                  key={c}
                  className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs font-label-md text-on-surface"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ads Grid */}
      <div className="flex items-center justify-between pb-space-sm mb-space-lg border-b border-outline-variant/30">
        <h2 className="font-headline-md text-lg text-on-surface uppercase tracking-wide font-semibold">
          Indexed Creative Exhibiting "{trend.title}"
        </h2>
        <Link
          href={`/search?q=${encodeURIComponent(trend.title)}`}
          className="font-label-sm text-xs uppercase tracking-wider text-primary hover:underline"
        >
          View in Search &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-lg items-start">
        {ads.map((ad: any) => (
          <AdCard
            key={ad.id}
            id={ad.id}
            brand={ad.brand?.name}
            brandSlug={ad.brand?.slug}
            platform={ad.platform?.name}
            format={ad.format}
            imageUrl={ad.creatives?.[0]?.url || ad.imageUrl}
            campaign={ad.campaign?.name || ad.title}
          />
        ))}
      </div>

      {/* DISPLAY AD SLOT: TREND BETWEEN SECTIONS */}
      <div className="my-8">
        <AdSlot placement="trend-between-sections" format="responsive" />
      </div>
    </div>
  );
}
