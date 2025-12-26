import { Metadata } from 'next';
import GalleryPageClient from './GalleryPageClient';

export const metadata: Metadata = {
  title: "Products in Action | Elementary State of Mind",
  description: "See Elementary State of Mind resources in action! Browse photos of students engaging with mock trials, writing activities, and classroom projects in real elementary classrooms.",
  keywords: ["classroom photos", "teacher resources in action", "student engagement", "elementary classroom", "mock trial photos", "project-based learning"],
  openGraph: {
    title: "Products in Action | Elementary State of Mind",
    description: "See our teaching resources come to life in real elementary classrooms.",
    type: "website",
    url: "https://elementary-state-of-mind.com/gallery",
    images: [
      {
        url: "https://elementary-state-of-mind.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Elementary State of Mind Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products in Action | Elementary State of Mind",
    description: "See our teaching resources come to life in real elementary classrooms.",
    images: ["https://elementary-state-of-mind.com/logo.png"],
  },
  alternates: {
    canonical: "https://elementary-state-of-mind.com/gallery",
  },
};

export default function GalleryPage() {
  // ImageGallery Schema
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Products in Action - Elementary State of Mind",
    description: "Photos of Elementary State of Mind teaching resources being used in real elementary classrooms.",
    url: "https://elementary-state-of-mind.com/gallery",
    publisher: {
      "@type": "Organization",
      name: "Elementary State of Mind",
      url: "https://elementary-state-of-mind.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      <GalleryPageClient />
    </>
  );
}
