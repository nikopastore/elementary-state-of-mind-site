import type { Metadata } from "next";
import Script from "next/script";
import "lenis/dist/lenis.css";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  SITE_URL,
  getAuthorPersonEntity,
  getOrganizationEntity,
  getWebSiteEntity,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Elementary State of Mind | Elementary ELA & PBL Teacher Resources",
    template: "%s | Elementary State of Mind",
  },
  description:
    "Classroom-tested digital teaching resources for grades 3–8 by Dr. Zoe Pastore, Ed.D. (2026 ASU Prep District Teacher of the Year). Shop novel studies, mock trials, OREO & CER writing organizers, and anchor charts.",
  keywords: [
    "elementary teaching resources",
    "teacher resources",
    "Dr. Zoe Pastore",
    "Space Case Mock Trial",
    "OREO opinion writing",
    "CER debate prep",
    "project-based learning",
    "graphic organizers",
    "anchor charts",
    "Teachers Pay Teachers",
  ],
  authors: [{ name: "Dr. Zoe Pastore, Ed.D.", url: `${SITE_URL}/about` }],
  creator: "Dr. Zoe Pastore, Ed.D.",
  publisher: "Elementary State of Mind",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Elementary State of Mind",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 1200,
        alt: "Elementary State of Mind - Teacher Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elementary State of Mind | Elementary ELA & PBL Teacher Resources",
    description:
      "Classroom-tested digital resources for grades 3–8 educators: mock trial PBL units, writing organizers, anchor charts & classroom inspiration.",
    images: [`${SITE_URL}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteGraph = {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationEntity(),
      getAuthorPersonEntity(),
      getWebSiteEntity(),
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        {/* Preconnect hints for performance */}
        <link rel="preconnect" href="https://www.teacherspayteachers.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400..700&amp;family=Instrument+Sans:wght@400..700&amp;family=Newsreader:ital,wght@0,400..600;1,400..600&amp;display=swap" />
        {/* AI/LLM discovery */}
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Overview" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="LLM Complete Documentation" />
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="Elementary State of Mind Blog RSS Feed" />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fff9f1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Navigation />
        <Breadcrumbs />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <TestimonialsCarousel />
        <Footer />
        <SmoothScroll />
        <Script src="/section-motion.js?v=5" strategy="afterInteractive" />
      </body>
    </html>
  );
}
