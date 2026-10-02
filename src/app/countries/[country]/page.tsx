import Link from "next/link";
import { getCountryWithAds } from "@/lib/db/actions";
import { notFound } from "next/navigation";
import { AdCard } from "@/components/ads/AdCard";
import { Globe, AlertCircle, ArrowLeft, Layers, LayoutGrid, Building2, Tag } from "lucide-react";
import { ShareButton } from "@/components/ui/ShareButton";
import { Metadata } from "next";
import { AdSlot } from "@/components/monetization/AdSlot";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const data = await getCountryWithAds(country);
  if (!data) return { title: "Country Not Found | AdScope" };

  const title = `${data.name} Advertising Creative Intelligence | AdScope`;
  const description = `Explore indexed advertising creative, top brands, platforms, and formats in ${data.name} on AdScope.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/countries/${country}`
    }
  };
}

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const data = await getCountryWithAds(country);

  if (!data) {
    notFound();
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-margin-desktop py-space-xl min-h-screen">
      {/* Back Navigation */}
      <div className="mb-space-lg flex items-center justify-between">
        <Link
          href="/countries"
          className="inline-flex items-center gap-1.5 font-label-md text-xs text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Country Explorer
        </Link>
        <ShareButton title={`${data.name} Advertising Intelligence on AdScope`} />
      </div>

      {/* Country Header */}
      <div className="p-space-lg md:p-space-xl rounded-2xl bg-surface-container-low border border-outline-variant/40 mb-space-xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-space-md border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-2 mb-1 text-primary">
              <Globe className="w-5 h-5" />
              <span className="font-label-sm text-xs uppercase tracking-widest">Geographic Profile</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-on-surface font-bold uppercase tracking-tight">
              {data.name}
            </h1>
            <p className="font-body-sm text-xs text-outline mt-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-primary" />
              {data.disclaimer}
            </p>
          </div>

          <div className="flex flex-col md:items-end">
            <span className="font-label-sm text-xs uppercase tracking-widest text-outline">
              Indexed Advertisements
            </span>
            <span className="font-display text-3xl font-bold text-primary">
              {data.adCount} <span className="text-sm font-sans font-normal text-on-surface-variant">ads</span>
            </span>
          </div>
        </div>

        {/* Structured Dimensions: Brands, Platforms, Formats, Industries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mt-space-lg">
          {/* Top Brands */}
          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
            <span className="font-label-sm text-xs text-outline uppercase tracking-widest flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-primary" /> Top Indexed Brands
            </span>
            <div className="flex flex-wrap gap-1.5">
              {data.brands.map((b: string) => (
                <Link
                  key={b}
                  href={`/search?country=${data.slug}&brand=${encodeURIComponent(b.toLowerCase())}`}
                  className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs font-label-md text-on-surface hover:border-primary transition-colors"
                >
                  {b}
                </Link>
              ))}
              {data.brands.length === 0 && <span className="text-xs text-outline">Various brands</span>}
            </div>
          </div>

          {/* Platforms */}
          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
            <span className="font-label-sm text-xs text-outline uppercase tracking-widest flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-primary" /> Active Platforms
            </span>
            <div className="flex flex-wrap gap-1.5">
              {data.platforms.map((p: string) => (
                <Link
                  key={p}
                  href={`/search?country=${data.slug}&platform=${encodeURIComponent(p.toLowerCase())}`}
                  className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs font-label-md text-on-surface hover:border-primary transition-colors"
                >
                  {p}
                </Link>
              ))}
              {data.platforms.length === 0 && <span className="text-xs text-outline">Multi-platform</span>}
            </div>
          </div>

          {/* Formats */}
          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
            <span className="font-label-sm text-xs text-outline uppercase tracking-widest flex items-center gap-1.5">
              <LayoutGrid className="w-3.5 h-3.5 text-primary" /> Creative Formats
            </span>
            <div className="flex flex-wrap gap-1.5">
              {data.formats.map((f: string) => (
                <Link
                  key={f}
                  href={`/search?country=${data.slug}&format=${encodeURIComponent(f.toLowerCase())}`}
                  className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs font-label-md text-on-surface hover:border-primary transition-colors"
                >
                  {f}
                </Link>
              ))}
              {data.formats.length === 0 && <span className="text-xs text-outline">Video & Images</span>}
            </div>
          </div>

          {/* Industries */}
          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2">
            <span className="font-label-sm text-xs text-outline uppercase tracking-widest flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-primary" /> Primary Industries
            </span>
            <div className="flex flex-wrap gap-1.5">
              {data.industries.map((ind: string) => (
                <span
                  key={ind}
                  className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs font-label-md text-on-surface-variant"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ads Grid */}
      <div className="flex items-center justify-between pb-space-sm mb-space-lg border-b border-outline-variant/30">
        <h2 className="font-headline-md text-lg text-on-surface uppercase tracking-wide font-semibold">
          Indexed Creative in {data.name}
        </h2>
        <Link
          href={`/search?country=${data.slug}`}
          className="font-label-sm text-xs uppercase tracking-wider text-primary hover:underline"
        >
          Open in Search &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-lg items-start">
        {data.ads.map((ad: any) => (
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

      <div className="mt-space-2xl w-full">
        <AdSlot placement="country-detail" format="responsive" />
      </div>
    </div>
  );
}
