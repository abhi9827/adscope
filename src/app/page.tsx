import Link from "next/link";
import Image from "next/image";
import { getTrendingBrands, getLatestAds } from "@/lib/db/actions";
import { MasonryAdGrid } from "@/components/ads/MasonryAdGrid";
import { AdSlot } from "@/components/monetization/AdSlot";
import { ArrowRight, Sparkles, Search, Compass, Layers, Globe, Filter } from "lucide-react";

export default async function Home() {
  const trendingBrands = await getTrendingBrands();
  const latestAds = await getLatestAds();

  return (
    <>
      {/* SECTION 1: HERO */}
      <section className="relative w-full pt-16 pb-24 px-4 md:px-margin-desktop overflow-hidden flex flex-col items-center justify-center text-center obsidian-dots">
        {/* Ambient Chromatic Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-r from-primary/20 via-secondary/15 to-tertiary/20 rounded-full blur-[140px] pointer-events-none -z-10" />
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container-high border border-outline-variant/60 mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-label-sm text-xs uppercase tracking-widest text-zinc-300">
            Obsidian Atelier Creative Intelligence · Open Specimen Library
          </span>
        </div>
        
        {/* Monumental Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 uppercase max-w-5xl leading-[1.06]">
          SEE WHAT THE WORLD&apos;S<br />
          BIGGEST BRANDS<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-amber-500 drop-shadow-[0_0_35px_rgba(99,102,241,0.35)]">
            ARE ADVERTISING.
          </span>
        </h1>
        
        <p className="font-body-lg text-base sm:text-lg text-zinc-400 mt-5 max-w-2xl leading-relaxed">
          Discover ads. Compare campaigns. Understand creative strategy across global media.
        </p>
        
        {/* Large Prominent Search Box */}
        <div className="w-full max-w-3xl mt-8 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-indigo-500/20 to-tertiary/30 rounded-2xl blur-md opacity-50 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <form action="/search" method="GET" className="relative flex items-center w-full bg-surface-container-low border border-outline-variant/80 group-focus-within:border-primary rounded-2xl px-5 py-4 shadow-2xl transition-all">
            <Search className="w-5 h-5 text-zinc-400 shrink-0 mr-3" />
            <input 
              name="q"
              className="w-full bg-transparent border-0 outline-none text-zinc-100 placeholder:text-zinc-500 font-body-md text-sm md:text-base" 
              id="hero-search-input" 
              placeholder="Search brands, products, hook types, or creative styles..." 
              type="text" 
              autoComplete="off"
            />
            <div className="flex items-center gap-2 shrink-0 pl-3">
              <button 
                type="submit"
                className="px-3.5 py-1.5 bg-primary hover:bg-primary-container text-white font-label-md text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors flex items-center gap-1"
              >
                <span>Search</span>
                <span className="hidden sm:inline">↵</span>
              </button>
            </div>
          </form>
        </div>
        
        {/* Trending Search Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-3xl">
          <span className="font-label-sm text-xs uppercase tracking-wider text-zinc-500">Trending:</span>
          {[
            { label: 'Nike', href: '/search?brand=nike' },
            { label: 'Apple', href: '/search?brand=apple' },
            { label: 'Tesla', href: '/search?brand=tesla' },
            { label: 'Cinematic', href: '/search?creativeStyle=cinematic' },
            { label: 'UGC Video', href: '/search?format=short-form' },
            { label: 'TikTok', href: '/search?platform=tiktok' },
            { label: 'Curiosity Hook', href: '/search?hook=curiosity' },
          ].map(tag => (
            <Link 
              key={tag.label} 
              href={tag.href}
              className="px-3 py-1 rounded-full bg-surface-container border border-outline-variant/50 text-zinc-300 font-label-md text-xs hover:text-white hover:border-primary hover:bg-surface-container-high transition-all"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 2: TRENDING BRANDS */}
      <section className="w-full px-4 md:px-margin-desktop py-16 bg-surface-container-lowest border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <div className="flex items-center gap-2 text-primary font-label-sm text-xs uppercase tracking-widest mb-1.5">
                <span className="font-mono">01</span>
                <span className="w-4 h-[1px] bg-primary/40" />
                <span>Creative Velocity</span>
              </div>
              <h2 className="font-headline-lg text-2xl md:text-3xl text-zinc-100 uppercase tracking-tight font-bold">
                Trending Brands
              </h2>
              <p className="font-body-md text-sm text-zinc-400 mt-1">
                Explore what leading brands are advertising right now across high-spend channels.
              </p>
            </div>
            <Link 
              href="/brands" 
              className="inline-flex items-center gap-1.5 font-label-md text-xs text-primary hover:text-indigo-400 transition-colors group"
            >
              <span>View all brands</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Horizontal Brand Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingBrands.map((brand: any) => (
              <Link 
                href={`/brands/${brand.slug}`} 
                key={brand.slug} 
                className="obsidian-card p-4 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest border border-white/5 flex items-center justify-center font-display text-lg text-zinc-200 font-bold tracking-tight mb-3 group-hover:border-primary/40 transition-colors">
                    {brand.name.substring(0, 2).toUpperCase()}
                  </div>
                  <h3 className="font-display text-sm font-bold text-zinc-100 group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>
                  <p className="font-body-sm text-[11px] text-zinc-400 mt-1 line-clamp-2">
                    {brand.description || "Global Enterprise Brand"}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-outline-variant/40 flex items-center justify-between text-[11px] font-label-sm">
                  <span className="text-primary font-medium">Explore Creative</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DISPLAY AD SLOT: HOMEPAGE BETWEEN SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 md:px-margin-desktop my-4">
        <AdSlot placement="homepage-between-sections" format="responsive" />
      </div>

      {/* SECTION 3: LATEST ADS (Responsive Masonry Gallery) */}
      <section className="w-full px-4 md:px-margin-desktop py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-label-sm text-xs uppercase tracking-widest mb-1.5">
                <span className="font-mono">02</span>
                <span className="w-4 h-[1px] bg-primary/40" />
                <span>Creative Specimen Stream</span>
              </div>
              <h2 className="font-headline-lg text-2xl md:text-3xl text-zinc-100 uppercase tracking-tight font-bold">
                Latest Indexed Creative
              </h2>
              <p className="font-body-md text-sm text-zinc-400 mt-1">
                Fresh advertising concepts, hooks, and execution formats from global brands.
              </p>
            </div>

            {/* Platform Quick Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none p-1 rounded-xl bg-surface-container-low border border-outline-variant/40">
              <Link 
                href="/search" 
                className="px-3 py-1.5 rounded-lg bg-primary text-white font-label-sm text-xs uppercase tracking-wider font-semibold whitespace-nowrap"
              >
                All Platforms
              </Link>
              <Link 
                href="/search?platform=tiktok" 
                className="px-3 py-1.5 rounded-lg hover:bg-surface-container-high text-zinc-400 hover:text-white font-label-sm text-xs uppercase tracking-wider transition-colors whitespace-nowrap"
              >
                TikTok
              </Link>
              <Link 
                href="/search?platform=meta" 
                className="px-3 py-1.5 rounded-lg hover:bg-surface-container-high text-zinc-400 hover:text-white font-label-sm text-xs uppercase tracking-wider transition-colors whitespace-nowrap"
              >
                Meta
              </Link>
              <Link 
                href="/search?platform=youtube" 
                className="px-3 py-1.5 rounded-lg hover:bg-surface-container-high text-zinc-400 hover:text-white font-label-sm text-xs uppercase tracking-wider transition-colors whitespace-nowrap"
              >
                YouTube
              </Link>
            </div>
          </div>

          {/* Staggered Masonry Ad Grid */}
          <MasonryAdGrid ads={latestAds} />
        </div>
      </section>

      {/* SECTION 4: POPULAR FORMATS & CREATIVE DNA */}
      <section className="w-full px-4 md:px-margin-desktop py-16 bg-surface-container-lowest border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-label-sm text-xs uppercase tracking-widest mb-1.5">
                <span className="font-mono">03</span>
                <span className="w-4 h-[1px] bg-primary/40" />
                <span>Production Disciplines</span>
              </div>
              <h2 className="font-headline-lg text-2xl md:text-3xl text-zinc-100 uppercase tracking-tight font-bold">
                Popular Formats
              </h2>
              <p className="font-body-md text-sm text-zinc-400 mt-1">
                Filter indexed creative by production discipline, ratio, and distribution channel.
              </p>
            </div>
            <Link 
              href="/search" 
              className="font-label-sm text-xs text-primary uppercase tracking-wider hover:underline flex items-center gap-1"
            >
              <span>Explore All Formats</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: 'smart_display', title: 'Short-form Video', desc: '9:16 vertical fast-cut hooks engineered for TikTok & Reels.', fmt: 'short-form' },
              { icon: 'record_voice_over', title: 'UGC & Creator Led', desc: 'Authentic creator commentary, unboxings, and native proofs.', fmt: 'ugc' },
              { icon: 'movie_filter', title: 'Cinematic Film', desc: 'Narrative storytelling, anamorphic widescreen framing & broadcast.', fmt: 'video' },
              { icon: 'view_carousel', title: 'Swipeable Carousel', desc: 'Multi-card educational and product showcase interactive sliders.', fmt: 'carousel' },
            ].map(format => (
              <Link 
                key={format.title} 
                href={`/search?format=${format.fmt}`} 
                className="obsidian-card p-5 hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-[22px]">{format.icon}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-zinc-100 group-hover:text-primary transition-colors">
                    {format.title}
                  </h3>
                  <p className="font-body-sm text-xs text-zinc-400 mt-1.5 leading-relaxed">
                    {format.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-outline-variant/30 flex items-center justify-between">
                  <span className="font-label-sm text-xs text-primary font-medium">Browse Specimen</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>

          {/* Trending Creative DNA Styles */}
          <div className="mt-12 pt-10 border-t border-outline-variant/30">
            <div className="mb-6">
              <span className="font-label-sm text-xs uppercase tracking-widest text-zinc-500">
                Creative DNA Architecture
              </span>
              <h3 className="font-display text-xl text-zinc-100 uppercase font-bold mt-1">
                Trending Creative Styles
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { style: 'Cinematic', desc: 'Anamorphic framing, refined color grading, dramatic pacing' },
                { style: 'UGC', desc: 'Organic smartphone POV, high credibility social proof' },
                { style: 'Minimal', desc: 'Negative space, stark typography, zero visual clutter' },
                { style: 'High-energy', desc: 'Fast kinetic cuts, rhythmic audio sync, instant motion' }
              ].map(item => (
                <Link
                  key={item.style}
                  href={`/search?creativeStyle=${item.style.toLowerCase()}`}
                  className="obsidian-card p-4 hover:border-primary transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="font-label-md text-xs text-primary font-bold uppercase tracking-wider group-hover:underline">
                      {item.style}
                    </span>
                    <p className="font-body-sm text-xs text-zinc-400 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-[11px] font-label-sm text-zinc-500 mt-4 flex items-center gap-1 group-hover:text-primary">
                    View ads <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DISPLAY AD SLOT: HOMEPAGE PRE-FOOTER */}
      <div className="max-w-7xl mx-auto px-4 md:px-margin-desktop my-4">
        <AdSlot placement="homepage-pre-footer" format="responsive" />
      </div>

      {/* SECTION 5: CREATIVE INSPIRATION GENERATOR CTA */}
      <section className="w-full px-4 md:px-margin-desktop py-16">
        <div className="max-w-7xl mx-auto p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low border border-outline-variant/60 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col gap-2.5 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 text-primary font-label-sm text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Inspiration Studio</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-zinc-100 font-bold uppercase tracking-tight">
              Creative Idea & Hook Generator
            </h2>
            <p className="font-body-md text-sm text-zinc-300 leading-relaxed">
              Facing a creative block? Synthesize high-retention opening hooks, multi-card storytelling arcs, and tailored visual directions based on proven campaign patterns.
            </p>
          </div>
          <Link
            href="/inspiration"
            className="px-6 py-3.5 bg-primary text-white font-label-md text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-primary-container shadow-[0_0_24px_rgba(99,102,241,0.3)] transition-all shrink-0 flex items-center gap-2 relative z-10"
          >
            <span>Launch Generator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 6: FOOTER DISCLOSURE */}
      <section className="relative w-full px-4 md:px-margin-desktop py-20 bg-surface-container-lowest border-t border-outline-variant/30 flex flex-col items-center justify-center text-center">
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="font-label-sm text-xs uppercase tracking-widest text-primary mb-2">
            Zero Paywalls · No Authenticated Gates
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 uppercase">
            FIND YOUR NEXT<br />CREATIVE IDEA.
          </h2>
          <p className="font-body-lg text-sm sm:text-base text-zinc-400 mt-4 max-w-lg leading-relaxed">
            Explore indexed advertising concepts, hooks, and campaign narratives from brands around the world.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="/search" 
              className="px-8 py-3.5 bg-primary text-white font-label-md text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-primary-container shadow-[0_0_32px_rgba(99,102,241,0.25)] transition-all"
            >
              Explore Creative Feed
            </Link>
            <Link 
              href="/compare" 
              className="px-8 py-3.5 bg-surface-container-high border border-outline-variant/50 text-zinc-200 font-label-md text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-surface-container-highest transition-all"
            >
              Compare Campaigns
            </Link>
          </div>
          <p className="font-label-sm text-xs text-zinc-500 mt-6">
            Public educational intelligence · Demo & Archival Data
          </p>
        </div>
      </section>
    </>
  );
}
