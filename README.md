# ADSCOPE

**"See what the world's biggest brands are advertising."**
*Discover. Compare. Analyze. Get inspired.*

AdScope is a public advertising discovery platform. It serves as an advertising intelligence MVP with a focus on a free-first architecture, local storage, and a beautiful premium aesthetic.

## Features
- **Brand Discovery**: Explore top brands globally.
- **Advertisement Browser**: View a categorized library of advertisements.
- **Save Locally**: Save ads and create collections directly to your browser's `localStorage` (No login required).
- **Ad Comparisons**: Compare different creatives, formats, and campaigns.
- **Powerful Search**: Find ads based on brands, industries, formats, and tags.

## Tech Stack
- **Framework**: Next.js (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Lucide React, Framer Motion
- **Database**: PostgreSQL (Dockerized for local development)
- **ORM**: Prisma
- **Validation**: Zod

## Architecture
AdScope follows a simple, monolithic, free-first Next.js architecture:
- Next.js Route Handlers function as backend APIs.
- The UI handles both Server and Client operations relying heavily on React Server Components for optimal performance and SEO.
- No Redis or Elasticsearch; full-text search is implemented directly via PostgreSQL.
- Abstracted Adapters for Ad Sources and AI so the platform continues to function perfectly when optional external services are offline.

## Local Development (Free-First)

### Prerequisites
- Node.js >= 20.9.0
- Docker & Docker Compose
- npm

### 1. Environment Variables
Copy the `.env.example` file to create your local environment settings:
```bash
cp .env.example .env
```
Ensure `DATABASE_URL` matches your local Docker settings.

### 2. Database Setup
Start the local PostgreSQL container:
```bash
docker compose up -d
```
Generate Prisma client and push the schema to the database:
```bash
npx prisma generate
npx prisma db push
```

### 3. Seed Instructions
Populate the database with the initial 30 major brands, platforms, industries, and mock data:
```bash
npm run seed
```

### 4. Running the App
Start the development server (requires Node 20+):
```bash
# Set Node 20 and start the dev server
source ~/.nvm/nvm.sh && nvm use 20
npm run dev
```
Visit `http://localhost:3000` in your browser.

## Testing & Build
To verify types and lint rules:
```bash
npm run lint
npx tsc --noEmit
```
To build for production:
```bash
npm run build
```

## Deployment
AdScope is fully Vercel-compatible. To deploy:
1. Push to your GitHub repository.
2. Import the project in Vercel.
3. Provision a free PostgreSQL database (e.g., Supabase or Neon).
4. Add the `DATABASE_URL` to Vercel's Environment Variables.
5. Deploy.

## Future Roadmap & Data-Source Architecture
## Real-Data Ingestion Architecture

AdScope includes an ethical, authorized provider-adapter architecture for real advertising data ingestion located in `src/lib/sources/`.

### Guiding Principles
- **No Scraping or Circumvention**: AdScope strictly forbids bypassing platform authentication, anti-bot systems, CAPTCHAs, access controls, robots.txt directives, or rate limits.
- **Official APIs & Transparency Feeds Only**: Integration occurs only through official transparency centers and developer endpoints established by global transparency regulations.
- **Fail-Safe Standby**: Sources with missing credentials gracefully enter safe standby mode returning 0 records without errors or crashes.
- **Zero-Budget Default**: All real data sources default to disabled (`false`). Offline development uses `MockSourceAdapter`.

---

### Supported Source Adapters

| Adapter | Official Source URL | Credentials Required? | Supported Platforms | Available Data Fields | Terms & Compliance |
|---|---|---|---|---|---|
| **Meta Ad Library** | [facebook.com/ads/library/api](https://www.facebook.com/ads/library/api/) | `META_ACCESS_TOKEN` (Meta Graph API) | Instagram, Facebook, Messenger | Creative snapshot URL, primary text, headlines, platforms, start/stop delivery dates | Complies with Meta Platform Terms & EU Digital Services Act transparency mandates. |
| **Google Ads Transparency** | [adstransparency.google.com](https://adstransparency.google.com/) | `GOOGLE_API_KEY` (Google Ads Dev Token) | YouTube, Google Search, Google Display | Video URL, thumbnail, advertiser name, format, first/last shown dates | Complies with Google Ads Developer Terms. No automated scraping of unauthenticated pages. |
| **TikTok Creative Center** | [library.tiktok.com](https://library.tiktok.com/) | `TIKTOK_API_KEY` (Commercial Content API) | TikTok | 9:16 vertical video URL, cover image, caption, advertiser name, targeting summary | Authorized under TikTok Commercial Content API terms. |
| **LinkedIn Ad Library** | [linkedin.com/ad-library](https://www.linkedin.com/ad-library) | `LINKEDIN_API_KEY` (Marketing API OAuth) | LinkedIn | Sponsored update text, media URL, advertiser name, CTA, active dates | Complies with LinkedIn Developer Terms & B2B transparency requirements. |
| **Mock Development** | `https://adscope.dev` | None (`$0` / Offline) | Meta, TikTok, YouTube, Google, LinkedIn | Full creative variants, Creative DNA, tags, campaign associations | 100% offline development catalog for verifying pipelines. |

---

### How to Enable Ingestion

1. Set the global ingestion master switch to `true` in `.env`:
   ```env
   INGEST_ENABLED=true
   ```
2. Enable specific authorized sources:
   ```env
   # Enable specific sources
   META_SOURCE_ENABLED=true
   GOOGLE_SOURCE_ENABLED=false
   TIKTOK_SOURCE_ENABLED=false
   LINKEDIN_SOURCE_ENABLED=false
   MOCK_SOURCE_ENABLED=false

   # Provide official provider credentials (NEVER in NEXT_PUBLIC_)
   META_ACCESS_TOKEN=your_official_graph_api_token_here
   ```

### Running the Ingestion Pipeline

To run the full ingestion lifecycle (fetch, validate with Zod, normalize, deduplicate, and upsert):
```bash
# Run ingestion for all enabled sources
npm run ingest

# Or target specific queries and brands
npx tsx scripts/ingest.ts --brand=Nike --country=US --limit=25
```

### Ingestion Pipeline Lifecycle
1. **Fetch**: Queries enabled adapters with exponential backoff and rate-limit handling (`fetchWithRetry`).
2. **Validate**: Validates raw payloads using Zod (`validators.ts`).
3. **Normalize**: Harmonizes platform formats, generates slugs, and standardizes dates and ISO country codes (`normalize.ts`).
4. **Preserve Metadata**: Retains platform-specific payload properties in the `sourceMetadata` JSON column on the `Ad` model.
5. **Deduplicate**: Uses deterministic composite fingerprints (`${source}::${sourceAdId}`) to prevent duplicates (`deduplicate.ts`).
6. **Upsert**: Updates existing ads with new `lastSeen` timestamps and inserts new records without deleting historical data.
7. **Audit & Log**: Records run metrics (`IngestionRun`) viewable in the internal dashboard.

### Internal Source Management Dashboard
Inspect real-time adapter health, credentials status, and sync history at:
```
http://localhost:3000/internal/sources
```
*(Restricted route with `noindex, nofollow` metadata).*

## Monetization Foundation & Strategic Roadmap

AdScope includes an ethical, zero-budget-first monetization architecture built with zero external dependencies. The core product remains **100% free with no login, paywalls, or forced subscriptions**.

### Strategic Roadmap
Monetization should only be introduced sequentially once AdScope achieves real user retention and SEO volume:

- **Phase 1: Free Product, SEO & Organic Reach (Current State)**
  - No monetization dependency. Zero budget mode active by default.
  - Optimize Core Web Vitals, discoverability, and local browser workflows.
- **Phase 2: Restrained Display Ads & Curated Tool Affiliates**
  - Enable Google AdSense or compliant display ad provider once audience milestones are reached.
  - Curated creative tools in `/inspiration` (motion kits, AI renderers) with honest partner badges.
- **Phase 3: Direct Sponsored Placements**
  - Premium studio and enterprise ad-tech sponsorships with high-contrast `SPONSORED` disclosure.
- **Phase 4: Optional Pro Features (Future)**
  - Advanced brand benchmark alerts, extended historical exports, and cloud sync (never paywalling basic discovery).
- **Phase 5: B2B Intelligence & API Access**
  - Read-only commercial endpoints (`/api/ads`, `/api/brands`) for creative agencies and brands.

### Zero-Budget Default Mode
In development and default deployments, all monetization is completely disabled:
```env
MONETIZATION_ENABLED=false
ADS_ENABLED=false
AFFILIATE_ENABLED=false
SPONSORED_CONTENT_ENABLED=false
ADS_PROVIDER=none
```
When disabled:
- Zero ad scripts are downloaded.
- Zero tracking cookies or fingerprinting occurs.
- No empty or broken ad boxes appear.
- The UI layout is preserved with no Cumulative Layout Shift (CLS).

### Enabling Google AdSense (When Ready)
To connect Google AdSense in production:
```env
NEXT_PUBLIC_MONETIZATION_ENABLED=true
NEXT_PUBLIC_ADS_ENABLED=true
NEXT_PUBLIC_ADS_PROVIDER=adsense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

### Configuring Affiliate Links
Edit `src/lib/monetization/affiliates.ts` to add partner URLs. If `affiliateUrl` is omitted or empty, AdScope cleanly links directly to the tool's homepage with zero tracking or fake affiliate claims.

### Internal Diagnostic Dashboard
Inspect active monetization flags, configured placements, and affiliate counts at:
```
http://localhost:3000/internal
```

## Legal & Data Considerations
AdScope serves to organize publicly available advertising information. 
- The MVP operates predominantly on clearly labeled **Demo Data**. 
- It explicitly **does not** bypass platform authentication, rate limits, or scraping protections.
- Do not download, rehost, or claim ownership of third-party creative assets.
- If using live sources, ads must prominently display attribution (e.g., "Source: Meta Ad Library") and link to the original asset.
- AdScope independently earns revenue from non-intrusive ads and affiliate links; commercial partners have no influence over indexed advertising intelligence.

# adscope
