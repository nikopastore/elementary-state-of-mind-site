import type { Metadata } from "next";
import { DM_Serif_Display, Quicksand } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  metadataBase: new URL("https://elementary-state-of-mind.com"),
  title: "Elementary State of Mind | Teacher Resources & Digital Downloads",
  description: "Beautiful, engaging digital resources for elementary teachers. Lesson plans, worksheets, classroom decor, and more!",
  keywords: ["teacher resources", "elementary education", "digital downloads", "lesson plans", "classroom decor"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elementary-state-of-mind.com",
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
    url: "https://elementary-state-of-mind.com",
    logo: "https://elementary-state-of-mind.com/logo.png",
    description: "Beautiful, engaging digital resources for elementary teachers",
    sameAs: [
      "https://www.teacherspayteachers.com/store/elementary-state-of-mind",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: "https://elementary-state-of-mind.com",
    },
  };

  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${quicksand.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased bg-lavender font-body text-black min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}