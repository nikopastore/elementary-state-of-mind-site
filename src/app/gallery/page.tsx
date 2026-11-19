import { Metadata } from 'next';
import GalleryPageClient from './GalleryPageClient';
import { galleryPhotos } from '@/lib/galleryPhotos';
import { ORG_ID, PERSON_ID, SITE_URL, WEBSITE_ID } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Classroom Photo Book — Products in Action',
  description:
    'Browse 19 real classroom photos inside the Elementary State of Mind photo book: Space Case mock trials, evidence packets, Friendsgiving tables, and music-driven CER analysis.',
  keywords: [
    'classroom photos',
    'teacher resources in action',
    'Space Case mock trial photos',
    'student engagement',
    'elementary classroom',
    'project-based learning',
  ],
  openGraph: {
    title: 'Classroom Photo Book — Products in Action',
    description:
      'See Elementary State of Mind teaching resources come to life on real student desks.',
    type: 'website',
    url: `${SITE_URL}/gallery`,
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Elementary State of Mind Classroom Photo Book',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Classroom Photo Book — Products in Action',
    description:
      'See Elementary State of Mind teaching resources come to life in real classrooms.',
    images: [`${SITE_URL}/logo.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/gallery`,
  },
};

export default function GalleryPage() {
  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${SITE_URL}/gallery#imagegallery`,
    name: 'Products in Action — Elementary State of Mind Classroom Photo Book',
    description:
      'Interactive photo anthology of Elementary State of Mind teaching resources being used in real elementary classrooms.',
    url: `${SITE_URL}/gallery`,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    creator: { '@id': PERSON_ID },
    associatedMedia: galleryPhotos.map((photo) => ({
      '@type': 'ImageObject',
      contentUrl: `${SITE_URL}${photo.image}`,
      url: `${SITE_URL}/gallery`,
      name: photo.caption || photo.alt,
      description: photo.alt,
      caption: photo.caption || photo.alt,
      creator: { '@id': PERSON_ID },
      about: { '@id': `${SITE_URL}/shop/${photo.productId}#product` },
    })),
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
