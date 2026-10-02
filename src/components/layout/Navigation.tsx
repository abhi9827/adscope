"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Search, Bookmark, Sparkles, Scale, Compass, Globe } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Explore", href: "/search" },
    { label: "Brands", href: "/brands" },
    { label: "Countries", href: "/countries" },
    { label: "Compare", href: "/compare" },
    { label: "Inspiration", href: "/inspiration", isSparkle: true },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/40">
        <div className="h-16 w-full px-4 md:px-margin-desktop flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-md shadow-indigo-500/10">
                <span className="font-display font-bold text-sm tracking-tight text-white">AS</span>
              </div>
              <span className="font-display text-base font-bold tracking-tight text-zinc-100 uppercase hidden sm:block">
                AdScope
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1.5 font-label-md text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-surface-container-high text-primary font-bold shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-surface-container"
                  }`}
                >
                  {item.isSparkle && <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Command Palette Trigger */}
          <div className="flex items-center gap-2 md:gap-3">
            <div 
              onClick={() => window.dispatchEvent(new Event('adscope-open-command-palette'))}
              className="hidden sm:flex items-center gap-2 bg-surface-container-low border border-outline-variant/60 hover:border-primary/60 px-3.5 py-1.5 rounded-xl text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer shadow-inner"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span className="font-body-sm text-xs w-32 md:w-48 select-none text-zinc-400">
                Quick Search...
              </span>
              <kbd className="hidden lg:inline-block font-label-sm text-[10px] bg-surface-container-highest text-zinc-400 px-1.5 py-0.5 rounded border border-outline-variant/40 font-mono">
                ⌘K
              </kbd>
            </div>
            
            {/* Mobile Search Button */}
            <button 
              onClick={() => window.dispatchEvent(new Event('adscope-open-command-palette'))}
              className="sm:hidden w-9 h-9 flex items-center justify-center text-zinc-300 hover:bg-surface-container rounded-lg transition-colors border border-outline-variant/40"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Saved Library Link */}
            <Link 
              href="/saved" 
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                pathname === '/saved'
                  ? 'bg-primary border-primary text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-surface-container border-outline-variant/40 text-zinc-300 hover:text-white hover:border-primary/50'
              }`}
              title="Personal Creative Library"
            >
              <Bookmark className={`w-4 h-4 ${pathname === '/saved' ? 'fill-current' : ''}`} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden w-9 h-9 flex items-center justify-center text-zinc-300 hover:bg-surface-container rounded-lg transition-colors border border-outline-variant/40"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-2xl lg:hidden pt-20 px-6 flex flex-col overflow-y-auto">
          <nav className="flex flex-col gap-4 mt-6">
            {navLinks.map((item) => (
              <Link 
                key={item.label}
                href={item.href} 
                className="text-2xl font-display font-bold uppercase tracking-wider text-zinc-100 hover:text-primary transition-colors py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{item.label}</span>
                {item.isSparkle && <Sparkles className="w-5 h-5 text-primary" />}
              </Link>
            ))}
            <Link 
              href="/saved" 
              className="text-2xl font-display font-bold uppercase tracking-wider text-primary hover:text-white transition-colors py-2 border-b border-white/5 flex items-center justify-between mt-2"
            >
              <span>Saved Creative Library</span>
              <Bookmark className="w-5 h-5" />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
