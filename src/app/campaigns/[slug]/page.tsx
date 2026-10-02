import Image from "next/image";
import Link from "next/link";
import { AdCard } from "@/components/ads/AdCard";
import { getCampaignWithAds, getCampaignTimeline } from "@/lib/db/actions";
import { notFound } from "next/navigation";
import { CampaignTimeline } from "@/components/campaigns/CampaignTimeline";
import { ShareButton } from "@/components/ui/ShareButton";
import { Metadata } from "next";
import { AdSlot } from "@/components/monetization/AdSlot";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const campaign: any = await getCampaignWithAds(slug);
  if (!campaign) return { title: "Campaign Not Found | AdScope" };

  const title = `"${campaign.name}" - ${campaign.brand?.name} Campaign | AdScope`;
  const description = `Explore ${campaign.brand?.name}'s "${campaign.name}" campaign timeline, creative variants, and formats on AdScope.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/campaigns/${slug}`
    }
  };
}

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const campaign: any = await getCampaignWithAds(slug);
  
  if (!campaign) {
    notFound();
  }

  const timeline = await getCampaignTimeline(slug);
  const campaignName = campaign.name;
  const campaignAds: any[] = campaign.ads || [];
  const imageUrl = campaignAds[0]?.creatives?.[0]?.url || campaignAds[0]?.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBjE4vB8DdWfD_PQ2OvuwPJyjpCprlqMQJReeUBhFMVYxdMlrqIY0pwp5V78E2r9bi7Vsg6W4njLSwq7yoPncf_Ilo8teK7klvsqPWDDgJBSXetflZHmX6nOmmMApWuvo1yH9cbOFnrr9ehcKFVokf76o8ejNEhp7dIqVUvYzV4g8pocb-IImzUil-1WS8laad2VmilINK-19M3H8noByQsB8d_Msc8C9h7GhOxVh11_FdGXJCEnkzj";

  return (
    <div className="w-full flex flex-col min-h-screen pb-space-xl">
      {/* Editorial Campaign Header */}
      <div className="relative w-full h-[50vh] min-h-[380px] bg-surface-container-highest overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={campaignName} 
          fill 
          className="object-cover opacity-30 blur-sm" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent"></div>
        
        <div className="absolute inset-0 px-4 md:px-margin-desktop py-space-xl flex flex-col justify-end max-w-7xl mx-auto">
          <div className="flex items-center gap-space-sm mb-space-sm">
            <Link 
              href={`/brands/${campaign.brand?.slug}`} 
              className="inline-flex items-center px-3 py-1 bg-surface-container-high border border-outline-variant/40 rounded text-on-surface font-label-sm text-xs uppercase tracking-widest hover:border-primary transition-colors"
            >
              {campaign.brand?.name}
            </Link>
            <span className="inline-flex items-center px-3 py-1 bg-primary text-on-primary rounded font-label-sm text-xs uppercase tracking-widest font-bold">
              Multi-Channel Campaign
            </span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-on-surface font-bold tracking-tight uppercase max-w-4xl leading-tight">
            "{campaignName}"
          </h1>
          
          <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-3xl mt-space-sm leading-relaxed">
            {campaign.description || "An AdScope indexed multi-channel campaign with high cross-format velocity."}
          </p>
          
          <div className="mt-space-md flex items-center gap-space-md">
            <ShareButton title={`${campaignName} on AdScope`} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-margin-desktop py-space-xl">
        {/* PHASE 6: CAMPAIGN TIMELINE */}
        {timeline && (
          <CampaignTimeline timeline={timeline} />
        )}

        {/* Variants Grid */}
        <div className="flex items-center justify-between pb-space-sm mb-space-lg border-b border-outline-variant/30">
          <h2 className="font-headline-md text-xl text-on-surface uppercase tracking-wide font-bold">
            Observed Creative Variants ({campaignAds.length})
          </h2>
          <span className="font-label-sm text-xs text-outline uppercase tracking-wider">
            Chronological Order
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-lg items-start">
          {campaignAds.map((ad: any, i: number) => (
            <AdCard 
              key={`${ad.id}-${i}`}
              id={ad.id}
              brand={campaign.brand?.name}
              brandSlug={campaign.brand?.slug}
              platform={ad.platform?.name || 'Unknown'}
              format={ad.format}
              imageUrl={ad.creatives?.[0]?.url || ad.imageUrl || ""}
              campaign={campaignName}
            />
          ))}
        </div>

        <div className="mt-space-2xl w-full">
          <AdSlot placement="campaigns-middle" format="responsive" />
        </div>
      </div>
    </div>
  );
}
