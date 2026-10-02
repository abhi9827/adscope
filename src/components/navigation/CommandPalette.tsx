'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Sparkles, 
  Bookmark, 
  Layers, 
  Globe, 
  Compass, 
  TrendingUp, 
  X, 
  Command 
} from 'lucide-react';

interface PaletteItem {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  url: string;
  icon?: React.ReactNode;
}

const STATIC_ITEMS: PaletteItem[] = [
  // Quick Navigation
  { id: 'nav-explore', category: 'Navigation', title: 'Explore Creative Feed', subtitle: 'Browse latest indexed advertisements', url: '/explore', icon: <Compass className="w-4 h-4 text-primary" /> },
  { id: 'nav-inspiration', category: 'Navigation', title: 'Creative Inspiration Generator', subtitle: 'Generate advertising hooks and visual directions', url: '/inspiration', icon: <Sparkles className="w-4 h-4 text-primary" /> },
  { id: 'nav-saved', category: 'Navigation', title: 'Saved Ads & Library', subtitle: 'View local saved ads, collections & notes', url: '/saved', icon: <Bookmark className="w-4 h-4 text-primary" /> },
  { id: 'nav-compare', category: 'Navigation', title: 'Compare Creative', subtitle: 'Compare creative characteristics & markets', url: '/compare', icon: <Layers className="w-4 h-4 text-primary" /> },
  { id: 'nav-countries', category: 'Navigation', title: 'Country Explorer', subtitle: 'Discover advertising by geographic market', url: '/countries', icon: <Globe className="w-4 h-4 text-primary" /> },
  { id: 'nav-trends', category: 'Navigation', title: 'Creative Trends', subtitle: 'Macro creative patterns and format velocity', url: '/trends', icon: <TrendingUp className="w-4 h-4 text-primary" /> },

  // Brands
  { id: 'brand-nike', category: 'Brands', title: 'Nike', subtitle: 'Explore sportswear and athletic creative', url: '/brands/nike' },
  { id: 'brand-apple', category: 'Brands', title: 'Apple', subtitle: 'Consumer electronics and Shot on iPhone campaigns', url: '/brands/apple' },
  { id: 'brand-tesla', category: 'Brands', title: 'Tesla', subtitle: 'Electric vehicle and automotive performance creative', url: '/brands/tesla' },
  { id: 'brand-coke', category: 'Brands', title: 'Coca-Cola', subtitle: 'Beverage and emotional connection storytelling', url: '/brands/coca-cola' },
  { id: 'brand-adidas', category: 'Brands', title: 'Adidas', subtitle: 'Sportswear and athlete mindset campaigns', url: '/brands/adidas' },
  { id: 'brand-samsung', category: 'Brands', title: 'Samsung', subtitle: 'Foldables and Galaxy AI product demonstrations', url: '/brands/samsung' },

  // Creative DNA & Trends
  { id: 'trend-ugc', category: 'Creative DNA', title: 'UGC & Creator Formats', subtitle: 'Authentic smartphone-shot social creative', url: '/trends/ugc' },
  { id: 'trend-short-video', category: 'Creative DNA', title: 'Short-Form Vertical Video', subtitle: 'TikTok and Reels 9:16 high-retention formats', url: '/trends/short-form-video' },
  { id: 'trend-athlete', category: 'Creative DNA', title: 'Athlete-Led Performance', subtitle: 'Vulnerability and discipline storytelling', url: '/trends/athlete-led' },
  { id: 'trend-product-demo', category: 'Creative DNA', title: 'Product Demonstrations', subtitle: 'Tactile walkthroughs and feature proofs', url: '/trends/product-demo' }
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Keyboard Listener: Cmd+K, Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setOpen(prev => !prev);
      } else if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('adscope-open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('adscope-open-command-palette', handleCustomOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [open]);

  const filteredItems = query.trim()
    ? STATIC_ITEMS.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : STATIC_ITEMS;

  // Arrow key navigation
  const handleNavKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(filteredItems.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(filteredItems.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        navigate(filteredItems[selectedIndex].url);
      } else if (query.trim()) {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const navigate = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="AdScope Command Palette"
    >
      <div 
        className="w-full max-w-2xl bg-surface-container-low border border-outline-variant/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Input Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-outline-variant/30 gap-3">
          <Search className="w-5 h-5 text-outline shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleNavKeyDown}
            placeholder="Search ads, brands, trends, or jump to page..."
            className="w-full bg-transparent border-0 outline-none text-on-surface placeholder:text-outline font-body-md text-sm md:text-base"
          />
          <kbd className="hidden sm:inline-block text-[11px] font-label-sm bg-surface-container-high px-2 py-0.5 rounded border border-outline-variant/40 text-outline">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-outline-variant/10">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(item.url)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-3 py-2.5 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                    isSelected ? 'bg-surface-container-high text-on-surface' : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                      {item.icon || <Command className="w-3.5 h-3.5 text-primary" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-label-md font-semibold text-on-surface">
                        {item.title}
                      </span>
                      {item.subtitle && (
                        <span className="text-[11px] font-body-sm text-outline truncate max-w-sm">
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-label-sm uppercase tracking-wider text-outline px-2 py-0.5 rounded bg-surface-container-highest">
                    {item.category}
                  </span>
                </div>
              );
            })
          ) : (
            <div 
              onClick={() => navigate(`/search?q=${encodeURIComponent(query)}`)}
              className="p-6 text-center text-xs text-on-surface-variant cursor-pointer hover:bg-surface-container rounded-xl"
            >
              Search AdScope for <strong className="text-primary">"{query}"</strong> &rarr;
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-surface-container-lowest border-t border-outline-variant/20 flex items-center justify-between text-[11px] font-label-sm text-outline">
          <div className="flex items-center gap-3">
            <span>&uarr;&darr; Navigate</span>
            <span>&crarr; Select</span>
          </div>
          <span>AdScope Intelligence</span>
        </div>
      </div>
    </div>
  );
}
