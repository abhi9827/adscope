import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full max-w-7xl mx-auto px-margin-desktop py-space-2xl min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-widest mb-space-sm">
        <span>Error 404</span>
        <span className="w-4 h-[1px] bg-primary/40"></span>
        <span>Not Found</span>
      </div>
      
      <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-on-surface font-bold tracking-tight uppercase mb-space-md">
        SIGNAL LOST
      </h1>
      
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-space-xl leading-relaxed">
        We couldn't locate the creative asset, brand, or campaign you're looking for. The link might be broken, or the content was removed from public directories.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-space-md w-full max-w-md mx-auto">
        <Link href="/" className="w-full px-space-xl py-4 bg-primary text-on-primary font-headline-sm text-headline-sm uppercase tracking-wider font-semibold rounded-lg hover:bg-primary-container shadow-[0_0_24px_rgba(192,193,255,0.2)] transition-all flex items-center justify-center">
          Return Home
        </Link>
        <Link href="/explore" className="w-full px-space-xl py-4 bg-surface-container-high border border-outline-variant/40 text-on-surface font-headline-sm text-headline-sm uppercase tracking-wider font-semibold rounded-lg hover:bg-surface-container-highest transition-all flex items-center justify-center">
          Explore Feed
        </Link>
      </div>

      <div className="mt-space-2xl relative group w-full max-w-md mx-auto">
        <div className="absolute inset-0 bg-primary/5 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="relative flex items-center w-full bg-surface-container-lowest border border-outline-variant/60 group-focus-within:border-primary rounded-xl px-space-lg py-3 shadow-md transition-all">
          <Search className="w-5 h-5 text-outline shrink-0 mr-space-md" />
          <input className="w-full bg-transparent border-0 outline-none text-on-surface placeholder:text-outline font-body-md text-body-md" placeholder="Search for something else..." type="text" />
        </div>
      </div>
    </div>
  );
}
