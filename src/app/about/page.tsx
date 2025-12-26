import { Metadata } from 'next';
import AboutPageClient, { faqs } from './AboutPageClient';

export const metadata: Metadata = {
  title: "Meet the Teacher | Elementary State of Mind",
  description: "Meet the educator behind Elementary State of Mind. A dedicated elementary teacher with a Doctorate in Educational Leadership from USC, sharing resources and insights for engaging education.",
  keywords: ["elementary teacher", "teacher resources", "educational leadership", "USC education", "Arizona State University", "classroom teacher", "ELA teacher"],
  openGraph: {
    title: "Meet the Teacher | Elementary State of Mind",
    description: "Meet the educator behind Elementary State of Mind – a dedicated elementary teacher passionate about innovative, student-centered learning.",
    type: "profile",
    url: "https://elementary-state-of-mind.com/about",
    images: [
      {
        url: "https://elementary-state-of-mind.com/profile.png",
        width: 800,
        height: 800,
        alt: "Elementary State of Mind Teacher",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Meet the Teacher | Elementary State of Mind",
    description: "Meet the educator behind Elementary State of Mind – passionate about innovative, student-centered learning.",
    images: ["https://elementary-state-of-mind.com/profile.png"],
  },
  alternates: {
    canonical: "https://elementary-state-of-mind.com/about",
  },
};

export default function AboutPage() {
  // Person Schema for the teacher
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Elementary State of Mind",
    jobTitle: "Transformational Teacher Leader",
    worksFor: {
      "@type": "EducationalOrganization",
      name: "ASU Preparatory Academy",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Southern California",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Arizona State University",
      },
    ],
    description: "Elementary teacher and educational leader specializing in innovative, student-centered learning experiences.",
    url: "https://elementary-state-of-mind.com/about",
    sameAs: [
      "https://www.teacherspayteachers.com/store/elementary-state-of-mind",
      "https://www.instagram.com/elementarystateofmind/",
      "https://www.facebook.com/elementarystateofmind/",
      "https://www.tiktok.com/@elementarystateofmindd",
      "https://www.pinterest.com/elementarystateofmindd/",
    ],
  };

  // FAQ Schema for rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Educational Credentials Schema
  const credentialsSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Elementary State of Mind",
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Doctor of Education (Ed.D.) in Educational Leadership",
        educationalLevel: "Doctoral",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "University of Southern California",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Master of Education (M.Ed.) in Global Education",
        educationalLevel: "Graduate",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "Arizona State University",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Bachelor of Arts in Elementary Education",
        educationalLevel: "Undergraduate",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "Arizona State University",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: "Arizona Standard Professional Elementary K-8 Teaching Credential",
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: "Arizona Department of Education",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialsSchema) }}
      />
      <AboutPageClient />
    </>
  );
}
