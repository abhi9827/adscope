import Link from "next/link";
import { Search } from "lucide-react";
import { AdSlot } from "@/components/monetization/AdSlot";

export default function BrandsPage() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // Demo data matching the homepage layout
  const brandsData = [
    { letter: 'A', items: [{ name: 'Adidas', count: 328, slug: 'adidas' }, { name: 'Amazon', count: 1240, slug: 'amazon' }, { name: 'Apple', count: 194, slug: 'apple' }] },
    { letter: 'B', items: [{ name: 'BMW', count: 215, slug: 'bmw' }, { name: 'Balenciaga', count: 74, slug: 'balenciaga' }, { name: 'Bose', count: 98, slug: 'bose' }] },
    { letter: 'C', items: [{ name: 'Coca-Cola', count: 516, slug: 'coca-cola' }, { name: 'Cartier', count: 62, slug: 'cartier' }, { name: 'Canva', count: 430, slug: 'canva' }] },
    { letter: 'N', items: [{ name: 'Nike', count: 412, slug: 'nike' }, { name: 'Netflix', count: 890, slug: 'netflix' }, { name: 'New Balance', count: 164, slug: 'new-balance' }] }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-margin-desktop py-space-xl">
      <div className="mb-space-xl">
        <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight mb-space-sm">Explore Brands</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Alphabetical directory covering over 4,000 global advertisers. Discover creative patterns, media spend velocity, and campaign structures across top-tier organizations.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-space-md mb-space-xl">
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-primary/10 rounded-lg blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="relative flex items-center w-full bg-surface-container-low border border-outline-variant/60 group-focus-within:border-primary rounded-lg px-space-md py-3 shadow-sm transition-all">
            <Search className="w-5 h-5 text-outline shrink-0 mr-space-md" />
            <input className="w-full bg-transparent border-0 outline-none text-on-surface placeholder:text-outline font-body-md text-body-md" placeholder="Search for a specific brand..." type="text" />
          </div>
        </div>
      </div>

      {/* A-Z Alphabetical Bar */}
      <div className="w-full overflow-x-auto pb-space-sm mb-space-xl border-b border-outline-variant/30 flex items-center gap-1.5 scrollbar-none sticky top-16 bg-surface z-10 py-2">
        <button className="px-3 py-1 bg-primary text-on-primary font-label-sm text-label-sm rounded font-bold shrink-0">ALL</button>
        {alphabet.map(letter => (
          <button key={letter} className="px-3 py-1 bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded transition-colors shrink-0">
            {letter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-lg">
        {brandsData.map(block => (
          <div key={block.letter} className="bg-surface-container-low border border-outline-variant/40 rounded-lg p-space-md flex flex-col">
            <span className="font-headline-md text-headline-md text-primary font-bold mb-space-md">{block.letter}</span>
            <ul className="space-y-space-xs font-body-sm text-body-sm flex-1">
              {block.items.map((item, idx) => (
                <li key={item.name} className={`py-2 ${idx !== block.items.length - 1 ? 'border-b border-outline-variant/20' : ''}`}>
                  <Link href={`/brands/${item.slug}`} className="flex items-center justify-between group cursor-pointer">
                    <span className="group-hover:text-primary transition-colors text-on-surface font-medium">{item.name}</span>
                    <span className="font-label-sm text-label-sm text-outline group-hover:text-primary/70 transition-colors">{item.count.toLocaleString()} ads</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-space-2xl w-full">
        <AdSlot placement="brands-directory" format="responsive" />
      </div>
    </div>
  );
}
