import Link from "next/link";
import Image from "next/image";
import { Filter, ExternalLink } from "lucide-react";
import { AdSlot } from "@/components/monetization/AdSlot";

export default async function BrandCampaignsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brandName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const campaigns = [
    {
      title: "Winning Isn't For Everyone",
      slug: "winning-isnt-for-everyone",
      description: "Polarizing, raw athletic grit challenging modern soft sports marketing. Features 14 star athletes confronting the raw psychology of obsession.",
      ads: 42,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjE4vB8DdWfD_PQ2OvuwPJyjpCprlqMQJReeUBhFMVYxdMlrqIY0pwp5V78E2r9bi7Vsg6W4njLSwq7yoPncf_Ilo8teK7klvsqPWDDgJBSXetflZHmX6nOmmMApWuvo1yH9cbOFnrr9ehcKFVokf76o8ejNEhp7dIqVUvYzV4g8pocb-IImzUil-1WS8laad2VmilINK-19M3H8noByQsB8d_Msc8C9h7GhOxVh11_FdGXJCEnkzj"
    },
    {
      title: "Air Max Day 2025",
      slug: "air-max-day-2025",
      description: "High-energy CGI product reveals combined with community-led unboxing content.",
      ads: 18,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBR8DqxGlSiMVXN2QJFiBc-MC7zr0zfZJqApwuYugDEn7MGdLgkh64Ki1EL5QK403ZWlV8FgV7zRuIUMRCSeJqbtDdtj5oUOj4_YI11edtZkumO5jeY95fRShsjR3UQblEBfqeVx9e9dvWXnLuEhWBLJUU-UszkMegasBC-MuzHCpb8nMeav6b2Vf-SoAh_I5e2nQpOEYhyR1PsZHHVMp1Tv30viKFLho3CkofreXDFIDydQ5VoNsr8"
    }
  ];

  return (
    <div className="w-full flex flex-col min-h-screen pb-space-xl">
      {/* Brand Header */}
      <div className="w-full bg-surface-container-lowest border-b border-surface-variant pt-space-xl pb-space-lg px-margin-desktop">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-space-lg md:items-end justify-between">
          <div className="flex items-start gap-space-md">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-surface-container-highest border border-outline-variant/40 flex items-center justify-center overflow-hidden shrink-0">
              <span className="font-headline-lg text-4xl sm:text-6xl text-on-surface font-bold tracking-tighter">
                {brandName.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col mt-2">
              <h1 className="font-display text-4xl sm:text-5xl text-on-surface font-bold tracking-tight uppercase">
                {brandName}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2 font-label-md text-label-md text-primary">
                <span>Sports</span>
                <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                <span>Footwear</span>
                <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                <span>Apparel</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-space-md leading-relaxed">
                Global sportswear and athletic equipment corporation. High-velocity creative output across dynamic digital formats.
              </p>
            </div>
          </div>
          <a href="#" className="inline-flex items-center justify-center gap-2 px-space-md py-2.5 bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 rounded-lg text-on-surface font-label-md transition-colors mt-space-md md:mt-0 whitespace-nowrap group">
            <span>Visit Website</span>
            <ExternalLink className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
          </a>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mt-space-xl flex items-center gap-space-lg border-b border-outline-variant/30 overflow-x-auto scrollbar-none">
          <Link href={`/brands/${slug}`} className="pb-3 border-b-2 border-transparent hover:border-outline-variant/60 font-label-md text-on-surface-variant hover:text-on-surface transition-all whitespace-nowrap">
            Ads
          </Link>
          <Link href={`/brands/${slug}/campaigns`} className="pb-3 border-b-2 border-primary font-label-md text-primary whitespace-nowrap">
            Campaigns
          </Link>
          <Link href={`/brands/${slug}/trends`} className="pb-3 border-b-2 border-transparent hover:border-outline-variant/60 font-label-md text-on-surface-variant hover:text-on-surface transition-all whitespace-nowrap">
            Creative Trends
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-margin-desktop py-space-xl">
        <div className="flex flex-col gap-space-lg">
          {campaigns.map(camp => (
            <Link href={`/campaigns/${camp.slug}`} key={camp.slug} className="group flex flex-col md:flex-row bg-surface-container-low border border-outline-variant/40 rounded-xl overflow-hidden hover:border-primary/60 transition-all duration-300">
              <div className="w-full md:w-1/3 aspect-video md:aspect-auto relative bg-surface-container-highest overflow-hidden">
                 <Image src={camp.imageUrl} alt={camp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="w-full md:w-2/3 p-space-lg flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface uppercase group-hover:text-primary transition-colors">{camp.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">{camp.description}</p>
                </div>
                <div className="mt-space-lg pt-space-md border-t border-outline-variant/30 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">{camp.ads} Indexed Ads</span>
                  <span className="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                    Analyze <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-space-2xl w-full">
          <AdSlot placement="campaigns-middle" format="responsive" />
        </div>
      </div>
    </div>
  );
}
