import { runIngestion } from "../src/lib/sources/ingest";
import prisma from "../src/lib/db/prisma";

async function main() {
  const args = process.argv.slice(2);
  const brandArg = args.find(a => a.startsWith('--brand='))?.split('=')[1];
  const countryArg = args.find(a => a.startsWith('--country='))?.split('=')[1];
  const limitArg = args.find(a => a.startsWith('--limit='))?.split('=')[1];

  const searchParams = {
    brand: brandArg,
    country: countryArg,
    limit: limitArg ? parseInt(limitArg, 10) : 25
  };

  const results = await runIngestion(searchParams);

  console.log(`======================================================`);
  console.log(`              FINAL INGESTION SUMMARY                 `);
  console.log(`======================================================`);
  
  let totalFetched = 0;
  let totalInserted = 0;
  let totalUpdated = 0;
  let totalDuplicates = 0;
  let totalFailed = 0;

  for (const rep of results) {
    totalFetched += rep.fetched;
    totalInserted += rep.inserted;
    totalUpdated += rep.updated;
    totalDuplicates += rep.duplicate;
    totalFailed += rep.failed;

    console.log(`Source [${rep.source}]:`);
    console.log(`  Fetched:    ${rep.fetched}`);
    console.log(`  Valid:      ${rep.valid}`);
    console.log(`  Invalid:    ${rep.invalid}`);
    console.log(`  Inserted:   ${rep.inserted}`);
    console.log(`  Updated:    ${rep.updated}`);
    console.log(`  Duplicates: ${rep.duplicate}`);
    console.log(`  Failed:     ${rep.failed}`);
    console.log(`  Duration:   ${rep.durationMs}ms`);
    if (rep.errors.length > 0) {
      console.log(`  Errors:     ${rep.errors.slice(0, 3).join(', ')}`);
    }
    console.log(`------------------------------------------------------`);
  }

  console.log(`TOTALS: Fetched: ${totalFetched} | Inserted: ${totalInserted} | Updated: ${totalUpdated} | Duplicates: ${totalDuplicates} | Failed: ${totalFailed}`);
  console.log(`======================================================\n`);
}

main()
  .catch((err) => {
    console.error("Ingestion failed with unhandled error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect().catch(() => {});
  });
