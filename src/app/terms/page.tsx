export default function TermsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-margin-desktop py-space-2xl min-h-screen">
      <div className="mb-space-2xl">
        <h1 className="font-display text-4xl sm:text-5xl text-on-surface font-bold tracking-tight uppercase mb-space-md">
          Terms of Service
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Last updated: October 2025
        </p>
      </div>

      <div className="prose prose-invert prose-lg max-w-none text-on-surface-variant font-body-md">
        <p className="mb-6 leading-relaxed">
          By accessing or using AdScope, you agree to be bound by these Terms of Service.
        </p>

        <h2 className="font-headline-md text-on-surface uppercase tracking-tight mt-12 mb-4">1. Nature of the Service</h2>
        <p className="mb-6 leading-relaxed">
          AdScope is a search engine and directory for publicly available advertising content. We do not host the underlying video or image files for the advertisements shown; we index metadata and embed or link to authorized public URLs provided by advertising networks (such as the Meta Ad Library or TikTok Creative Center).
        </p>

        <h2 className="font-headline-md text-on-surface uppercase tracking-tight mt-12 mb-4">2. Intellectual Property & Copyright</h2>
        <p className="mb-6 leading-relaxed">
          All advertising creatives, brand logos, trademarks, and associated media displayed on AdScope belong exclusively to their respective owners and rights holders. AdScope claims no ownership over indexed third-party content. 
        </p>
        <p className="mb-6 leading-relaxed">
          The display of this content constitutes "Fair Use" for the purposes of commentary, criticism, research, and education regarding the advertising industry. If you are a rights holder and believe an indexed link violates your copyright, please contact us for immediate removal.
        </p>

        <h2 className="font-headline-md text-on-surface uppercase tracking-tight mt-12 mb-4">3. Acceptable Use</h2>
        <p className="mb-6 leading-relaxed">
          You may use AdScope to research, analyze, and gain inspiration from advertising campaigns. You may not use automated scripts, scrapers, or bots to bulk-download metadata or media from our platform.
        </p>

        <h2 className="font-headline-md text-on-surface uppercase tracking-tight mt-12 mb-4">4. Disclaimer of Warranties</h2>
        <p className="mb-6 leading-relaxed">
          The service is provided "as is" and "as available". We do not guarantee the accuracy, completeness, or continued availability of any indexed advertising content, as campaigns may be paused or removed by their original creators at any time.
        </p>

        <h2 className="font-headline-md text-on-surface uppercase tracking-tight mt-12 mb-4">5. Commercial Partnerships & Advertising</h2>
        <p className="mb-6 leading-relaxed">
          AdScope may feature display advertisements, sponsored placements, or partner affiliate links. These commercial elements are clearly separated from AdScope's objective index of public advertising specimens. Any purchases or interactions on external third-party sites are governed solely by those parties' terms and policies.
        </p>
      </div>
    </div>
  );
}
