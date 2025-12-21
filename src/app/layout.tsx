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
  title: "Elementary State of Mind | Teacher Resources & Digital Downloads",
  description: "Beautiful, engaging digital resources for elementary teachers. Lesson plans, worksheets, classroom decor, and more!",
  keywords: ["teacher resources", "elementary education", "digital downloads", "lesson plans", "classroom decor"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${quicksand.variable}`}>
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