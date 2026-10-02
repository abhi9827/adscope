export default function PrivacyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-margin-desktop py-space-2xl min-h-screen">
      <div className="mb-space-2xl">
        <h1 className="font-display text-4xl sm:text-5xl text-on-surface font-bold tracking-tight uppercase mb-space-md">
          Privacy Policy
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Last updated: October 2025
        </p>
      </div>

      <div className="prose prose-invert prose-lg max-w-none text-on-surface-variant font-body-md">
        <p className="mb-6 leading-relaxed">
          At AdScope, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or interact with our platform.
        </p>

        <h2 className="font-headline-md text-on-surface uppercase tracking-tight mt-12 mb-4">No Accounts, No Tracking</h2>
        <p className="mb-6 leading-relaxed">
          AdScope is a completely public platform. We do not require you to create an account, log in, or provide any personal information to use our service. We do not use third-party tracking cookies or fingerprinting technologies to monitor your behavior across the web.
        </p>

        <h2 className="font-headline-md text-on-surface uppercase tracking-tight mt-12 mb-4">Local Storage</h2>
        <p className="mb-6 leading-relaxed">
          When you "Save" an ad or add it to a "Collection," we store this data locally on your device using your browser's `localStorage`. This data never leaves your device and is never sent to our servers. If you clear your browser cache, your saved ads will be deleted.
        </p>

        <h2 className="font-headline-md text-on-surface uppercase tracking-tight mt-12 mb-4">Analytics</h2>
        <p className="mb-6 leading-relaxed">
          We use privacy-respecting, anonymized analytics to understand overall traffic patterns and feature usage (e.g., which platforms are searched most frequently). This data cannot be traced back to individual users.
        </p>

        <h2 className="font-headline-md text-on-surface uppercase tracking-tight mt-12 mb-4">Advertising & Partner Transparency</h2>
        <p className="mb-6 leading-relaxed">
          AdScope may display advertising units or link to relevant software tools through affiliate partnerships. When you click an affiliate link, a referral parameter may be passed to the partner website. We do not fingerprint users, sell personal data, or build behavioral advertising profiles. All affiliate and sponsored placements are clearly labeled.
        </p>

        <h2 className="font-headline-md text-on-surface uppercase tracking-tight mt-12 mb-4">Third-Party Content</h2>
        <p className="mb-6 leading-relaxed">
          Our platform organizes and links to advertising creatives hosted on public archives (e.g., Meta Ad Library, TikTok Creative Center, Google Ads Transparency Center). When you view these creatives, your browser may connect to those services, which operate under their own privacy policies.
        </p>
      </div>
    </div>
  );
}
