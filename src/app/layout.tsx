import type { Metadata } from "next";
import Script from "next/script";
import "lenis/dist/lenis.css";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elementarystateofmind.com"),
  title: {
    default: "Elementary State of Mind | Teacher Resources",
    template: "%s | Elementary State of Mind",
  },
  description: "Engaging digital resources for elementary teachers - lesson plans, novel studies, anchor charts & classroom decor. Shop standards-aligned ELA materials on Teachers Pay Teachers.",
  keywords: ["teacher resources", "elementary education", "digital downloads", "lesson plans", "classroom decor"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.elementarystateofmind.com",
    siteName: "Elementary State of Mind",
    images: [
      {
        url: "https://www.elementarystateofmind.com/logo.png",
        width: 1200,
        height: 1200,
        alt: "Elementary State of Mind - Teacher Resources",
      },
    ],
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
  alternates: {
    canonical: "https://www.elementarystateofmind.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization Schema for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Elementary State of Mind",
    url: "https://www.elementarystateofmind.com",
    logo: "https://www.elementarystateofmind.com/logo.png",
    description: "Beautiful, engaging digital resources for elementary teachers. Lesson plans, worksheets, novel studies, and classroom decor for grades 3-8.",
    foundingDate: "2020",
    sameAs: [
      "https://www.teacherspayteachers.com/store/elementary-state-of-mind",
      "https://www.instagram.com/elementarystateofmind/",
      "https://www.facebook.com/elementarystateofmind/",
      "https://www.tiktok.com/@elementarystateofmindd",
      "https://www.pinterest.com/elementarystateofmindd/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: "https://www.elementarystateofmind.com",
    },
  };

  // WebSite schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Elementary State of Mind",
    url: "https://www.elementarystateofmind.com",
    description: "Digital teaching resources for elementary educators",
    publisher: {
      "@type": "Organization",
      name: "Elementary State of Mind",
    },
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
        {/* LLM discovery */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Information" />
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="Elementary State of Mind Blog RSS Feed" />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fff9f1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
        <Script src="/section-motion.js?v=6" strategy="afterInteractive" />
      </body>
    </html>
  );
}