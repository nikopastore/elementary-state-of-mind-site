import type { Metadata } from "next";
import { DM_Serif_Display, Quicksand } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Breadcrumbs from "@/components/Breadcrumbs";
import { testimonials } from "@/lib/testimonials";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elementarystateofmind.com"),
  title: "Elementary State of Mind | Teacher Resources & Digital Downloads",
  description: "Beautiful, engaging digital resources for elementary teachers. Lesson plans, worksheets, classroom decor, and more!",
  keywords: ["teacher resources", "elementary education", "digital downloads", "lesson plans", "classroom decor"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elementarystateofmind.com",
    siteName: "Elementary State of Mind",
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
    canonical: "https://elementarystateofmind.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization Schema for SEO with AggregateRating
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Elementary State of Mind",
    url: "https://elementarystateofmind.com",
    logo: "https://elementarystateofmind.com/logo.png",
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
      url: "https://elementarystateofmind.com",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.95",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "43",
      reviewCount: "43",
    },
  };

  // WebSite schema for sitelinks searchbox
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Elementary State of Mind",
    url: "https://elementarystateofmind.com",
    description: "Digital teaching resources for elementary educators",
    publisher: {
      "@type": "Organization",
      name: "Elementary State of Mind",
    },
  };

  // Review schema for individual reviews
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Elementary State of Mind",
    url: "https://elementarystateofmind.com",
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.reviewer,
      },
      datePublished: t.date,
      reviewBody: t.review,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
      itemReviewed: {
        "@type": "Product",
        name: t.product,
      },
    })),
  };

  // Speakable schema for voice search optimization
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Elementary State of Mind - Teaching Resources",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".description"],
    },
    url: "https://elementarystateofmind.com",
  };

  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${quicksand.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        {/* Preconnect hints for performance */}
        <link rel="preconnect" href="https://www.teacherspayteachers.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* LLM discovery */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Information" />
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="Elementary State of Mind Blog RSS Feed" />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#9B7EBD" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
        />
      </head>
      <body className="antialiased bg-lavender font-body text-black min-h-screen flex flex-col">
        <Navigation />
        <Breadcrumbs />
        <main className="flex-grow">
          {children}
        </main>
        <TestimonialsCarousel />
        <Footer />
      </body>
    </html>
  );
}