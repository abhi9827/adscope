import Link from "next/link";
import { Globe, ArrowRight, AlertCircle, Layers } from "lucide-react";
import { getCountryList } from "@/lib/db/actions";
import { Metadata } from "next";
import { AdSlot } from "@/components/monetization/AdSlot";

export const metadata: Metadata = {
  title: "Country Creative Explorer | AdScope",
  description: "Explore indexed advertising creative by country and geographic market across global platforms on AdScope.",
  alternates: {
    canonical: "/countries"
  }
};

export default async function CountriesPage() {
  const countries = await getCountryList();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-margin-desktop py-space-xl min-h-screen">
      <div className="mb-space-2xl">
        <div className="flex items-center gap-space-xs text-primary font-label-sm text-xs uppercase tracking-widest mb-space-sm">
          <Globe className="w-4 h-4" />
          <span>Geographic Intelligence</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-on-surface font-bold tracking-tight uppercase mb-space-sm">
          Country Explorer
        </h1>
        <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
          Explore advertisements and creative patterns by geographic market.
        </p>
        <p className="font-body-sm text-xs text-outline mt-2 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-primary" />
          Based on AdScope's indexed dataset. Does not represent complete national advertising activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg">
        {countries.map((country: any) => (
          <Link
            key={country.id || country.code}
            href={`/countries/${country.slug || country.code.toLowerCase()}`}
            className="group p-space-lg rounded-2xl bg-surface-container-low border border-outline-variant/40 hover:border-primary/60 transition-all duration-300 flex flex-col justify-between hover:shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-label-sm text-xs uppercase tracking-widest text-outline">
                  Market Code: {country.code}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
              </div>
              <h2 className="font-headline-md text-xl md:text-2xl text-on-surface font-bold uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                {country.name}
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Indexed advertising creative observed in {country.name} across multi-channel distribution.
              </p>
            </div>

            <div className="pt-space-md mt-space-lg border-t border-outline-variant/20 flex items-center justify-between">
              <span className="font-label-md text-xs text-primary font-medium">
                {country.adCount || 0} Indexed Creative
              </span>
              <span className="inline-flex items-center gap-1 font-label-sm text-xs uppercase tracking-wider text-outline group-hover:text-primary transition-colors">
                Explore Market <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-space-2xl w-full">
        <AdSlot placement="countries-directory" format="responsive" />
      </div>

      {/* Compare by Country banner */}
      <div className="mt-space-xl p-space-xl rounded-2xl bg-surface-container border border-outline-variant/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-headline-md text-lg text-on-surface uppercase tracking-wide font-bold mb-1">
            Compare Markets Cross-Country
          </h3>
          <p className="font-body-sm text-xs md:text-sm text-on-surface-variant max-w-xl">
            Compare creative formats, visual styles, and themes between markets (e.g., United States vs Japan) in our descriptive comparison tool.
          </p>
        </div>
        <Link
          href="/compare"
          className="px-5 py-2.5 bg-surface-container-high border border-outline-variant/60 rounded-lg text-on-surface hover:text-primary hover:border-primary font-label-md text-xs uppercase tracking-wider transition-colors shrink-0"
        >
          Compare Markets &rarr;
        </Link>
      </div>
    </div>
  );
}
