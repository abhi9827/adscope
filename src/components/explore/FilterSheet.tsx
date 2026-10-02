"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";

export function FilterSheet() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden mb-space-md w-full">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-surface-container border border-outline-variant/40 rounded-lg text-on-surface font-label-md hover:bg-surface-container-high transition-colors"
        >
          <Filter className="w-4 h-4" />
          Show Filters
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Bottom Sheet */}
          <div className="relative bg-surface-container-lowest w-full rounded-t-2xl border-t border-outline-variant/40 flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between p-4 border-b border-outline-variant/30">
              <h3 className="font-label-lg uppercase tracking-wider flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h3>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-surface-container transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h4 className="font-label-sm uppercase tracking-widest text-outline">Platform</h4>
                {['TikTok', 'Meta', 'YouTube', 'Google Display'].map(plat => (
                  <label key={plat} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded-sm border-outline-variant accent-primary" />
                    <span className="font-body-sm text-on-surface-variant group-hover:text-on-surface">{plat}</span>
                  </label>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="font-label-sm uppercase tracking-widest text-outline">Format</h4>
                {['Video', 'Image / Static', 'Carousel', 'Playable'].map(fmt => (
                  <label key={fmt} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded-sm border-outline-variant accent-primary" />
                    <span className="font-body-sm text-on-surface-variant group-hover:text-on-surface">{fmt}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-outline-variant/30 bg-surface-container-low flex gap-3">
              <button 
                onClick={() => setIsOpen(false)}
                className="flex-1 py-3 border border-outline-variant rounded-lg font-label-md hover:bg-surface-container transition-colors"
              >
                Clear All
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="flex-1 py-3 bg-primary text-on-primary rounded-lg font-label-md hover:bg-primary-container transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
