import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/navigation/CommandPalette";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: {
    template: '%s | AdScope',
    default: "AdScope | See what the world's biggest brands are advertising",
  },
  description: "Discover, compare, and analyze the world's top advertising campaigns. Get creative inspiration from the biggest brands across platforms.",
  keywords: ["advertising", "creative inspiration", "marketing campaigns", "ad library", "creative intelligence", "ad analysis", "TikTok ads", "Meta ads"],
  authors: [{ name: "AdScope Team" }],
  creator: "AdScope",
  metadataBase: new URL('https://adscope.dev'), // Update with actual domain
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adscope.dev",
    title: "AdScope | See what the world's biggest brands are advertising",
    description: "Discover, compare, and analyze the world's top advertising campaigns.",
    siteName: "AdScope",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdScope | Creative Advertising Intelligence",
    description: "Discover what the world's biggest brands are advertising.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
        <Navigation />
        <CommandPalette />
        <main className="w-full pt-16 bg-surface min-h-screen">
          <div className="flex flex-col w-full">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
