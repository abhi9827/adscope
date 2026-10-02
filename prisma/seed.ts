import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const BRANDS = [
  // Sports/Fashion
  { name: 'Nike', slug: 'nike', description: 'Global sportswear and athletic equipment corporation.' },
  { name: 'Adidas', slug: 'adidas', description: 'Multinational corporation that designs and manufactures shoes, clothing and accessories.' },
  { name: 'Puma', slug: 'puma' },
  { name: 'New Balance', slug: 'new-balance' },
  { name: 'Under Armour', slug: 'under-armour' },
  { name: 'Lululemon', slug: 'lululemon' },
  
  // Technology
  { name: 'Apple', slug: 'apple' },
  { name: 'Samsung', slug: 'samsung' },
  { name: 'Google', slug: 'google' },
  { name: 'Microsoft', slug: 'microsoft' },
  { name: 'Sony', slug: 'sony' },
  { name: 'Meta', slug: 'meta' },
  
  // Automotive
  { name: 'Tesla', slug: 'tesla' },
  { name: 'BMW', slug: 'bmw' },
  { name: 'Mercedes-Benz', slug: 'mercedes-benz' },
  { name: 'Toyota', slug: 'toyota' },
  { name: 'Hyundai', slug: 'hyundai' },
  
  // Food/Beverage
  { name: 'Coca-Cola', slug: 'coca-cola' },
  { name: 'Pepsi', slug: 'pepsi' },
  { name: 'McDonald\'s', slug: 'mcdonalds' },
  { name: 'Starbucks', slug: 'starbucks' },
  { name: 'KFC', slug: 'kfc' },
  { name: 'Red Bull', slug: 'red-bull' },
  
  // Retail
  { name: 'Amazon', slug: 'amazon' },
  { name: 'Walmart', slug: 'walmart' },
  { name: 'IKEA', slug: 'ikea' },
  
  // Beauty/Lifestyle
  { name: 'L\'Oréal', slug: 'loreal' },
  { name: 'Sephora', slug: 'sephora' },
  { name: 'Unilever', slug: 'unilever' },
  
  // Additional major global brand
  { name: 'Disney', slug: 'disney' },
]

