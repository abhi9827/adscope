'use client';

export interface SavedAd {
  id: string;
  brand: string;
  brandSlug: string;
  campaign?: string;
  format: string;
  platform: string;
  imageUrl?: string;
  savedAt: string;
  note?: string;
  tags?: string[];
  collectionId?: string;
}

export interface Collection {
  id: string;
  name: string;
  ads: string[]; // array of Ad IDs
  description?: string;
}

export interface RecentlyViewedItem {
  id: string;
  brand: string;
  brandSlug: string;
  campaign?: string;
  format: string;
  platform: string;
  imageUrl?: string;
  viewedAt: string;
}

const SAVED_ADS_KEY = 'adscope_saved_ads';
const COLLECTIONS_KEY = 'adscope_collections';
const RECENTLY_VIEWED_KEY = 'adscope_recently_viewed';

function getIsClient() {
  return typeof window !== 'undefined';
}

/**
 * Strips script tags, HTML tags, and unsafe characters to safely handle user input in localStorage notes.
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

// -------------------------------------------------------------
// SAVED ADS & NOTES
// -------------------------------------------------------------

export function getSavedAds(): SavedAd[] {
  if (!getIsClient()) return [];
  try {
    const data = localStorage.getItem(SAVED_ADS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to parse saved ads', error);
    return [];
  }
}

export function saveAd(ad: SavedAd): void {
  if (!getIsClient()) return;
  const current = getSavedAds();
  const existingIndex = current.findIndex(a => a.id === ad.id);
  
  const sanitizedNote = ad.note ? sanitizeText(ad.note) : undefined;
  const sanitizedTags = ad.tags ? ad.tags.map(t => sanitizeText(t)).filter(Boolean) : undefined;

  const itemToSave: SavedAd = {
    ...ad,
    note: sanitizedNote,
    tags: sanitizedTags,
    savedAt: ad.savedAt || new Date().toISOString()
  };

  let updated: SavedAd[];
  if (existingIndex > -1) {
    updated = [...current];
    updated[existingIndex] = { ...updated[existingIndex], ...itemToSave };
  } else {
    updated = [itemToSave, ...current];
  }

  localStorage.setItem(SAVED_ADS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('adscope-storage-changed'));
}

export function updateAdNote(adId: string, note: string, tags?: string[], collectionId?: string): void {
  if (!getIsClient()) return;
  const current = getSavedAds();
  const index = current.findIndex(a => a.id === adId);
  if (index === -1) return;

  current[index].note = sanitizeText(note);
  if (tags) {
    current[index].tags = tags.map(t => sanitizeText(t)).filter(Boolean);
  }
  if (collectionId !== undefined) {
    current[index].collectionId = collectionId;
  }

  localStorage.setItem(SAVED_ADS_KEY, JSON.stringify(current));
  window.dispatchEvent(new Event('adscope-storage-changed'));
}

export function removeSavedAd(id: string): void {
  if (!getIsClient()) return;
  const current = getSavedAds();
  const updated = current.filter(a => a.id !== id);
  localStorage.setItem(SAVED_ADS_KEY, JSON.stringify(updated));
  
  // Also remove from collections
  const collections = getCollections();
  let collectionsUpdated = false;
  const newCollections = collections.map(c => {
    if (c.ads.includes(id)) {
      collectionsUpdated = true;
      return { ...c, ads: c.ads.filter(adId => adId !== id) };
    }
    return c;
  });
  if (collectionsUpdated) {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(newCollections));
  }
  
  window.dispatchEvent(new Event('adscope-storage-changed'));
}

export function isAdSaved(id: string): boolean {
  if (!getIsClient()) return false;
  return getSavedAds().some(a => a.id === id);
}

// -------------------------------------------------------------
// COLLECTIONS
// -------------------------------------------------------------

export const DEFAULT_COLLECTIONS: Collection[] = [
  { id: 'c1', name: 'Product Demonstration Examples', description: 'Curated direct product mechanics and walkthroughs', ads: [] },
  { id: 'c2', name: 'Athlete-led Creative', description: 'Raw performance and athlete grit campaigns', ads: [] },
  { id: 'c3', name: 'Minimalist Tech Ads', description: 'Negative space and high-polish hardware aesthetics', ads: [] },
  { id: 'c4', name: 'UGC Examples', description: 'High-converting organic social creator formats', ads: [] },
  { id: 'c5', name: 'Hook Examples', description: 'High-retention opening 3-second visual mechanics', ads: [] }
];

export function getCollections(): Collection[] {
  if (!getIsClient()) return [];
  try {
    const data = localStorage.getItem(COLLECTIONS_KEY);
    if (!data) {
      localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(DEFAULT_COLLECTIONS));
      return DEFAULT_COLLECTIONS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse collections', error);
    return DEFAULT_COLLECTIONS;
  }
}

export function createCollection(name: string, description?: string): void {
  if (!getIsClient()) return;
  const collections = getCollections();
  collections.push({
    id: 'col_' + Math.random().toString(36).substring(2, 9),
    name: sanitizeText(name),
    description: description ? sanitizeText(description) : undefined,
    ads: []
  });
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
  window.dispatchEvent(new Event('adscope-storage-changed'));
}

export function addToCollection(collectionId: string, adId: string): void {
  if (!getIsClient()) return;
  const collections = getCollections();
  const index = collections.findIndex(c => c.id === collectionId);
  if (index > -1 && !collections[index].ads.includes(adId)) {
    collections[index].ads.push(adId);
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
    window.dispatchEvent(new Event('adscope-storage-changed'));
  }
}

export function removeFromCollection(collectionId: string, adId: string): void {
  if (!getIsClient()) return;
  const collections = getCollections();
  const index = collections.findIndex(c => c.id === collectionId);
  if (index > -1) {
    collections[index].ads = collections[index].ads.filter(id => id !== adId);
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
    window.dispatchEvent(new Event('adscope-storage-changed'));
  }
}

// -------------------------------------------------------------
// RECENTLY VIEWED (Last 10 ads)
// -------------------------------------------------------------

export function getRecentlyViewed(): RecentlyViewedItem[] {
  if (!getIsClient()) return [];
  try {
    const data = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to parse recently viewed', error);
    return [];
  }
}

export function recordRecentlyViewed(ad: {
  id: string;
  brand: string;
  brandSlug: string;
  campaign?: string;
  format: string;
  platform: string;
  imageUrl?: string;
}): void {
  if (!getIsClient()) return;
  const current = getRecentlyViewed().filter(item => item.id !== ad.id);
  const updated: RecentlyViewedItem[] = [
    {
      ...ad,
      viewedAt: new Date().toISOString()
    },
    ...current
  ].slice(0, 10); // Keep last 10

  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('adscope-storage-changed'));
}

export function clearRecentlyViewed(): void {
  if (!getIsClient()) return;
  localStorage.removeItem(RECENTLY_VIEWED_KEY);
  window.dispatchEvent(new Event('adscope-storage-changed'));
}
