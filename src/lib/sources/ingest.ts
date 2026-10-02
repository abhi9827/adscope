import prisma from "@/lib/db/prisma";
import { getEnabledSourceAdapters } from "./registry";
import { normalizeAd } from "./normalize";
import { deduplicateBatch } from "./deduplicate";
import { IngestionReport, NormalizedAd, SearchParams } from "./types";

/**
 * Execute the AdScope Real-Data Ingestion Pipeline
 */
export async function runIngestion(searchParams: SearchParams = {}): Promise<IngestionReport[]> {
  const adapters = getEnabledSourceAdapters();
  const reports: IngestionReport[] = [];

  console.log(`\n======================================================`);
  console.log(`   ADSCOPE REAL-DATA INGESTION PIPELINE`);
  console.log(`======================================================`);
  console.log(`Active/Enabled Adapters: ${adapters.map(a => a.name).join(', ') || 'None (all sources disabled)'}\n`);

  if (adapters.length === 0) {
    console.log(`[Ingest] Ingestion is disabled or no sources are enabled.`);
    console.log(`[Ingest] Set INGEST_ENABLED=true and enable specific sources (e.g. MOCK_SOURCE_ENABLED=true or META_SOURCE_ENABLED=true).\n`);
    return [];
  }

  for (const adapter of adapters) {
    const startTime = Date.now();
    const report: IngestionReport = {
      source: adapter.source,
      fetched: 0,
      valid: 0,
      invalid: 0,
      inserted: 0,
      updated: 0,
      duplicate: 0,
      failed: 0,
      errors: [],
      durationMs: 0,
      timestamp: new Date()
    };

    console.log(`>>> Starting Ingestion for Source: [${adapter.name}]`);

    try {
      // 1. Fetch raw advertisements through legitimate adapter
      const rawAds = await adapter.search(searchParams);
      report.fetched = rawAds.length;
      console.log(`[${adapter.source}] Retrieved ${rawAds.length} raw records.`);

      if (rawAds.length === 0) {
        console.log(`[${adapter.source}] No records returned. Retaining all existing database records.`);
        report.durationMs = Date.now() - startTime;
        reports.push(report);
        continue;
      }

      // 2. Validate and Normalize records
      const normalizedAds: NormalizedAd[] = [];
      for (const raw of rawAds) {
        const normResult = normalizeAd(raw);
        if (normResult.success && normResult.data) {
          report.valid++;
          normalizedAds.push(normResult.data);
        } else {
          report.invalid++;
          const errMsg = normResult.errors?.join('; ') || 'Normalization error';
          report.errors.push(`Record ${raw.sourceAdId || 'unknown'}: ${errMsg}`);
        }
      }

      // 3. Deduplicate batch
      const { unique, duplicates, duplicateCount } = deduplicateBatch(normalizedAds);
      report.duplicate += duplicateCount;
      console.log(`[${adapter.source}] Normalized ${normalizedAds.length} items (${duplicateCount} duplicate in batch).`);

      // 4. Upsert into database
      for (const ad of unique) {
        try {
          // Resolve or create Brand
          const brand = await prisma.brand.upsert({
            where: { slug: ad.brandSlug },
            update: { name: ad.brand },
            create: { name: ad.brand, slug: ad.brandSlug }
          });

          // Resolve Platform
          let platform = await prisma.platform.findUnique({
            where: { slug: ad.platformSlug }
          });
          if (!platform) {
            platform = await prisma.platform.create({
              data: { name: ad.platform, slug: ad.platformSlug }
            });
          }

          // Resolve Country
          let country = await prisma.country.findUnique({
            where: { code: ad.countryCode }
          });
          if (!country) {
            country = await prisma.country.create({
              data: {
                name: ad.country,
                code: ad.countryCode,
                slug: ad.countryCode.toLowerCase()
              }
            });
          }

          // Resolve AdSource
          const source = await prisma.adSource.upsert({
            where: { name: ad.source },
            update: {},
            create: {
              name: ad.source,
              url: adapter.metadata.officialSourceUrl,
              description: adapter.metadata.description
            }
          });

          // Check if ad exists using sourceId + sourceAdId
          const existingAd = await prisma.ad.findFirst({
            where: {
              sourceId: source.id,
              sourceAdId: ad.sourceAdId
            }
          });

          if (existingAd) {
            // Update existing ad without deleting historical metrics
            await prisma.ad.update({
              where: { id: existingAd.id },
              data: {
                lastSeen: ad.lastSeen,
                title: ad.title,
                description: ad.description,
                active: ad.active,
                sourceMetadata: ad.sourceMetadata as any
              }
            });
            report.updated++;
          } else {
            // Insert new ad
            await prisma.ad.create({
              data: {
                title: ad.title,
                description: ad.description,
                format: ad.format,
                isDemo: ad.isDemo,
                active: ad.active,
                sourceUrl: ad.sourceUrl,
                sourceAdId: ad.sourceAdId,
                sourceMetadata: ad.sourceMetadata as any,
                date: ad.firstSeen,
                firstSeen: ad.firstSeen,
                lastSeen: ad.lastSeen,
                brandId: brand.id,
                platformId: platform.id,
                countryId: country.id,
                sourceId: source.id,
                creatives: ad.creativeUrl ? {
                  create: {
                    url: ad.creativeUrl,
                    type: ad.format.toLowerCase().includes('video') ? 'video' : 'image'
                  }
                } : undefined
              }
            });
            report.inserted++;
          }
        } catch (dbErr: any) {
          report.failed++;
          report.errors.push(`Persistence failure for ${ad.sourceAdId}: ${dbErr.message}`);
        }
      }

      // 5. Record IngestionRun in DB if accessible
      try {
        await prisma.ingestionRun.create({
          data: {
            source: adapter.source,
            status: report.failed > 0 ? 'PARTIAL' : 'SUCCESS',
            recordsFetched: report.fetched,
            recordsValid: report.valid,
            recordsInvalid: report.invalid,
            recordsInserted: report.inserted,
            recordsUpdated: report.updated,
            duplicates: report.duplicate,
            failed: report.failed,
            errorMessage: report.errors.length > 0 ? report.errors.slice(0, 3).join('; ') : null,
            durationMs: Date.now() - startTime
          }
        });
      } catch {
        // Ingestion run table logging optional when DB is in memory
      }
    } catch (adapterErr: any) {
      report.failed++;
      report.errors.push(`Adapter exception: ${adapterErr.message}`);
      console.error(`[${adapter.source}] Adapter run failed:`, adapterErr);
    }

    report.durationMs = Date.now() - startTime;
    reports.push(report);

    console.log(`[${adapter.source}] Completed in ${report.durationMs}ms:`);
    console.log(`   Fetched: ${report.fetched} | Valid: ${report.valid} | Inserted: ${report.inserted} | Updated: ${report.updated} | Duplicate: ${report.duplicate} | Failed: ${report.failed}\n`);
  }

  return reports;
}
