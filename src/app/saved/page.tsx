'use client';

import Link from "next/link";
import { 
  Bookmark, 
  FolderHeart, 
  History, 
  FileText, 
  Trash2, 
  Tag, 
  Plus, 
  Edit3, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { 
  getSavedAds, 
  SavedAd, 
  removeSavedAd, 
  updateAdNote, 
  getCollections, 
  Collection, 
  createCollection,
  getRecentlyViewed, 
  RecentlyViewedItem, 
  clearRecentlyViewed,
  saveAd
} from "@/lib/storage/local";
import { MasonryAdGrid } from "@/components/ads/MasonryAdGrid";
import { AdCard } from "@/components/ads/AdCard";
import { AdSlot } from "@/components/monetization/AdSlot";

type ActiveTab = 'saved' | 'collections' | 'recent' | 'notes';

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('saved');
  const [savedAds, setSavedAds] = useState<SavedAd[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [editingAdId, setEditingAdId] = useState<string | null>(null);
  const [editNoteText, setEditNoteText] = useState('');
  const [isClient, setIsClient] = useState(false);

  const loadData = () => {
    setSavedAds(getSavedAds());
    setCollections(getCollections());
    setRecentlyViewed(getRecentlyViewed());
  };

  useEffect(() => {
    setIsClient(true);
    loadData();

    const handleStorageChange = () => {
      loadData();
    };
    window.addEventListener('adscope-storage-changed', handleStorageChange);
    return () => window.removeEventListener('adscope-storage-changed', handleStorageChange);
  }, []);

  if (!isClient) return null; // Avoid hydration mismatch

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      createCollection(newCollectionName.trim());
      setNewCollectionName('');
      setCollections(getCollections());
    }
  };

  const handleSaveNote = (adId: string) => {
    updateAdNote(adId, editNoteText);
    setEditingAdId(null);
    setSavedAds(getSavedAds());
  };

  const loadSampleInspiration = () => {
    const samples: SavedAd[] = [
      {
        id: "1",
        brand: "Nike",
        brandSlug: "nike",
        campaign: "Winning Isn't For Everyone",
        format: "Short-form Video",
        platform: "TikTok",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjE4vB8DdWfD_PQ2OvuwPJyjpCprlqMQJReeUBhFMVYxdMlrqIY0pwp5V78E2r9bi7Vsg6W4njLSwq7yoPncf_Ilo8teK7klvsqPWDDgJBSXetflZHmX6nOmmMApWuvo1yH9cbOFnrr9ehcKFVokf76o8ejNEhp7dIqVUvYzV4g8pocb-IImzUil-1WS8laad2VmilINK-19M3H8noByQsB8d_Msc8C9h7GhOxVh11_FdGXJCEnkzj",
        note: "Incredible bold statement hook in the first 2 seconds. Stark pacing.",
        tags: ["HookMaster", "OlympicPacing"],
        savedAt: new Date().toISOString()
      },
      {
        id: "2",
        brand: "Apple",
        brandSlug: "apple",
        campaign: "Shot on iPhone 15 Pro",
        format: "Carousel",
        platform: "Meta",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8fS6C_XHmsJRrFwvzSfCKOpA6r8TW-nyzSF3pHTQibPm5ixeRWCPef2X__SUyVgssHmhbbDHIV-MeUsHgcK_E_Wqcz_D6kNHbTTV5meUuMJ85ggNTHC3IQ0fMJH0H7Ti_0G5Qd4dag-QNVDyQCpgm0xi_8TkVBSDrSAfOA4tCM2D4iBm9SnzpxDX3h0qrLIyP630EPNAKcPslO3_OIIcxOeeoksbTmaS435a2_1aGe3TTVyPEVL2C",
        note: "Masterclass in minimal negative space and high-contrast color grading.",
        tags: ["Minimalist", "Cinematic"],
        savedAt: new Date().toISOString()
      },
      {
        id: "3",
        brand: "Tesla",
        brandSlug: "tesla",
        campaign: "Drive Electric",
        format: "Video",
        platform: "YouTube",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUnGe9TrWoJcJIQRmfdCn_GR599ngd1D3MRl59bi5LUCyG2yZKZbTQrN6MndeUPea1Na3vk5Wtdk0ugzSM622aW9N7oR8ZSGxq_mBW988JylADvUxXwPnU76xvliTfV4piHH_F-HRcUxyYVz73-OeQ-Nq6v340_foTnMKAq0Zq-LmySHylPt3om-BXNYFsdTpWHEVgWQT49txWGunG5_HBrYjxUIVIa1ix_l5kJlcbYgJlyXNbPOLc",
        note: "Direct problem-solution framing with zero filler.",
        tags: ["HighEnergy", "Tech"],
        savedAt: new Date().toISOString()
      }
    ];

    samples.forEach(s => saveAd(s));
    createCollection("High-Converting Hooks");
    createCollection("Cinematic References");
    loadData();
  };

  const adsWithNotes = savedAds.filter(a => Boolean(a.note));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-margin-desktop py-10 min-h-screen flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-label-sm text-xs text-primary uppercase tracking-widest font-semibold">
            Local Creative Workspace
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-zinc-100 uppercase tracking-tight font-bold">
          Personal Creative Library
        </h1>
        <p className="font-body-md text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1 leading-relaxed">
          Your personal inspiration workspace for bookmarked ads, custom boards, and creative notes. Everything is stored locally on your device — 100% private, no signup or login required.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-6 border-b border-outline-variant/30 overflow-x-auto scrollbar-none mb-8">
        <button 
          onClick={() => { setActiveTab('saved'); setSelectedCollection(null); }}
          className={`pb-3 border-b-2 font-label-md text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-2 transition-colors ${
            activeTab === 'saved' && !selectedCollection
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" /> Saved Ads ({savedAds.length})
        </button>

        <button 
          onClick={() => { setActiveTab('collections'); }}
          className={`pb-3 border-b-2 font-label-md text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-2 transition-colors ${
            activeTab === 'collections' || selectedCollection
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <FolderHeart className="w-3.5 h-3.5" /> Collections ({collections.length})
        </button>

        <button 
          onClick={() => { setActiveTab('notes'); setSelectedCollection(null); }}
          className={`pb-3 border-b-2 font-label-md text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-2 transition-colors ${
            activeTab === 'notes'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Notes & Tags ({adsWithNotes.length})
        </button>

        <button 
          onClick={() => { setActiveTab('recent'); setSelectedCollection(null); }}
          className={`pb-3 border-b-2 font-label-md text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-2 transition-colors ${
            activeTab === 'recent'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <History className="w-3.5 h-3.5" /> Recently Viewed ({recentlyViewed.length})
        </button>
      </div>

      {/* SECTION 1: ALL SAVED ADS */}
      {activeTab === 'saved' && !selectedCollection && (
        savedAds.length > 0 ? (
          <div>
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-outline-variant/30 text-xs font-label-md">
              <span className="text-zinc-300">
                You have saved <strong className="text-primary font-mono">{savedAds.length}</strong> creative specimens
              </span>
              <Link 
                href={`/compare?ids=${savedAds.slice(0, 4).map(a => a.id).join(',')}`}
                className="text-primary hover:text-indigo-400 flex items-center gap-1 font-semibold uppercase tracking-wider text-[11px]"
              >
                <span>Compare Saved (Up to 4)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <MasonryAdGrid ads={savedAds} />
          </div>
        ) : (
          <EmptyState 
            icon={<Bookmark className="w-8 h-8 text-primary" />}
            title="Your creative library is empty"
            description="Bookmark advertisements while exploring to curate your personal inspiration board. Everything is kept locally."
            onLoadSample={loadSampleInspiration}
          />
        )
      )}

      {/* SECTION 2: COLLECTIONS */}
      {(activeTab === 'collections' || selectedCollection) && (
        <div className="flex flex-col gap-6">
          {/* Create new collection bar */}
          <form onSubmit={handleCreateCollection} className="flex gap-2 max-w-md">
            <input
              type="text"
              placeholder="Create new collection (e.g. Minimalist Tech)..."
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              className="flex-1 bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-label-md uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" /> Create
            </button>
          </form>

          {/* Collection Pills / Selector */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCollection(null)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-label-md uppercase tracking-wider transition-colors ${
                !selectedCollection
                  ? 'bg-primary text-white font-bold shadow'
                  : 'bg-surface-container border border-outline-variant/40 text-zinc-300 hover:border-primary'
              }`}
            >
              All Collections
            </button>
            {collections.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCollection(c.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-label-md uppercase tracking-wider transition-colors ${
                  selectedCollection === c.id
                    ? 'bg-primary text-white font-bold shadow'
                    : 'bg-surface-container border border-outline-variant/40 text-zinc-300 hover:border-primary'
                }`}
              >
                {c.name} ({savedAds.filter(a => a.collectionId === c.id || (c.ads || []).includes(a.id)).length})
              </button>
            ))}
          </div>

          {/* Display Ads in Selected Collection */}
          {(() => {
            const filteredAds = selectedCollection
              ? savedAds.filter(a => a.collectionId === selectedCollection || collections.find(c => c.id === selectedCollection)?.ads.includes(a.id))
              : savedAds;

            return filteredAds.length > 0 ? (
              <MasonryAdGrid ads={filteredAds} />
            ) : (
              <EmptyState 
                icon={<FolderHeart className="w-8 h-8 text-primary" />}
                title="No ads in this collection yet"
                description="Save advertisements from the explore feed and assign them to this collection."
                onLoadSample={loadSampleInspiration}
              />
            );
          })()}
        </div>
      )}

      {/* SECTION 3: NOTES & TAGS */}
      {activeTab === 'notes' && (
        adsWithNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adsWithNotes.map((ad) => (
              <div 
                key={ad.id}
                className="p-5 rounded-2xl obsidian-card flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30 mb-3">
                    <Link href={`/brands/${ad.brandSlug}`} className="font-display font-bold text-xs uppercase tracking-wider text-primary">
                      {ad.brand}
                    </Link>
                    <span className="font-label-sm text-[11px] text-zinc-500">
                      {ad.savedAt ? new Date(ad.savedAt).toLocaleDateString() : 'Saved'}
                    </span>
                  </div>

                  <Link href={`/ads/${ad.id}`} className="font-display text-base text-zinc-100 hover:text-primary transition-colors block mb-2 font-bold">
                    {ad.campaign || `${ad.brand} Creative`}
                  </Link>

                  {editingAdId === ad.id ? (
                    <div className="flex flex-col gap-2 mt-2">
                      <textarea
                        value={editNoteText}
                        onChange={(e) => setEditNoteText(e.target.value)}
                        className="w-full bg-surface-container border border-outline-variant/50 rounded-xl p-3 text-xs text-zinc-100 focus:outline-none focus:border-primary resize-none"
                        rows={3}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingAdId(null)}
                          className="px-3 py-1 rounded-lg text-xs text-zinc-400 hover:text-zinc-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNote(ad.id)}
                          className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-label-md font-semibold"
                        >
                          Save Note
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-zinc-300 font-body-sm leading-relaxed italic">
                      &ldquo;{ad.note}&rdquo;
                    </div>
                  )}

                  {ad.tags && ad.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {ad.tags.map(t => (
                        <span key={t} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/30 text-[10px] text-primary font-mono">
                          <Tag className="w-2.5 h-2.5" /> {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30">
                  <button
                    onClick={() => {
                      setEditingAdId(ad.id);
                      setEditNoteText(ad.note || '');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-label-md text-zinc-400 hover:text-primary transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Note
                  </button>
                  <Link
                    href={`/ads/${ad.id}`}
                    className="inline-flex items-center gap-1 text-xs font-label-md text-primary hover:underline"
                  >
                    <span>View Creative</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={<FileText className="w-8 h-8 text-primary" />}
            title="No personal notes yet"
            description="Click the bookmark icon on any advertisement to attach your observations and creative takeaways."
            onLoadSample={loadSampleInspiration}
          />
        )
      )}

      {/* SECTION 4: RECENTLY VIEWED */}
      {activeTab === 'recent' && (
        <div className="flex flex-col gap-6">
          {recentlyViewed.length > 0 && (
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
              <span className="text-xs font-label-md text-zinc-400">
                Tracking last {recentlyViewed.length} viewed specimens
              </span>
              <button
                onClick={() => {
                  clearRecentlyViewed();
                  setRecentlyViewed([]);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-label-md text-zinc-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear History
              </button>
            </div>
          )}

          {recentlyViewed.length > 0 ? (
            <MasonryAdGrid ads={recentlyViewed} />
          ) : (
            <EmptyState 
              icon={<History className="w-8 h-8 text-primary" />}
              title="No recently viewed specimens"
              description="Advertisements you view while browsing will automatically appear here."
              onLoadSample={loadSampleInspiration}
            />
          )}
        </div>
      )}

      <div className="mt-space-2xl w-full">
        <AdSlot placement="saved-bottom" format="responsive" />
      </div>
    </div>
  );
}

function EmptyState({ 
  icon, 
  title, 
  description, 
  onLoadSample 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  onLoadSample?: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-20 obsidian-card p-8 my-4">
      <div className="w-16 h-16 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center mb-4 shadow-xl">
        {icon}
      </div>
      <h2 className="font-display text-xl text-zinc-100 uppercase tracking-tight mb-2 font-bold">
        {title}
      </h2>
      <p className="font-body-md text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onLoadSample && (
          <button
            onClick={onLoadSample}
            className="px-5 py-2.5 rounded-xl bg-primary text-white font-label-md text-xs uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors shadow-lg shadow-indigo-500/20"
          >
            Load Sample Creative Inspiration
          </button>
        )}
        <Link 
          href="/search" 
          className="px-5 py-2.5 rounded-xl bg-surface-container-high border border-outline-variant/40 text-zinc-300 font-label-md text-xs uppercase tracking-wider font-semibold hover:text-white transition-colors"
        >
          Explore Specimen Feed
        </Link>
      </div>
    </div>
  );
}