const INDUSTRIES = [
  { name: 'Sports & Fashion', slug: 'sports-fashion' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Automotive', slug: 'automotive' },
  { name: 'Food & Beverage', slug: 'food-beverage' },
  { name: 'Beauty & Lifestyle', slug: 'beauty-lifestyle' },
  { name: 'Retail', slug: 'retail' },
  { name: 'Finance', slug: 'finance' },
  { name: 'Travel', slug: 'travel' },
  { name: 'Gaming', slug: 'gaming' },
  { name: 'Entertainment', slug: 'entertainment' },
]

const PLATFORMS = [
  { name: 'Meta', slug: 'meta' },
  { name: 'Instagram', slug: 'instagram' },
  { name: 'Facebook', slug: 'facebook' },
  { name: 'TikTok', slug: 'tiktok' },
  { name: 'Google', slug: 'google' },
  { name: 'YouTube', slug: 'youtube' },
]

const COUNTRIES = [
  { name: 'United States', code: 'US', slug: 'us' },
  { name: 'United Kingdom', code: 'UK', slug: 'uk' },
  { name: 'Japan', code: 'JP', slug: 'japan' },
  { name: 'Germany', code: 'DE', slug: 'germany' },
  { name: 'Global', code: 'GLOBAL', slug: 'global' },
]

const SOURCES = [
  { name: 'Meta Ad Library', url: 'https://www.facebook.com/ads/library' },
  { name: 'TikTok Creative Center', url: 'https://ads.tiktok.com/business/creativecenter' },
  { name: 'Google Ads Transparency Center', url: 'https://adstransparency.google.com/' },
  { name: 'Mock Source', url: '#' },
]

async function main() {
  console.log('Start seeding...')

  // Clear existing
  await prisma.creative.deleteMany()
  await prisma.aIAnalysis.deleteMany()
  await prisma.ad.deleteMany()
  await prisma.campaign.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.industry.deleteMany()
  await prisma.platform.deleteMany()
  await prisma.country.deleteMany()
  await prisma.adSource.deleteMany()

  // Seed Industries
  for (const ind of INDUSTRIES) {
    await prisma.industry.upsert({
      where: { slug: ind.slug },
      update: {},
      create: ind,
    })
  }

  // Seed Platforms
  for (const plat of PLATFORMS) {
    await prisma.platform.upsert({
      where: { slug: plat.slug },
      update: {},
      create: plat,
    })
  }

  // Seed Countries
  for (const country of COUNTRIES) {
    await prisma.country.upsert({
      where: { code: country.code },
      update: {},
      create: country,
    })
  }

  // Seed Sources
  for (const source of SOURCES) {
    await prisma.adSource.upsert({
      where: { name: source.name },
      update: {},
      create: source,
    })
  }

  // Seed Brands
  for (const brand of BRANDS) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: brand,
    })
  }

  // Create Demo Ads for Nike
  const nike = await prisma.brand.findUnique({ where: { slug: 'nike' } })
  const apple = await prisma.brand.findUnique({ where: { slug: 'apple' } })
  const tesla = await prisma.brand.findUnique({ where: { slug: 'tesla' } })
  const tiktok = await prisma.platform.findUnique({ where: { slug: 'tiktok' } })
  const meta = await prisma.platform.findUnique({ where: { slug: 'meta' } })
  const youtube = await prisma.platform.findUnique({ where: { slug: 'youtube' } })
  const us = await prisma.country.findUnique({ where: { code: 'US' } })
  const global = await prisma.country.findUnique({ where: { code: 'GLOBAL' } })
  const mockSource = await prisma.adSource.findUnique({ where: { name: 'Mock Source' } })

  if (nike && tiktok && us && mockSource && apple && meta && youtube && global && tesla) {
    const campaign1 = await prisma.campaign.create({
      data: {
        name: "Winning Isn't For Everyone",
        slug: "winning-isnt-for-everyone",
        description: "Polarizing athletic grit",
        brandId: nike.id
      }
    })

    const campaign2 = await prisma.campaign.create({
      data: {
        name: "Shot on iPhone 15 Pro",
        slug: "shot-on-iphone-15",
        description: "Cinematic features highlighted",
        brandId: apple.id
      }
    })

    await prisma.ad.create({
      data: {
        title: "Nike Elite Performance",
        format: "Video",
        isDemo: true,
        brandId: nike.id,
        campaignId: campaign1.id,
        platformId: tiktok.id,
        countryId: us.id,
        sourceId: mockSource.id,
        date: new Date(),
        creatives: {
          create: {
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjE4vB8DdWfD_PQ2OvuwPJyjpCprlqMQJReeUBhFMVYxdMlrqIY0pwp5V78E2r9bi7Vsg6W4njLSwq7yoPncf_Ilo8teK7klvsqPWDDgJBSXetflZHmX6nOmmMApWuvo1yH9cbOFnrr9ehcKFVokf76o8ejNEhp7dIqVUvYzV4g8pocb-IImzUil-1WS8laad2VmilINK-19M3H8noByQsB8d_Msc8C9h7GhOxVh11_FdGXJCEnkzj",
            type: "video"
          }
        },
        creativeDna: {
          create: {
            hookType: "Bold Statement",
            visualStyle: "Cinematic",
            emotionalAngle: "Inspiration",
            contentFormat: "Short-form Video",
            ctaType: "Shop Now",
            audienceInterpretation: "Athletes",
            themes: ["Athlete", "Performance", "Sports"]
          }
        }
      }
    })

    await prisma.ad.create({
      data: {
        title: "Apple Cinematic Mode",
        format: "Carousel",
        isDemo: true,
        brandId: apple.id,
        campaignId: campaign2.id,
        platformId: meta.id,
        countryId: global.id,
        sourceId: mockSource.id,
        date: new Date(),
        creatives: {
          create: {
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8fS6C_XHmsJRrFwvzSfCKOpA6r8TW-nyzSF3pHTQibPm5ixeRWCPef2X__SUyVgssHmhbbDHIV-MeUsHgcK_E_Wqcz_D6kNHbTTV5meUuMJ85ggNTHC3IQ0fMJH0H7Ti_0G5Qd4dag-QNVDyQCpgm0xi_8TkVBSDrSAfOA4tCM2D4iBm9SnzpxDX3h0qrLIyP630EPNAKcPslO3_OIIcxOeeoksbTmaS435a2_1aGe3TTVyPEVL2C",
            type: "image"
          }
        },
        creativeDna: {
          create: {
            hookType: "Curiosity",
            visualStyle: "Minimal",
            emotionalAngle: "Curiosity",
            contentFormat: "Carousel",
            ctaType: "Learn More",
            audienceInterpretation: "Tech enthusiasts",
            themes: ["Cinematography", "Innovation", "Storytelling"]
          }
        }
      }
    })

    await prisma.ad.create({
      data: {
        title: "Tesla Model Y Performance",
        format: "Video",
        isDemo: true,
        brandId: tesla.id,
        platformId: youtube.id,
        countryId: us.id,
        sourceId: mockSource.id,
        date: new Date(),
        creatives: {
          create: {
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUnGe9TrWoJcJIQRmfdCn_GR599ngd1D3MRl59bi5LUCyG2yZKZbTQrN6MndeUPea1Na3vk5Wtdk0ugzSM622aW9N7oR8ZSGxq_mBW988JylADvUxXwPnU76xvliTfV4piHH_F-HRcUxyYVz73-OeQ-Nq6v340_foTnMKAq0Zq-LmySHylPt3om-BXNYFsdTpWHEVgWQT49txWGunG5_HBrYjxUIVIa1ix_l5kJlcbYgJlyXNbPOLc",
            type: "video"
          }
        },
        creativeDna: {
          create: {
            hookType: "Problem/Solution",
            visualStyle: "High-energy",
            emotionalAngle: "Excitement",
            contentFormat: "Video",
            ctaType: "Buy Now",
            audienceInterpretation: "Tech enthusiasts",
            themes: ["Electric Vehicles", "Clean Tech", "Minimalist"]
          }
        }
      }
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
