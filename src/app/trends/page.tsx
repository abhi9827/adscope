import Image from "next/image";
import Link from "next/link";
import { TrendingUp, ArrowRight, AlertCircle } from "lucide-react";
import { Metadata } from "next";
import { AdSlot } from "@/components/monetization/AdSlot";

export const metadata: Metadata = {
  title: "Advertising Trends & Macro Creative Patterns | AdScope",
  description: "Explore emerging creative tropes, format velocity, and Creative DNA patterns observed across AdScope's indexed dataset.",
  alternates: {
    canonical: "/trends"
  }
};

export default function TrendsPage() {
  const trends = [
    {
      id: "ugc",
      title: "User-Generated Content (UGC)",
      description: "Smartphone-shot organic testimonials, unboxing videos, and authentic creator moments cutting through polished corporate campaigns.",
      observedPattern: "Common in DTC & Lifestyle",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8fS6C_XHmsJRrFwvzSfCKOpA6r8TW-nyzSF3pHTQibPm5ixeRWCPef2X__SUyVgssHmhbbDHIV-MeUsHgcK_E_Wqcz_D6kNHbTTV5meUuMJ85ggNTHC3IQ0fMJH0H7Ti_0G5Qd4dag-QNVDyQCpgm0xi_8TkVBSDrSAfOA4tCM2D4iBm9SnzpxDX3h0qrLIyP630EPNAKcPslO3_OIIcxOeeoksbTmaS435a2_1aGe3TTVyPEVL2C",
      indexedCount: "Multi-Platform"
    },
    {
      id: "short-form-video",
      title: "Short-Form Vertical Video",
      description: "Rapid visual cuts, first-3-second hook emphasis, and mobile-native 9:16 aspect ratio dominance across TikTok and Instagram Reels.",
      observedPattern: "Highest Format Density",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjE4vB8DdWfD_PQ2OvuwPJyjpCprlqMQJReeUBhFMVYxdMlrqIY0pwp5V78E2r9bi7Vsg6W4njLSwq7yoPncf_Ilo8teK7klvsqPWDDgJBSXetflZHmX6nOmmMApWuvo1yH9cbOFnrr9ehcKFVokf76o8ejNEhp7dIqVUvYzV4g8pocb-IImzUil-1WS8laad2VmilINK-19M3H8noByQsB8d_Msc8C9h7GhOxVh11_FdGXJCEnkzj",
      indexedCount: "TikTok & Reels"
    },
    {
      id: "athlete-led",
      title: "Athlete-Led Performance Creative",
      description: "Behind-the-scenes training vulnerability, raw locker room prep, and mental endurance storytelling replacing glossy endorsements.",
      observedPattern: "Leading Sports Strategy",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjE4vB8DdWfD_PQ2OvuwPJyjpCprlqMQJReeUBhFMVYxdMlrqIY0pwp5V78E2r9bi7Vsg6W4njLSwq7yoPncf_Ilo8teK7klvsqPWDDgJBSXetflZHmX6nOmmMApWuvo1yH9cbOFnrr9ehcKFVokf76o8ejNEhp7dIqVUvYzV4g8pocb-IImzUil-1WS8laad2VmilINK-19M3H8noByQsB8d_Msc8C9h7GhOxVh11_FdGXJCEnkzj",
      indexedCount: "Nike, Adidas"
    },
    {
      id: "product-demo",
      title: "Direct Product Demonstrations",
      description: "No-fluff tactile interactions showing physical textures, software UI frictionlessness, and instant before-and-after proofs.",
      observedPattern: "High-Intent Focus",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUnGe9TrWoJcJIQRmfdCn_GR599ngd1D3MRl59bi5LUCyG2yZKZbTQrN6MndeUPea1Na3vk5Wtdk0ugzSM622aW9N7oR8ZSGxq_mBW988JylADvUxXwPnU76xvliTfV4piHH_F-HRcUxyYVz73-OeQ-Nq6v340_foTnMKAq0Zq-LmySHylPt3om-BXNYFsdTpWHEVgWQT49txWGunG5_HBrYjxUIVIa1ix_l5kJlcbYgJlyXNbPOLc",
      indexedCount: "Tech & Auto"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-margin-desktop py-space-xl min-h-screen">
      <div className="mb-space-2xl">
        <div className="flex items-center gap-space-xs text-primary font-label-sm text-xs uppercase tracking-widest mb-space-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Macro Patterns</span>
        </div>
        <h1 className="font-headline-lg text-4xl sm:text-5xl text-on-surface uppercase tracking-tight mb-space-xs font-bold">
          Creative Trends
        </h1>
        <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
          Explore recurring patterns, narrative tropes, and formatting shifts observed in AdScope's indexed creative dataset.
        </p>
        <p className="font-body-sm text-xs text-outline mt-2 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-primary" />
          Observed in AdScope's indexed dataset. Reflects indexed creative volume, not verified market-wide ad spend.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
        {trends.map((trend) => (
          <div 
            key={trend.id} 
            className="group bg-surface-container-low border border-outline-variant/40 rounded-2xl overflow-hidden flex flex-col hover:border-primary/60 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="relative w-full aspect-video bg-surface-container-highest overflow-hidden">
              <Image 
                src={trend.imageUrl} 
                alt={trend.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
              
              <div className="absolute top-space-md right-space-md">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-highest/90 backdrop-blur-md border border-outline-variant/40 text-primary font-label-sm text-xs font-bold shadow-lg">
                  <TrendingUp className="w-3 h-3" /> {trend.observedPattern}
                </span>
              </div>
            </div>
            
            <div className="p-space-xl flex flex-col flex-1">
              <h2 className="font-headline-md text-xl md:text-2xl text-on-surface uppercase tracking-tight mb-space-xs group-hover:text-primary transition-colors font-bold">
                {trend.title}
              </h2>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant mb-space-lg leading-relaxed flex-1">
                {trend.description}
              </p>
              
              <div className="pt-space-md border-t border-outline-variant/20 flex items-center justify-between">
                <span className="font-label-sm text-xs text-outline">
                  {trend.indexedCount}
                </span>
                <Link 
                  href={`/trends/${trend.id}`} 
                  className="inline-flex items-center gap-1.5 font-label-sm text-xs uppercase tracking-widest text-primary hover:text-on-primary-container transition-colors font-semibold"
                >
                  Explore Trend &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-space-2xl w-full">
        <AdSlot placement="trends-directory" format="responsive" />
      </div>
    </div>
  );
}
