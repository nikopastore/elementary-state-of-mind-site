import { Metadata } from 'next';
import AboutPageClient, { districtTeacherAward } from './AboutPageClient';
import { faqs } from '@/lib/faqs';
import {
  PERSON_ID,
  SITE_URL,
  WEBSITE_ID,
  getAuthorPersonEntity,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Meet Dr. Zoe Pastore, Ed.D. — 2026 Teacher of the Year',
  description: `Meet Dr. Zoe Pastore, Ed.D. (USC Rossier), the ${districtTeacherAward} and sixth-grade Transformational Teacher Leader behind Elementary State of Mind.`,
  keywords: [
    'Dr. Zoe Pastore',
    'Zoe Pastore Ed.D.',
    '2026 ASU Prep District Teacher of the Year',
    'elementary teacher',
    'USC Rossier School of Education',
    'Arizona State University',
    'project-based learning',
    'ELA teacher',
  ],
  openGraph: {
    title: 'Meet Dr. Zoe Pastore, Ed.D. — 2026 Teacher of the Year',
    description: `Meet Dr. Zoe Pastore, Ed.D., ${districtTeacherAward} and creator of Elementary State of Mind teaching resources.`,
    type: 'profile',
    url: `${SITE_URL}/about`,
    images: [
      {
        url: `${SITE_URL}/profile.png`,
        width: 800,
        height: 800,
        alt: 'Dr. Zoe Pastore, Ed.D.',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Meet Dr. Zoe Pastore, Ed.D. — 2026 Teacher of the Year',
    description: `Meet Dr. Zoe Pastore, Ed.D., ${districtTeacherAward} and creator of Elementary State of Mind.`,
    images: [`${SITE_URL}/profile.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  const aboutGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      getAuthorPersonEntity(),
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/about#profilepage`,
        url: `${SITE_URL}/about`,
        name: 'Meet Dr. Zoe Pastore, Ed.D. — Elementary State of Mind',
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        inLanguage: 'en-US',
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/about#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutGraph) }}
      />
      <AboutPageClient />
    </>
  );
}
