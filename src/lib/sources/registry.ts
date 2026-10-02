import { AdSourceName, AdSourceAdapter, SourceStatus } from "./types";
import { MockSourceAdapter } from "./mock-source";
import { GoogleAdsTransparencyAdapter } from "./google-ads-transparency";
import { MetaAdLibraryAdapter } from "./meta-ad-library";
import { TikTokCreativeCenterAdapter } from "./tiktok-creative-center";
import { LinkedInAdLibraryAdapter } from "./linkedin-ad-library";

/**
 * AdScope Official Source Registry
 */
export class SourceRegistry {
  private static instance: SourceRegistry;
  private adapters: Map<AdSourceName, AdSourceAdapter> = new Map();

  private constructor() {
    this.register(new MockSourceAdapter());
    this.register(new GoogleAdsTransparencyAdapter());
    this.register(new MetaAdLibraryAdapter());
    this.register(new TikTokCreativeCenterAdapter());
    this.register(new LinkedInAdLibraryAdapter());
  }

  public static getInstance(): SourceRegistry {
    if (!SourceRegistry.instance) {
      SourceRegistry.instance = new SourceRegistry();
    }
    return SourceRegistry.instance;
  }

  public register(adapter: AdSourceAdapter): void {
    this.adapters.set(adapter.source, adapter);
  }

  public getAdapter(source: AdSourceName): AdSourceAdapter | undefined {
    return this.adapters.get(source);
  }

  public getAllAdapters(): AdSourceAdapter[] {
    return Array.from(this.adapters.values());
  }

  public isSourceEnabled(source: AdSourceName): boolean {
    const isTrue = (val: string | undefined) => val === 'true' || val === '1';

    // Global switch check
    const ingestGlobal = isTrue(process.env.INGEST_ENABLED);

    switch (source) {
      case 'google':
        return ingestGlobal && isTrue(process.env.GOOGLE_SOURCE_ENABLED);
      case 'meta':
        return ingestGlobal && isTrue(process.env.META_SOURCE_ENABLED);
      case 'tiktok':
        return ingestGlobal && isTrue(process.env.TIKTOK_SOURCE_ENABLED);
      case 'linkedin':
        return ingestGlobal && isTrue(process.env.LINKEDIN_SOURCE_ENABLED);
      case 'mock':
        // Mock is enabled when explicitly set, or when INGEST_ENABLED=true and MOCK_SOURCE_ENABLED!=false, or in test
        return isTrue(process.env.MOCK_SOURCE_ENABLED) || 
               (ingestGlobal && process.env.MOCK_SOURCE_ENABLED !== 'false') ||
               process.env.NODE_ENV === 'test';
      default:
        return false;
    }
  }

  public getEnabledAdapters(): AdSourceAdapter[] {
    return this.getAllAdapters().filter(adapter => this.isSourceEnabled(adapter.source));
  }

  public getSourceStatus(source: AdSourceName): SourceStatus {
    const adapter = this.getAdapter(source);
    if (!adapter) return 'disabled';

    if (!this.isSourceEnabled(source)) {
      return 'disabled';
    }

    if (adapter.metadata.requiresCredentials && !adapter.metadata.available) {
      return 'requires_credentials';
    }

    return 'available';
  }
}

// Global convenience accessors
export function getSourceAdapter(source: AdSourceName): AdSourceAdapter | undefined {
  return SourceRegistry.getInstance().getAdapter(source);
}

export function getAllSourceAdapters(): AdSourceAdapter[] {
  return SourceRegistry.getInstance().getAllAdapters();
}

export function getEnabledSourceAdapters(): AdSourceAdapter[] {
  return SourceRegistry.getInstance().getEnabledAdapters();
}

export function isSourceEnabled(source: AdSourceName): boolean {
  return SourceRegistry.getInstance().isSourceEnabled(source);
}

export function isIngestEnabled(): boolean {
  return process.env.INGEST_ENABLED === 'true' || process.env.INGEST_ENABLED === '1';
}

export function getSourceStatus(source: AdSourceName): SourceStatus {
  return SourceRegistry.getInstance().getSourceStatus(source);
}
