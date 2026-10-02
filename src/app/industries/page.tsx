import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AdSlot } from "@/components/monetization/AdSlot";

export default function IndustriesPage() {
  const industries = [
    { title: 'Sports & Athletics', stats: '142 Brands · 3.8k Ads', slug: 'sports', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR8DqxGlSiMVXN2QJFiBc-MC7zr0zfZJqApwuYugDEn7MGdLgkh64Ki1EL5QK403ZWlV8FgV7zRuIUMRCSeJqbtDdtj5oUOj4_YI11edtZkumO5jeY95fRShsjR3UQblEBfqeVx9e9dvWXnLuEhWBLJUU-UszkMegasBC-MuzHCpb8nMeav6b2Vf-SoAh_I5e2nQpOEYhyR1PsZHHVMp1Tv30viKFLho3CkofreXDFIDydQ5VoNsr8' },
    { title: 'Fashion & Luxury', stats: '289 Brands · 7.4k Ads', slug: 'fashion', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWS0nr-2EdqFliaXPL1LHJrCvOcBUpscBwKRlM71JH2J0492Gj6Odj15oImPfC1hoa1cASiMxEbEuCuTaD5ddu7hWkaaUmSVLSHZCFZso1-UTKhCUfgusFY8xLmKFfd3xbdf5zkTfj0UtHtgrz5FmVIrnl12JThOvtjii-bZGQWevME2AeYEKAARxGTPM8HyknYKJQJI8eq98L90bXDaFsk106vGmdJHpSkLY_d5hspW__VdBLJrQc' },
    { title: 'Consumer Tech', stats: '210 Brands · 5.1k Ads', slug: 'tech', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARAs4_55_Ol0Y6qepFy3A56UA1xfEEV3dB3FlcCZ46_0vhvKgvX_58e5oONT32emfkPmw34LXi33Z6iVSJt-YGjzSyn94oevTeSl7DT7p-VRo2o-ybTJjcjJ_B0mKCfbjFSFOD9xzgbplxYBdI2Z-m9SS18Ywad4bJ5NNsQjbibagt8P0GZ0II--yXG-BFZrc0c_SJ8Hz9_lbpVFZwbKSU6EadIvUf6V5P8cU9TzIm5udirO8zn8Dl' },
    { title: 'Automotive', stats: '96 Brands · 2.9k Ads', slug: 'automotive', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBooebgpyobvwb869c-K3NMJPiy-Wp8d5xzLklCw1_RAYZWxvZ9Po3iTAoGwijcSE2XF6ORFWY6R_QFZFJEE4BdKjmffRI20SGo3WW7XbRnr6Z9NM0jcXzDO4_L5X7DbJqa9BGSqut5hMYMVG_0ff9z2W5thtMJk_dZ_9Y0_9RP_ZRhOzgaEqApz6de_Td1ARAYLCcfDLGjFkeKqZqF75Ia6SDE0prZUI9-PBQM3IT4ozITTiX7_6XF' },
    { title: 'Food & Beverage', stats: '315 Brands · 8.2k Ads', slug: 'food', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL2qaNscKx16X21yp6Uld6lr8WNDlb5LElfxDamT48Eebk6eEU-fD7mqImqOX8HadYuEuPbBLgGewhkPJVxNjKghr-4cQeDGI-vl0fumUS213WD0-wtdXpqOw1wLuGXvECVD9WVmsF33z3ZJM1fIp7E4_TCHTyGtvKyp1mr173hquNkwB61yBUf1GHLZDwaU4Qftl37iXiYkvj7HP1mQKBFRJJvdPLeX0k91MbcCaunAaLVuXkGUXL' },
    { title: 'Beauty & Care', stats: '184 Brands · 4.6k Ads', slug: 'beauty', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi5efNq2jT4M-6q4S_zmv-ZIbh9wlpo0qhytFMMbRoPTWboN4wl6dDwZMzYBHGY1Q4Ywn4PYiCucQ6gkrH9he4nCJECNM-M-e8t-5b_EtcazIfASnODhqszeHP866kvmOyAtM4IV_Ex2X8XynBAUX8ZsOt2uV5pi_KF1DMP-TRX91I0uQnPQ0LfhPlstX8yfEFi77AZ5G_UQTJzgK60kMpG7dKktMS5u1cCTZT00XQxwsXSAgZoyQT' },
    { title: 'Gaming', stats: '152 Brands · 6.1k Ads', slug: 'gaming', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-oRpyzJX_G0RR8nKMdzM81dCgpH0OWepvEqV-JEFonVBWi7qzXBQutOvVUJ0opzFRz2R-8J2yCzYj5Y6d_wdWv2YrqZE7KkkVKQXm_FPTgnfu4UPKcZv6eeaQsLnkXHQUtNJ2_8HDj7iPV-uh5vkdd6lBV0_WAGYB7dKiJ2PaS9uA7bodqfgvKMr4AcjQjO7Qtpv48ZSKKq46poxpDp18cCiCR8PhSpecEdzMxdCepZVudu5NNl2O' },
    { title: 'FinTech', stats: '118 Brands · 2.4k Ads', slug: 'fintech', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt8w2aUwTjUwcjY4e4s-0CvYPmhBZ0WYW4h4Z9taPNurIABvU1McI2kBHuwG87su8GU7bEO3dN-JtFU4VtChNKY5vjPsx0YmA3aiCk8I7tfYoEJ5XISw8KDfvLgyFX45cHmV4SM7HJ1xfRulBQ3ZOryEstuPW9fjsxJUn6nhAq_-j9aAKKLCSZ_H6h8Ac0JhzmvviOukYzussgcD8SJE2HKjoR_Q-1TtBfplnVUiMeK-T8EEbOH1ca' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-margin-desktop py-space-xl min-h-screen">
      <div className="mb-space-xl">
        <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight mb-space-sm">Explore Industries</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Benchmark your creative strategies against the fiercest sectors. Dive into industry-specific creative patterns and top-performing campaigns.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-lg">
        {industries.map(ind => (
          <Link href={`/industries/${ind.slug}`} key={ind.slug} className="group relative h-64 rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/40 hover:border-primary/80 transition-all duration-300 shadow-md">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
               <Image src={ind.image} alt={ind.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-50 grayscale group-hover:grayscale-0" />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-black/20 group-hover:from-surface-container-lowest/90 transition-colors duration-300"></div>
            
            {/* Content */}
            <div className="relative h-full p-space-lg flex flex-col justify-between">
              <div className="flex justify-end">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest/80 backdrop-blur border border-outline-variant/40 flex items-center justify-center text-outline group-hover:text-primary group-hover:border-primary group-hover:scale-110 group-hover:-translate-y-1 transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">{ind.title}</h3>
                <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase mt-1 block">{ind.stats}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-space-2xl w-full">
        <AdSlot placement="industries-directory" format="responsive" />
      </div>
    </div>
  );
}
