'use client';

import { useState, useEffect } from 'react';
import { Bookmark, Check, Plus, X, Tag } from 'lucide-react';
import { isAdSaved, saveAd, removeSavedAd, getSavedAds, updateAdNote, getCollections, Collection } from '@/lib/storage/local';

interface SaveAdButtonProps {
  ad: {
    id: string;
    brand: string;
    brandSlug: string;
    campaign?: string;
    format: string;
    platform: string;
    imageUrl?: string;
  };
}

export function SaveAdButton({ ad }: SaveAdButtonProps) {
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('');

  useEffect(() => {
    setSaved(isAdSaved(ad.id));
    setCollections(getCollections());

    const savedList = getSavedAds();
    const existing = savedList.find(a => a.id === ad.id);
    if (existing) {
      if (existing.note) setNote(existing.note);
      if (existing.tags) setTags(existing.tags);
      if (existing.collectionId) setSelectedCollection(existing.collectionId);
    }
  }, [ad.id]);

  const toggleSave = () => {
    if (saved) {
      removeSavedAd(ad.id);
      setSaved(false);
    } else {
      saveAd({
        id: ad.id,
        brand: ad.brand,
        brandSlug: ad.brandSlug,
        campaign: ad.campaign,
        format: ad.format,
        platform: ad.platform,
        imageUrl: ad.imageUrl,
        savedAt: new Date().toISOString(),
        note: note || undefined,
        tags: tags.length ? tags : undefined,
        collectionId: selectedCollection || undefined
      });
      setSaved(true);
      setShowModal(true); // Open note editor right after saving
    }
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdNote(ad.id, note, tags, selectedCollection);
    setShowModal(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tToRemove: string) => {
    setTags(tags.filter(t => t !== tToRemove));
  };

  return (
    <>
      <button
        onClick={toggleSave}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border border-outline-variant/40 active:scale-95 ${
          saved
            ? 'bg-primary text-on-primary border-primary shadow-[0_0_12px_rgba(192,193,255,0.4)]'
            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
        }`}
        title={saved ? "Edit note or remove from saved" : "Save creative"}
        aria-label={saved ? "Saved creative" : "Save creative"}
      >
        <Bookmark className="w-4 h-4 fill-current" />
      </button>

      {/* Note & Collection Editor Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6 shadow-2xl relative flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h3 className="font-headline-sm text-lg uppercase tracking-wider text-on-surface">
                Saved to Inspiration
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDetails} className="flex flex-col gap-4">
              <div>
                <label className="block font-label-sm text-xs text-outline uppercase tracking-widest mb-1.5">
                  Personal Note
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Great opening hook for our upcoming ecommerce video..."
                  rows={3}
                  className="w-full bg-surface-container border border-outline-variant/40 rounded-lg p-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block font-label-sm text-xs text-outline uppercase tracking-widest mb-1.5">
                  Custom Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                    placeholder="Add tag (e.g. Hook, Sports)..."
                    className="flex-1 bg-surface-container border border-outline-variant/40 rounded-lg px-3 py-1.5 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-3 py-1.5 bg-surface-container-high border border-outline-variant/40 rounded-lg text-sm text-on-surface hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-highest text-xs text-on-surface border border-outline-variant/30"
                      >
                        <Tag className="w-3 h-3 text-primary" /> {t}
                        <button
                          type="button"
                          onClick={() => removeTag(t)}
                          className="hover:text-error ml-1"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-label-sm text-xs text-outline uppercase tracking-widest mb-1.5">
                  Collection
                </label>
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/40 rounded-lg p-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                >
                  <option value="">(None / General Library)</option>
                  {collections.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg font-label-md text-sm text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-on-primary font-label-md text-sm rounded-lg hover:bg-primary-container transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
