import { AdSlot } from "@/components/monetization/AdSlot";

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-margin-desktop py-space-2xl min-h-screen">
      <div className="mb-space-2xl">
        <h1 className="font-display text-4xl sm:text-5xl text-on-surface font-bold tracking-tight uppercase mb-space-md">
          About AdScope
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Advertising discovery and creative intelligence for everyone.
        </p>
      </div>

      <div className="prose prose-invert prose-lg max-w-none text-on-surface-variant font-body-md">
        <h2 className="font-headline-md text-on-surface uppercase tracking-tight mt-12 mb-4">Our Mission</h2>
        <p className="mb-6 leading-relaxed">
          AdScope was built to democratize creative intelligence. Historically, seeing what your competitors are running, understanding cross-platform narrative structures, and benchmarking your creative velocity required expensive enterprise software or disjointed manual research.
        </p>
        <p className="mb-6 leading-relaxed">
          We aggregate, organize, and analyze public advertising data from the world's most aggressive marketing organizations so that founders, marketers, and designers can make data-driven creative decisions.
        </p>

        <h2 className="font-headline-md text-on-surface uppercase tracking-tight mt-12 mb-4">How It Works</h2>
        <p className="mb-6 leading-relaxed">
          AdScope indexes publicly available advertising libraries, authorized transparency centers, and programmatic feeds. We do not circumvent paywalls or access private data. Everything you see here is currently being broadcasted to consumers globally.
        </p>

        <h2 className="font-headline-md text-on-surface uppercase tracking-tight mt-12 mb-4">The Creative Index</h2>
        <p className="mb-6 leading-relaxed">
          Our taxonomy is built specifically for creative forensics. We don't just track media spend; we track visual hooks, pacing velocity, thematic tropes, and distribution strategies across Meta, TikTok, Google, and beyond.
        </p>

        <div className="my-12">
          <AdSlot placement="about-bottom" format="responsive" />
        </div>

        <div className="mt-16 pt-8 border-t border-outline-variant/30 flex flex-col gap-4">
          <p className="font-label-sm uppercase tracking-widest text-outline">Contact</p>
          <p>For press, partnerships, or takedown requests regarding indexed creatives, please contact <a href="mailto:hello@adscope.example.com" className="text-primary hover:underline">hello@adscope.example.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
