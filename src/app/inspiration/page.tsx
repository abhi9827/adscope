'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, Dna, AlertCircle, Copy, Check, RefreshCw } from 'lucide-react';
import { VISUAL_STYLES, CONTENT_FORMATS, AUDIENCE_INTERPRETATIONS } from '@/types/creative-dna';
import { CreativeDirectionResult } from '@/lib/ai/provider';
import { MonetizationSection } from '@/components/monetization/MonetizationSection';
import { AdSlot } from '@/components/monetization/AdSlot';

const INDUSTRIES = [
  'Food & Beverage',
  'Sports & Fitness',
  'Consumer Tech & SaaS',
  'Beauty & Personal Care',
  'Automotive',
  'Fashion & Apparel',
  'E-Commerce & Retail'
];

const PLATFORMS = [
  'TikTok',
  'Meta (Instagram / FB)',
  'YouTube',
  'Google Display'
];

export default function InspirationPage() {
  const [prompt, setPrompt] = useState('I need an advertisement for a food delivery app.');
  const [industry, setIndustry] = useState('Food & Beverage');
  const [platform, setPlatform] = useState('TikTok');
  const [format, setFormat] = useState('Short-form Video');
  const [audience, setAudience] = useState('Young adults');
  const [creativeStyle, setCreativeStyle] = useState('UGC');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CreativeDirectionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/inspiration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          industry,
          platform,
          format,
          audience,
          creativeStyle
        })
      });

      if (!res.ok) throw new Error('Generation failed');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `HOOK: ${result.hook}\nFORMAT: ${result.creativeFormat}\nSTRUCTURE: ${result.structure}\nVISUAL DIRECTION: ${result.visualDirection}\nMESSAGING: ${result.messaging}\nCTA: ${result.cta}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-margin-desktop py-space-xl min-h-screen flex flex-col">
      {/* Header */}
      <div className="mb-space-2xl">
        <div className="flex items-center gap-space-xs text-primary font-label-sm text-xs uppercase tracking-widest mb-space-sm">
          <Sparkles className="w-4 h-4" />
          <span>Idea Engine</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-on-surface font-bold tracking-tight uppercase mb-space-xs">
          Creative Inspiration
        </h1>
        <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
          Generate advertising creative directions, high-retention opening hooks, visual styles, and narrative structures for your next campaign.
        </p>
        <p className="font-body-sm text-xs text-outline mt-2 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-primary" />
          This is creative inspiration and structural direction, NOT verified advertising performance data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-start">
        {/* LEFT: Generator Form */}
        <div className="lg:col-span-5 bg-surface-container-low border border-outline-variant/40 rounded-2xl p-space-lg shadow-xl">
          <form onSubmit={handleGenerate} className="flex flex-col gap-space-md">
            <div>
              <label className="block font-label-md text-xs uppercase tracking-wider text-on-surface mb-2 font-semibold">
                What are you creating?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. I need an advertisement for a food delivery app..."
                rows={3}
                required
                className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-label-sm text-[10px] uppercase tracking-widest text-outline mb-1">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-2 text-xs text-on-surface focus:outline-none focus:border-primary"
                >
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-label-sm text-[10px] uppercase tracking-widest text-outline mb-1">
                  Target Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-2 text-xs text-on-surface focus:outline-none focus:border-primary"
                >
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-label-sm text-[10px] uppercase tracking-widest text-outline mb-1">
                  Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-2 text-xs text-on-surface focus:outline-none focus:border-primary"
                >
                  {CONTENT_FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-label-sm text-[10px] uppercase tracking-widest text-outline mb-1">
                  Audience
                </label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-2 text-xs text-on-surface focus:outline-none focus:border-primary"
                >
                  {AUDIENCE_INTERPRETATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-label-sm text-[10px] uppercase tracking-widest text-outline mb-1">
                  Visual Style
                </label>
                <select
                  value={creativeStyle}
                  onChange={(e) => setCreativeStyle(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-2 text-xs text-on-surface focus:outline-none focus:border-primary"
                >
                  {VISUAL_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3.5 bg-primary text-on-primary rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-primary-container shadow-[0_0_24px_rgba(192,193,255,0.2)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Direction...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate Creative Direction
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT: Output Creative Direction */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="p-space-lg md:p-space-xl rounded-2xl bg-surface-container-low border border-outline-variant/40 shadow-2xl flex flex-col gap-space-md animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-label-sm text-xs uppercase tracking-widest text-primary font-bold">
                    Generated Creative Direction
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs font-label-md text-on-surface hover:text-primary transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Hook */}
              <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <span className="font-label-sm text-xs text-outline uppercase tracking-widest block mb-1">
                  Opening Hook (0–3s)
                </span>
                <p className="font-headline-md text-xl md:text-2xl text-on-surface font-bold">
                  "{result.hook}"
                </p>
              </div>

              {/* Visual Direction & Pacing */}
              <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <span className="font-label-sm text-xs text-outline uppercase tracking-widest block mb-1">
                  Visual Direction & Pacing
                </span>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {result.visualDirection}
                </p>
              </div>

              {/* Narrative Structure */}
              <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <span className="font-label-sm text-xs text-outline uppercase tracking-widest block mb-1">
                  Narrative Structure
                </span>
                <p className="font-label-md text-xs text-primary font-semibold tracking-wide">
                  {result.structure}
                </p>
              </div>

              {/* Messaging & CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <span className="font-label-sm text-xs text-outline uppercase tracking-widest block mb-1">
                    Core Messaging
                  </span>
                  <p className="font-body-md text-xs text-on-surface">
                    {result.messaging}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <span className="font-label-sm text-xs text-outline uppercase tracking-widest block mb-1">
                    Call To Action
                  </span>
                  <span className="inline-block px-3 py-1 rounded bg-primary text-on-primary font-label-md text-xs font-bold uppercase tracking-wider">
                    {result.cta}
                  </span>
                </div>
              </div>

              {/* Suggested Creative DNA */}
              {result.suggestedCreativeDna && (
                <div className="pt-space-sm border-t border-outline-variant/20 flex flex-col gap-2">
                  <span className="font-label-sm text-xs text-outline uppercase tracking-widest flex items-center gap-1.5">
                    <Dna className="w-3.5 h-3.5 text-primary" /> Suggested Creative DNA
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs text-primary">
                      Style: {result.suggestedCreativeDna.visualStyle}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs text-on-surface">
                      Format: {result.suggestedCreativeDna.contentFormat}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container border border-outline-variant/30 text-xs text-on-surface">
                      Hook: {result.suggestedCreativeDna.hookType}
                    </span>
                    {(result.suggestedCreativeDna.themes || []).map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-surface-container-high text-xs text-outline">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[360px] flex flex-col items-center justify-center p-8 rounded-2xl bg-surface-container-low/30 border-2 border-dashed border-outline-variant/40 text-center">
              <Sparkles className="w-12 h-12 text-outline mb-space-md" />
              <h3 className="font-headline-md text-lg text-on-surface uppercase tracking-wide font-bold mb-1">
                Awaiting Creative Brief
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant max-w-sm">
                Enter your creative concept on the left and select your target platform and format to generate a complete creative direction.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="my-space-xl w-full">
        <AdSlot placement="inspiration-middle" format="responsive" />
      </div>

      {/* CREATIVE TOOL RECOMMENDATIONS (AFFILIATE FOUNDATION) */}
      <MonetizationSection
        type="affiliate"
        title="You have your creative direction. Now create it."
        subtitle="Curated design, video, AI, and marketing tools for rapid campaign production."
        className="mt-8"
      />
    </div>
  );
}
