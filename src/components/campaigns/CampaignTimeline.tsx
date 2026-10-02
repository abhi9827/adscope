import { Clock, Calendar, CheckCircle2, Layers, Globe } from "lucide-react";

interface TimelineEvent {
  date: Date | string;
  type: string;
  label: string;
  detail: string;
}

interface CampaignTimelineProps {
  timeline: {
    campaignName: string;
    campaignSlug: string;
    brandName?: string;
    firstSeen: Date | string;
    lastSeen: Date | string;
    totalVariants: number;
    platforms: string[];
    countries: string[];
    events: TimelineEvent[];
  };
}

export function CampaignTimeline({ timeline }: CampaignTimelineProps) {
  const { firstSeen, lastSeen, totalVariants, platforms, countries, events } = timeline;

  const formatDate = (d: Date | string) => {
    return new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="w-full p-space-lg md:p-space-xl rounded-2xl bg-surface-container-low border border-outline-variant/40 mb-space-xl shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-md border-b border-outline-variant/20 gap-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="font-headline-md text-xl md:text-2xl text-on-surface uppercase tracking-wide font-bold">
            Campaign Timeline
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs font-label-sm text-outline">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            First indexed: <strong className="text-on-surface">{formatDate(firstSeen)}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            Last indexed: <strong className="text-on-surface">{formatDate(lastSeen)}</strong>
          </span>
        </div>
      </div>

      {/* Overview Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-space-lg">
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
          <span className="text-xs font-label-sm text-outline uppercase tracking-wider">Total Variants</span>
          <span className="font-display text-xl text-primary font-bold">{totalVariants}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
          <span className="text-xs font-label-sm text-outline uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-primary" /> Platforms
          </span>
          <span className="text-xs font-label-md text-on-surface truncate max-w-[140px] text-right">
            {platforms.join(", ") || "Multi-platform"}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
          <span className="text-xs font-label-sm text-outline uppercase tracking-wider flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-primary" /> Markets
          </span>
          <span className="text-xs font-label-md text-on-surface truncate max-w-[140px] text-right">
            {countries.join(", ") || "Global"}
          </span>
        </div>
      </div>

      {/* Visual Timeline Nodes */}
      <div className="relative pl-6 md:pl-8 border-l border-outline-variant/40 space-y-6 my-4">
        {events.map((event, idx) => (
          <div key={idx} className="relative group">
            {/* Dot Node */}
            <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-primary group-hover:scale-125 transition-transform flex items-center justify-center shadow-[0_0_8px_rgba(192,193,255,0.4)]">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <span className="text-xs font-label-md text-primary font-bold uppercase tracking-wider">
                {event.type}
              </span>
              <span className="text-[11px] font-label-sm text-outline">
                {formatDate(event.date)}
              </span>
            </div>

            <h3 className="font-label-lg text-sm text-on-surface font-semibold mb-0.5">
              {event.label}
            </h3>
            <p className="text-xs font-body-sm text-on-surface-variant">
              {event.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
