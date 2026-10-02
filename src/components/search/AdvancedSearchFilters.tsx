'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
import { Search as SearchIcon, Filter, X, RotateCcw, ChevronDown } from 'lucide-react';
import { VISUAL_STYLES, HOOK_TYPES, CONTENT_FORMATS } from '@/types/creative-dna';

interface FilterState {
  q: string;
  brand: string;
  platform: string;
  format: string;
  country: string;
  creativeStyle: string;
  hook: string;
}

const BRANDS = [
  { label: 'All Brands', value: '' },
  { label: 'Nike', value: 'nike' },
  { label: 'Apple', value: 'apple' },
  { label: 'Tesla', value: 'tesla' },
  { label: 'Coca-Cola', value: 'coca-cola' },
  { label: 'Adidas', value: 'adidas' },
  { label: 'Samsung', value: 'samsung' },
  { label: 'Red Bull', value: 'red-bull' }
];

const PLATFORMS = [
  { label: 'All Platforms', value: '' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'Meta (FB/IG)', value: 'meta' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'Google', value: 'google' }
];

const COUNTRIES = [
  { label: 'All Countries', value: '' },
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Japan', value: 'japan' },
  { label: 'Germany', value: 'germany' },
  { label: 'Global', value: 'global' }
];

export function AdvancedSearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [filters, setFilters] = useState<FilterState>({
    q: searchParams.get('q') || '',
    brand: searchParams.get('brand') || '',
    platform: searchParams.get('platform') || '',
    format: searchParams.get('format') || '',
    country: searchParams.get('country') || '',
    creativeStyle: searchParams.get('creativeStyle') || '',
    hook: searchParams.get('hook') || ''
  });

  const [expanded, setExpanded] = useState(false);

  const applyFilters = (newFilters: FilterState) => {
    const params = new URLSearchParams();
    if (newFilters.q.trim()) params.set('q', newFilters.q.trim());
    if (newFilters.brand) params.set('brand', newFilters.brand);
    if (newFilters.platform) params.set('platform', newFilters.platform);
    if (newFilters.format) params.set('format', newFilters.format);
    if (newFilters.country) params.set('country', newFilters.country);
    if (newFilters.creativeStyle) params.set('creativeStyle', newFilters.creativeStyle);
    if (newFilters.hook) params.set('hook', newFilters.hook);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  /**
   * Translates natural language expressions into structured filters:
   * e.g. "cinematic sports video ads from nike on tiktok"
   */
  const handleNaturalLanguageQuery = (text: string) => {
    const lower = text.toLowerCase();
    const updated = { ...filters, q: text };

    // Detect brand
    for (const b of BRANDS) {
      if (b.value && lower.includes(b.value)) {
        updated.brand = b.value;
      }
    }
    // Detect platform
    for (const p of PLATFORMS) {
      if (p.value && lower.includes(p.value)) {
        updated.platform = p.value;
      }
    }
    // Detect format
    if (lower.includes('video') || lower.includes('short-form')) {
      updated.format = 'video';
    } else if (lower.includes('carousel')) {
      updated.format = 'carousel';
    } else if (lower.includes('image')) {
      updated.format = 'image';
    }
    // Detect visual style
    for (const style of VISUAL_STYLES) {
      if (lower.includes(style.toLowerCase())) {
        updated.creativeStyle = style.toLowerCase();
      }
    }
    // Detect hook
    for (const hook of HOOK_TYPES) {
      if (lower.includes(hook.toLowerCase())) {
        updated.hook = hook.toLowerCase();
      }
    }
    // Detect country
    for (const c of COUNTRIES) {
      if (c.value && (lower.includes(c.label.toLowerCase()) || lower.includes(c.value))) {
        updated.country = c.value;
      }
    }

    setFilters(updated);
    applyFilters(updated);
  };

  const handleFieldChange = (field: keyof FilterState, value: string) => {
    const updated = { ...filters, [field]: value };
    setFilters(updated);
    applyFilters(updated);
  };

  const clearAllFilters = () => {
    const empty: FilterState = {
      q: '',
      brand: '',
      platform: '',
      format: '',
      country: '',
      creativeStyle: '',
      hook: ''
    };
    setFilters(empty);
    applyFilters(empty);
  };

  const activeFilterCount = Object.entries(filters).filter(([k, v]) => k !== 'q' && Boolean(v)).length;

  return (
    <div className="w-full flex flex-col gap-4 mb-space-xl">
      {/* Search Input Bar */}
      <div className="relative group w-full">
        <div className="absolute inset-0 bg-primary/10 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="relative flex items-center w-full bg-surface-container-lowest border border-outline-variant/60 group-focus-within:border-primary rounded-xl px-4 py-3.5 shadow-xl transition-all">
          <SearchIcon className="w-5 h-5 text-outline shrink-0 mr-3" />
          <input
            className="w-full bg-transparent border-0 outline-none text-on-surface placeholder:text-outline font-body-md text-base"
            placeholder="Search keywords or try 'Show cinematic video ads from Nike on TikTok'..."
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleNaturalLanguageQuery(filters.q);
              }
            }}
          />
          {filters.q && (
            <button
              onClick={() => handleFieldChange('q', '')}
              className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-on-surface transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => handleNaturalLanguageQuery(filters.q)}
            className="ml-2 px-4 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-label-md uppercase tracking-wider hover:bg-primary-container transition-colors shrink-0"
          >
            Search
          </button>
        </div>
      </div>

      {/* Filter Toggle & Quick Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/40 text-xs font-label-md text-on-surface hover:border-primary transition-colors"
          >
            <Filter className="w-3.5 h-3.5 text-primary" />
            <span>Structured Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-primary text-on-primary text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown className={`w-3.5 h-3.5 text-outline transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>

          {/* Quick Selectors for primary filters */}
          <select
            value={filters.brand}
            onChange={(e) => handleFieldChange('brand', e.target.value)}
            className="bg-surface-container border border-outline-variant/30 rounded-lg px-2.5 py-1.5 text-xs font-label-md text-on-surface focus:outline-none focus:border-primary"
          >
            {BRANDS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>

          <select
            value={filters.platform}
            onChange={(e) => handleFieldChange('platform', e.target.value)}
            className="bg-surface-container border border-outline-variant/30 rounded-lg px-2.5 py-1.5 text-xs font-label-md text-on-surface focus:outline-none focus:border-primary"
          >
            {PLATFORMS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>

          <select
            value={filters.creativeStyle}
            onChange={(e) => handleFieldChange('creativeStyle', e.target.value)}
            className="bg-surface-container border border-outline-variant/30 rounded-lg px-2.5 py-1.5 text-xs font-label-md text-on-surface focus:outline-none focus:border-primary"
          >
            <option value="">All Creative Styles</option>
            {VISUAL_STYLES.map(s => <option key={s} value={s.toLowerCase()}>{s}</option>)}
          </select>
        </div>

        {(activeFilterCount > 0 || filters.q) && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1.5 text-xs font-label-sm text-outline hover:text-primary transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Clear All Filters
          </button>
        )}
      </div>

      {/* Expanded Multi-dimension Filters Tray */}
      {expanded && (
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Brand */}
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline">Brand</span>
            <select
              value={filters.brand}
              onChange={(e) => handleFieldChange('brand', e.target.value)}
              className="bg-surface-container border border-outline-variant/30 rounded-md p-1.5 text-xs text-on-surface"
            >
              {BRANDS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline">Platform</span>
            <select
              value={filters.platform}
              onChange={(e) => handleFieldChange('platform', e.target.value)}
              className="bg-surface-container border border-outline-variant/30 rounded-md p-1.5 text-xs text-on-surface"
            >
              {PLATFORMS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>

          {/* Format */}
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline">Format</span>
            <select
              value={filters.format}
              onChange={(e) => handleFieldChange('format', e.target.value)}
              className="bg-surface-container border border-outline-variant/30 rounded-md p-1.5 text-xs text-on-surface"
            >
              <option value="">All Formats</option>
              {CONTENT_FORMATS.map(f => <option key={f} value={f.toLowerCase()}>{f}</option>)}
            </select>
          </div>

          {/* Creative Style */}
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline">Style</span>
            <select
              value={filters.creativeStyle}
              onChange={(e) => handleFieldChange('creativeStyle', e.target.value)}
              className="bg-surface-container border border-outline-variant/30 rounded-md p-1.5 text-xs text-on-surface"
            >
              <option value="">All Styles</option>
              {VISUAL_STYLES.map(s => <option key={s} value={s.toLowerCase()}>{s}</option>)}
            </select>
          </div>

          {/* Hook Type */}
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline">Hook</span>
            <select
              value={filters.hook}
              onChange={(e) => handleFieldChange('hook', e.target.value)}
              className="bg-surface-container border border-outline-variant/30 rounded-md p-1.5 text-xs text-on-surface"
            >
              <option value="">All Hooks</option>
              {HOOK_TYPES.map(h => <option key={h} value={h.toLowerCase()}>{h}</option>)}
            </select>
          </div>

          {/* Country */}
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline">Country</span>
            <select
              value={filters.country}
              onChange={(e) => handleFieldChange('country', e.target.value)}
              className="bg-surface-container border border-outline-variant/30 rounded-md p-1.5 text-xs text-on-surface"
            >
              {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-label-sm text-outline mr-1">Active filters:</span>
          {Object.entries(filters).map(([k, v]) => {
            if (!v || k === 'q') return null;
            return (
              <span
                key={k}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-label-md text-primary"
              >
                <span className="text-outline uppercase text-[10px]">{k}:</span> {v}
                <button
                  onClick={() => handleFieldChange(k as keyof FilterState, '')}
                  className="hover:text-on-surface ml-0.5"
                >
                  &times;
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
