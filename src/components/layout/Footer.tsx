import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-surface-variant">
      <div className="w-full px-margin-desktop py-space-xl flex flex-col gap-space-xl">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-space-xl">
          <div className="flex flex-col gap-space-sm max-w-sm">
            <div className="flex items-center gap-space-sm">
              <Image alt="AdScope Brand Logo" width={28} height={28} className="h-7 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1WR3QpXjMFIHVwPT1UhP37olzXClCwFxZC7d6UjFPvvmJxjHcZstoaT_rPEYKxUM2nynwtlK8Fe7-eEB_2XsCLG3LOfRIdig4d5cJgjZe7DfZ8-7JdeOP-JqL1YX3ZZnR4B2-zIHHqAwxhxt3UV-VdboNdIp8MtFR0Pq7kAl8xp1cRLQaJE3KzLWZgjNO68_6lGvErtuRmI8FkJxszMaL4MtVRYZdn-drOOw_zgo698a1grDQgJtMTaHGE" />
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight uppercase">AdScope</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Advertising discovery and creative intelligence for everyone. Benchmarking and forensic analysis across dynamic media channels.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-xl font-label-md text-label-md">
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-lg text-label-lg text-on-surface tracking-wide uppercase">Intelligence</span>
              <Link href="/explore" className="text-on-surface-variant hover:text-on-surface transition-colors">Explore Feed</Link>
              <Link href="/brands" className="text-on-surface-variant hover:text-on-surface transition-colors">Brands Index</Link>
              <Link href="/industries" className="text-on-surface-variant hover:text-on-surface transition-colors">Industries</Link>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-lg text-label-lg text-on-surface tracking-wide uppercase">Forensics</span>
              <Link href="/platforms" className="text-on-surface-variant hover:text-on-surface transition-colors">Platforms</Link>
              <Link href="/trends" className="text-on-surface-variant hover:text-on-surface transition-colors">Creative Trends</Link>
              <Link href="/compare" className="text-on-surface-variant hover:text-on-surface transition-colors">Creative Compare</Link>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-lg text-label-lg text-on-surface tracking-wide uppercase">Legal & Trust</span>
              <Link href="/about" className="text-on-surface-variant hover:text-on-surface transition-colors">About Project</Link>
              <Link href="/privacy" className="text-on-surface-variant hover:text-on-surface transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-on-surface-variant hover:text-on-surface transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="pt-space-md border-t border-surface-container flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md font-body-sm text-body-sm text-outline">
          <p className="max-w-3xl leading-normal text-xs text-zinc-500">
            AdScope organizes advertising information from public and authorized sources. Advertisements and creative assets belong to their respective owners. AdScope may earn revenue from advertising, sponsored placements, or affiliate links; this does not affect how advertising information is indexed or displayed.
          </p>
          <p className="shrink-0 font-label-sm text-label-sm text-outline-variant">© 2025 AdScope Intelligence Inc.</p>
        </div>
      </div>
    </footer>
  );
}
