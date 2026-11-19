import { products, type Product } from '@/lib/products';
import { testimonials } from '@/lib/testimonials';

export const SITE_URL = 'https://www.elementarystateofmind.com';
export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#dr-zoe-pastore`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PRICE_VALID_UNTIL = '2027-12-31';

export const SOCIAL_PROFILES = [
  'https://www.teacherspayteachers.com/store/elementary-state-of-mind',
  'https://www.instagram.com/elementarystateofmind/',
  'https://www.facebook.com/elementarystateofmind/',
  'https://www.tiktok.com/@elementarystateofmindd',
  'https://www.pinterest.com/elementarystateofmindd/',
  'https://open.spotify.com/playlist/5FoJvH0raHXq4MS3tUJEAw',
];

export const DISTRICT_AWARD = '2026 ASU Prep District Teacher of the Year';

export function getAuthorPersonEntity() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Dr. Zoe Pastore',
    givenName: 'Zoe',
    familyName: 'Pastore',
    alternateName: 'Zoe Glover',
    honorificPrefix: 'Dr.',
    honorificSuffix: 'Ed.D.',
    award: DISTRICT_AWARD,
    jobTitle: 'Sixth-Grade Transformational Teacher Leader',
    description:
      'Elementary educator, curriculum creator, and 2026 ASU Prep District Teacher of the Year holding an Ed.D. in Educational Leadership from USC Rossier School of Education.',
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/profile.png`,
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'ASU Preparatory Academy',
      url: 'https://asuprep.asu.edu/',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'University of Southern California — Rossier School of Education',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Arizona State University — Mary Lou Fulton Teachers College',
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'Doctor of Education (Ed.D.) in Educational Leadership',
        educationalLevel: 'Doctoral',
        recognizedBy: {
          '@type': 'CollegeOrUniversity',
          name: 'University of Southern California',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'Master of Education (M.Ed.) in Global Education',
        educationalLevel: 'Graduate',
        recognizedBy: {
          '@type': 'CollegeOrUniversity',
          name: 'Arizona State University',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'Bachelor of Arts in Elementary Education',
        educationalLevel: 'Undergraduate',
        recognizedBy: {
          '@type': 'CollegeOrUniversity',
          name: 'Arizona State University',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certificate',
        name: 'Arizona Standard Professional Elementary K-8 Teaching Credential',
        recognizedBy: {
          '@type': 'GovernmentOrganization',
          name: 'Arizona Department of Education',
        },
      },
    ],
    knowsAbout: [
      'Elementary ELA Instruction',
      'Project-Based Learning (PBL)',
      'Classroom Mock Trials',
      'OREO Opinion Writing',
      'CER Argumentative Writing Framework',
      'RACES Writing Strategy',
      'Novel Studies',
      'Student-Led Conferences',
      'Differentiated Instruction',
      'Graphic Organizers and Anchor Charts',
    ],
    sameAs: [
      'https://www.asuprepdigital.org/blog/meet-the-asu-prep-2026-teacher-of-the-year-finalists/',
      'https://asuprep.asu.edu/news/asu-prep-south-phoenix-k-6-celebrates-transformational-teacher-leaders/',
      ...SOCIAL_PROFILES,
    ],
  };
}

export function getOrganizationEntity() {
  return {
    '@type': ['EducationalOrganization', 'Organization'],
    '@id': ORG_ID,
    name: 'Elementary State of Mind',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 1200,
      height: 1200,
    },
    image: `${SITE_URL}/logo.png`,
    description:
      'Classroom-tested digital teaching resources for grades 3-8 elementary educators: novel studies, mock trials, writing frameworks (OREO, CER, RACES), anchor charts, and decor.',
    foundingDate: '2020',
    founder: { '@id': PERSON_ID },
    sameAs: SOCIAL_PROFILES,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${SITE_URL}/about`,
    },
  };
}

export function getWebSiteEntity() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Elementary State of Mind',
    url: SITE_URL,
    description:
      'Standards-aligned digital teaching resources, mock trial PBL units, writing graphic organizers, and teaching tips for grades 3-8 educators.',
    inLanguage: 'en-US',
    publisher: { '@id': ORG_ID },
    author: { '@id': PERSON_ID },
  };
}

export interface ProductEnrichment {
  gradeLevels: string;
  subject: string;
  learningResourceType: string;
  format: string;
  prepLevel: string;
  teaches: string[];
  highlights: string[];
  relatedBlogSlugs: string[];
  faqs: { question: string; answer: string }[];
}

const DEFAULT_HIGHLIGHTS_BY_CATEGORY: Record<Product['category'], string[]> = {
  bundle: [
    'Complete multi-part digital teaching bundle ready for immediate classroom use',
    'Structured student scaffolds, teacher guidance, and ready-to-print pages',
    'Designed by Dr. Zoe Pastore, Ed.D. for high engagement in grades 3-8',
  ],
  'lesson-plan': [
    'Low-prep lesson plan tested in real upper elementary classrooms',
    'Clear student directions and engaging collaborative classroom structure',
    'Instant digital download through Teachers Pay Teachers',
  ],
  worksheet: [
    'Print-friendly and digital-ready student pages for immediate classroom use',
    'Clear visual scaffolds to support independent and small-group writing',
    'Ideal for upper elementary ELA workshops, stations, and intervention',
  ],
  decor: [
    'Clean, inviting printable posters ready to frame or laminate for bulletin boards',
    'Low-prep classroom setup for back-to-school and year-round transitions',
    'Instant digital download in high-resolution printable format',
  ],
};

const PRODUCT_META_MAP: Record<string, Omit<ProductEnrichment, 'faqs'>> = {
  'space-case-complete': {
    gradeLevels: 'Grades 5–6',
    subject: 'ELA · Novel Study & PBL',
    learningResourceType: 'Novel Study Bundle & Mock Trial',
    format: 'Printable PDF & Google Slides',
    prepLevel: 'Low-Prep · Print & Go',
    teaches: [
      'Close Reading & Textual Evidence',
      'Claim, Evidence, Reasoning (CER)',
      'Argumentative Speaking & Debate',
      'CCSS ELA Reading Literature',
    ],
    highlights: [
      'Combines the full Space Case Mock Trial PBL unit with the end-of-book novel assessment',
      'Guides students from close reading of Stuart Gibbs’ Space Case to courtroom oral arguments',
      'Includes courtroom role materials, evidence packets, and standards-aligned evaluation',
    ],
    relatedBlogSlugs: [
      'turning-novel-study-into-mock-trial',
      'mock-trial-lesson-plan-novel-study',
    ],
  },
  'space-case-mock-trial': {
    gradeLevels: 'Grades 5–6',
    subject: 'ELA · Novel Study & Debate',
    learningResourceType: 'Mock Trial Project-Based Learning Unit',
    format: 'Printable PDF & Google Slides',
    prepLevel: 'Low-Prep · Print & Go',
    teaches: [
      'Claim, Evidence, Reasoning (CER)',
      'Citing Textual Evidence',
      'Public Speaking & Courtroom Debate',
      'CCSS ELA Speaking & Listening',
    ],
    highlights: [
      'Transforms Stuart Gibbs’ Space Case into a student-led courtroom drama',
      'Organized case files, evidence cards, and CER argument preparation templates',
      'Builds deep reading comprehension and persuasive speaking through collaborative play',
    ],
    relatedBlogSlugs: [
      'turning-novel-study-into-mock-trial',
      'mock-trial-lesson-plan-novel-study',
      'debate-activities-middle-school',
    ],
  },
  'any-text-debate': {
    gradeLevels: 'Grades 3–8',
    subject: 'ELA · Argument & Debate',
    learningResourceType: 'Lesson Plan & Debate Prep Pack',
    format: 'Printable PDF & Google Slides',
    prepLevel: 'Low-Prep · Any Text Compatible',
    teaches: [
      'CER (Claim, Evidence, Reasoning)',
      'OREO Opinion Structure',
      'RACES Text Evidence Framework',
      'Structured Classroom Debate',
    ],
    highlights: [
      'Works seamlessly with any fiction novel, nonfiction article, or primary source',
      'Supports CER, OREO, and RACES reasoning frameworks in one flexible toolkit',
      'Includes teacher implementation guide alongside printable and digital prep sheets',
    ],
    relatedBlogSlugs: [
      'debate-activities-middle-school',
      'opinion-writing-elementary-oreo-strategy',
    ],
  },
  'ela-anchor-charts': {
    gradeLevels: 'Grades 3–6',
    subject: 'English Language Arts',
    learningResourceType: 'Hand-Drawn Anchor Charts & Notebook Printables',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · Print & Display',
    teaches: [
      'Reading Comprehension Skills',
      'Interactive Notebook Reference',
      'ELA Academic Vocabulary',
    ],
    highlights: [
      'Includes 9 hand-drawn, student-friendly ELA anchor charts',
      'Sized for both classroom reference walls and student interactive notebooks',
      'Designed to make essential literacy concepts visual and memorable',
    ],
    relatedBlogSlugs: ['anchor-charts-ela-classroom'],
  },
  'oreo-opinion-writing': {
    gradeLevels: 'Grades 3–6',
    subject: 'ELA · Opinion Writing',
    learningResourceType: 'Writing Unit & Graphic Organizers',
    format: 'Printable PDF & Google Slides',
    prepLevel: 'Low-Prep · Differentiated',
    teaches: [
      'OREO Opinion Writing Strategy',
      'Opinion Statement & Supporting Reasons',
      'Examples, Explanations & Conclusions',
      'CCSS.ELA-LITERACY.W.3-6.1',
    ],
    highlights: [
      'Teaches Opinion, Reason, Example/Explanation, and Opinion restated step by step',
      'Differentiated graphic organizers to support emerging and confident writers in grades 3–6',
      'Structured prompts and planning pages that move students cleanly into final drafts',
    ],
    relatedBlogSlugs: [
      'opinion-writing-elementary-oreo-strategy',
      'anchor-charts-ela-classroom',
    ],
  },
  'kpop-demonhunters': {
    gradeLevels: 'Grades 2–6',
    subject: 'ELA · Music & Media Literacy',
    learningResourceType: 'Cross-Curricular Critical Thinking Unit',
    format: 'Printable PDF & Google Slides',
    prepLevel: 'Low-Prep · Print & Go',
    teaches: [
      'Media & Lyric Analysis',
      'Claim, Evidence, Reasoning (CER)',
      'Theme, Mood & Visual Storytelling',
    ],
    highlights: [
      'Pairs high-interest music and film scenes with standards-aligned critical thinking',
      'Includes scene analysis and song analysis pages with CER evidence prompts',
      'Connects student pop-culture interests directly to close reading and writing',
    ],
    relatedBlogSlugs: ['debate-activities-middle-school'],
  },
  'math-notes-fractions': {
    gradeLevels: 'Grades 5–6',
    subject: 'Mathematics · Fractions & Decimals',
    learningResourceType: '4-Square Math Anchor Charts & Practice',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · Print & Go',
    teaches: [
      'Fraction Operations & Equivalence',
      'Decimal Place Value & Operations',
      'Visual Math Modeling',
    ],
    highlights: [
      'Hand-drawn 4-square math anchor charts break multi-step concepts into clear visuals',
      'Pairs reference notes with targeted student practice pages for fractions and decimals',
      'Works for whole-group mini-lessons, interactive notebooks, and math intervention',
    ],
    relatedBlogSlugs: [
      'teaching-fractions-visually',
      'anchor-charts-ela-classroom',
    ],
  },
  'informative-essay-packet': {
    gradeLevels: 'Grades 4–6',
    subject: 'ELA · Informative Writing',
    learningResourceType: '5-Paragraph Essay Writing Packet',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · Complete Student Packet',
    teaches: [
      'Informative / Explanatory Essay Structure',
      'Tree Map Topic & Detail Organization',
      '5-Paragraph Essay Drafting & Rubrics',
    ],
    highlights: [
      'Complete student writing packet from initial brain dump through final essay draft',
      'Includes writing prompts, sentence starters, tree map organizer, outline, lined paper, and rubric',
      'Guides 4th–6th graders through clear topic sentences, evidence, and transitions',
    ],
    relatedBlogSlugs: ['informative-essay-graphic-organizer-guide'],
  },
  'opinion-essay-packet': {
    gradeLevels: 'Grades 4–6',
    subject: 'ELA · Opinion Writing',
    learningResourceType: '5-Paragraph Opinion Essay Packet',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · Complete Student Packet',
    teaches: [
      'Persuasive & Opinion Essay Writing',
      'Claim, Reasons & Supporting Evidence',
      'Structured 5-Paragraph Outlining',
    ],
    highlights: [
      'Includes opinion writing prompts, sentence starters, grading rubric, and full student packet',
      'Step-by-step sequence: brain dump page, tree map graphic organizer, essay outline, and lined paper',
      'Supports independent drafting and peer/teacher conferencing in grades 4–6',
    ],
    relatedBlogSlugs: [
      'opinion-writing-elementary-oreo-strategy',
      'informative-essay-graphic-organizer-guide',
    ],
  },
  'narrative-writing-packet': {
    gradeLevels: 'Grades 3–6',
    subject: 'ELA · Narrative Writing',
    learningResourceType: 'Narrative Writing Bundle & Organizers',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · Complete Student Packet',
    teaches: [
      'Story Elements & Plot Structure',
      'Beginning, Middle & End Sequencing',
      'Descriptive Narrative Drafting',
    ],
    highlights: [
      'Step-by-step graphic organizers tailored for beginning and intermediate-grade writers',
      'Includes narrative writing prompts, sentence starters, rubric, and varied planning pages',
      'Helps students organize characters, setting, conflict, and resolution before drafting',
    ],
    relatedBlogSlugs: ['narrative-writing-structure-tips'],
  },
  'article-a-week': {
    gradeLevels: 'Grades 4–6',
    subject: 'ELA · Nonfiction Reading & Science',
    learningResourceType: 'Informational Reading Comprehension Pack',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · 10 Weekly Articles',
    teaches: [
      'Informational Text Comprehension',
      'Main Idea & Key Details',
      'Environmental Science Literacy',
    ],
    highlights: [
      '10 engaging informational articles focused on endangered species',
      'Designed as a consistent 20–30 minute weekly independent reading routine',
      'Pairs high-interest science topics with standards-aligned comprehension questions',
    ],
    relatedBlogSlugs: ['endangered-species-reading-activities'],
  },
  'slc-guide': {
    gradeLevels: 'Grades 3–8',
    subject: 'Student Leadership & Conferences',
    learningResourceType: 'Student-Led Conference Toolkit',
    format: 'Printable PDF',
    prepLevel: 'Low-Prep · Teacher & Student Guides',
    teaches: [
      'Student Goal Reflection & Ownership',
      'Academic Portfolio Presentation',
      'Family-School Communication',
    ],
    highlights: [
      'Complete packet with student-led conference guide and step-by-step teacher prep materials',
      'Includes parent reflection sheet and family conference sign-in sheet',
      'Empowers students in grades 3–8 to lead meaningful conferences about their growth',
    ],
    relatedBlogSlugs: ['student-led-conferences-guide'],
  },
  friendsgiving: {
    gradeLevels: 'Grades 3–8',
    subject: 'Classroom Community & SEL',
    learningResourceType: 'Classroom Community Celebration Activity',
    format: 'Printable PDF',
    prepLevel: 'Low-Prep · Print & Celebrate',
    teaches: [
      'Gratitude & Reflection',
      'Classroom Community Building',
      'Speaking & Listening Toasts',
    ],
    highlights: [
      'Transforms classroom Friendsgiving into a structured reflection and gratitude celebration',
      'Includes table prompts and gratitude toast templates tested in real upper elementary rooms',
      'Builds belonging and meaningful discussion beyond typical holiday crafts',
    ],
    relatedBlogSlugs: ['holiday-classroom-activities-thanksgiving'],
  },
  'space-case-test': {
    gradeLevels: 'Grades 5–6',
    subject: 'ELA · Novel Study Assessment',
    learningResourceType: 'Summative Novel Study Assessment',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · Print & Grade',
    teaches: [
      'Reading Comprehension Evaluation',
      'Plot, Character & Inference Analysis',
      'Textual Evidence Verification',
    ],
    highlights: [
      'Ready-to-print, standards-aligned end-of-book assessment for Space Case by Stuart Gibbs',
      'Evaluates both literal comprehension and deeper critical thinking',
      'Pairs naturally with the Space Case Mock Trial PBL or standalone novel study',
    ],
    relatedBlogSlugs: [
      'turning-novel-study-into-mock-trial',
      'mock-trial-lesson-plan-novel-study',
    ],
  },
  '67th-day': {
    gradeLevels: 'Grades 5–7',
    subject: 'Cross-Curricular · ELA & Math',
    learningResourceType: 'Mini-Bundle Celebration Pack',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · Print & Go',
    teaches: [
      '67-Word Micro-Story Writing',
      '6–7 Minute Math Fluency',
      'Classroom Culture & Celebration',
    ],
    highlights: [
      'Includes 67 Word Stories writing challenge, 6–7 Minute Math activity, and student certificates',
      'Low-prep, high-engagement cross-curricular mini-bundle for upper elementary and 7th grade',
      'Backed by 5-star teacher reviews for energizing classrooms on day 67',
    ],
    relatedBlogSlugs: ['what-is-an-elementary-state-of-mind'],
  },
  'opinion-tree-map': {
    gradeLevels: 'Grades 3–6',
    subject: 'ELA · Opinion Writing',
    learningResourceType: 'Writing Graphic Organizer',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · Print & Go',
    teaches: [
      'Opinion Statement Planning',
      'Reason & Detail Structuring',
      'Pre-Writing Organization',
    ],
    highlights: [
      'Visual tree map layout maps out opinion statement, core reasons, and supporting details',
      'Helps students organize persuasive ideas logically before drafting paragraphs',
    ],
    relatedBlogSlugs: ['opinion-writing-elementary-oreo-strategy'],
  },
  'story-elements': {
    gradeLevels: 'Grades 3–6',
    subject: 'ELA · Reading & Narrative Writing',
    learningResourceType: 'Story Elements Graphic Organizer',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · Print & Go',
    teaches: [
      'Characters & Setting',
      'Conflict, Events & Resolution',
      'Narrative Sequencing',
    ],
    highlights: [
      'Dedicated spaces for characters, setting, problem, key events, and solution',
      'Supports both reading comprehension retells and narrative pre-writing',
    ],
    relatedBlogSlugs: ['narrative-writing-structure-tips'],
  },
  'informative-tree-map': {
    gradeLevels: 'Grades 3–6',
    subject: 'ELA · Informative Writing',
    learningResourceType: 'Writing Graphic Organizer',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · Print & Go',
    teaches: [
      'Topic & Main Idea Organization',
      'Supporting Facts & Details',
      'Informative Essay Pre-Writing',
    ],
    highlights: [
      'Structured tree map organizer for topic, main ideas, and supporting evidence',
      'Helps students separate main sections cleanly before drafting informative essays',
    ],
    relatedBlogSlugs: ['informative-essay-graphic-organizer-guide'],
  },
  'seven-minute-strategy': {
    gradeLevels: 'Educators · PLC & Staff PD',
    subject: 'Instructional Coaching & Collaboration',
    learningResourceType: 'Professional Learning Share-Out Template',
    format: 'Digital & Printable Template',
    prepLevel: 'Low-Prep · Staff Meeting Ready',
    teaches: [
      'Instructional Strategy Sharing',
      'Focused 7-Minute PLC Protocol',
      'Collaborative Teacher Leadership',
    ],
    highlights: [
      'Structured template built for sharing classroom strategies in 7 minutes during staff meetings or PLCs',
      'Keeps professional learning focused, actionable, and respectful of teacher time',
    ],
    relatedBlogSlugs: ['what-is-an-elementary-state-of-mind'],
  },
  'student-work-posters': {
    gradeLevels: 'Grades K–8',
    subject: 'Classroom Decor & Bulletin Boards',
    learningResourceType: 'Printable Bulletin Board Posters',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · Print & Hang',
    teaches: [
      'Bulletin Board Setup',
      'Back-to-School Classroom Readiness',
    ],
    highlights: [
      'Clean printable placeholder posters for student work displays during transitions or back-to-school',
      'Saves setup time while keeping hallway and classroom bulletin boards intentional',
    ],
    relatedBlogSlugs: ['anchor-charts-ela-classroom'],
  },
  'plot-diagram': {
    gradeLevels: 'Grades 3–6',
    subject: 'ELA · Reading & Narrative Writing',
    learningResourceType: 'Plot Structure Graphic Organizer',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · Print & Go',
    teaches: [
      'Exposition & Rising Action',
      'Climax, Falling Action & Resolution',
      'Narrative Arc Mapping',
    ],
    highlights: [
      'Visual plot mountain covers exposition, rising action, climax, falling action, and resolution',
      'Works for novel study analysis as well as narrative story planning',
    ],
    relatedBlogSlugs: ['narrative-writing-structure-tips'],
  },
  'plant-posters': {
    gradeLevels: 'Grades K–8',
    subject: 'Classroom Decor · Botanical Theme',
    learningResourceType: 'Printable Bulletin Board Posters',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · Print & Hang',
    teaches: [
      'Botanical Classroom Decor',
      'Bulletin Board Transitions',
    ],
    highlights: [
      'Plant-themed printable posters designed to hold space beautifully until student work goes up',
      'Ideal for beginning-of-year prep and unit transitions throughout the school year',
    ],
    relatedBlogSlugs: ['anchor-charts-ela-classroom'],
  },
  'letter-to-teacher': {
    gradeLevels: 'Grades 2–6',
    subject: 'ELA · Reflection & SEL',
    learningResourceType: 'FREE Printable & Digital Letter Template',
    format: 'Printable PDF & Google Slides',
    prepLevel: 'Zero-Prep · FREE Download',
    teaches: [
      'Friendly Letter Formatting',
      'Reflective Writing & Sentence Starters',
      'Classroom Relationship Building',
    ],
    highlights: [
      '100% FREE printable and digital friendly-letter writing activity',
      'Includes idea prompts and gentle writing scaffolds praised by multiple 5-star teacher reviewers',
      'Flexible for end-of-year gratitude, back-to-school introductions, or teacher appreciation',
    ],
    relatedBlogSlugs: ['holiday-classroom-activities-thanksgiving'],
  },
  'goal-setting-bingo': {
    gradeLevels: 'Grades 3–8',
    subject: 'SEL & Goal Setting',
    learningResourceType: 'FREE Printable BINGO & Slideshow',
    format: 'Printable PDF & Google Slides',
    prepLevel: 'Zero-Prep · FREE Download',
    teaches: [
      'Student Goal Setting & Reflection',
      'Growth Mindset Habits',
      'Classroom Community Engagement',
    ],
    highlights: [
      '100% FREE printable BINGO card paired with an interactive Google Slides presentation',
      'Makes academic and personal goal-setting playful and memorable at the start of the year',
    ],
    relatedBlogSlugs: ['student-led-conferences-guide'],
  },
  'opinion-brain-dump': {
    gradeLevels: 'Grades 3–6',
    subject: 'ELA · Opinion Writing',
    learningResourceType: 'FREE Brainstorming Graphic Organizer',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · FREE Download',
    teaches: [
      'Opinion Topic Ideation',
      'Pre-Writing Fluency',
    ],
    highlights: [
      '100% FREE brainstorming page giving students low-stakes space to capture opinion ideas before outlining',
      'Pairs naturally with the Opinion Essay Tree Map and OREO Opinion Writing resources',
    ],
    relatedBlogSlugs: ['opinion-writing-elementary-oreo-strategy'],
  },
  'essay-brain-dump': {
    gradeLevels: 'Grades 3–6',
    subject: 'ELA · Essay Writing',
    learningResourceType: 'FREE Essay Brainstorming Organizer',
    format: 'Printable PDF',
    prepLevel: 'Zero-Prep · FREE Download',
    teaches: [
      'Pre-Writing Brainstorming',
      'Idea Generation for Any Essay',
    ],
    highlights: [
      '100% FREE general essay brain dump template usable before informative, opinion, or narrative drafts',
      'Helps reluctant writers get ideas onto paper before structuring paragraphs',
    ],
    relatedBlogSlugs: ['informative-essay-graphic-organizer-guide'],
  },
};

export function getProductMeta(product: Product): ProductEnrichment {
  const base = PRODUCT_META_MAP[product.id] ?? {
    gradeLevels: 'Grades 3–8',
    subject: 'Elementary Education',
    learningResourceType: 'Digital Teaching Resource',
    format: 'Printable PDF & Digital',
    prepLevel: 'Low-Prep · Print & Go',
    teaches: ['Elementary ELA & Critical Thinking'],
    highlights: DEFAULT_HIGHLIGHTS_BY_CATEGORY[product.category],
    relatedBlogSlugs: ['what-is-an-elementary-state-of-mind'],
  };

  const free = Boolean(product.isFree || product.price === 0);
  const priceLabel = free ? 'free' : `$${(product.price / 100).toFixed(2)}`;

  return {
    ...base,
    faqs: [
      {
        question: `What grade levels is ${product.name} best suited for?`,
        answer: `${product.name} is designed primarily for ${base.gradeLevels} (${base.subject}) and includes clear student-friendly scaffolds so teachers can differentiate across ability levels.`,
      },
      {
        question: `How do I download ${product.name} and what format is included?`,
        answer: `This resource is available as an instant digital download (${base.format}) for ${priceLabel} through Dr. Zoe Pastore's official Teachers Pay Teachers storefront. After checkout, you can print pages or assign slides immediately.`,
      },
      {
        question: `Can I use ${product.name} in homeschool, tutoring, or small groups?`,
        answer: `Yes! While classroom-tested in grades 3–8 elementary classrooms, all Elementary State of Mind resources adapt smoothly for homeschool families, intervention groups, and tutoring sessions.`,
      },
    ],
  };
}

export function getReviewsForProduct(productId: string) {
  return testimonials.filter((t) => t.productId === productId);
}

export function getRelatedProducts(current: Product, limit = 3): Product[] {
  const sameCategory = products.filter(
    (p) => p.id !== current.id && p.category === current.category,
  );
  const others = products.filter(
    (p) => p.id !== current.id && p.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function buildProductSchema(product: Product) {
  const free = Boolean(product.isFree || product.price === 0);
  const priceValue = free ? '0.00' : (product.price / 100).toFixed(2);
  const meta = getProductMeta(product);
  const matchingReviews = getReviewsForProduct(product.id);
  const productUrl = `${SITE_URL}/shop/${product.id}`;

  const schema: Record<string, unknown> = {
    '@type': ['Product', 'LearningResource'],
    '@id': `${productUrl}#product`,
    name: product.name,
    description: product.description,
    image: `${SITE_URL}${product.image}`,
    url: productUrl,
    sku: product.id,
    brand: { '@id': ORG_ID },
    author: { '@id': PERSON_ID },
    educationalLevel: meta.gradeLevels,
    learningResourceType: meta.learningResourceType,
    teaches: meta.teaches,
    inLanguage: 'en-US',
    isAccessibleForFree: free,
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'Teacher',
      audienceType: 'Elementary Educators',
    },
    offers: {
      '@type': 'Offer',
      url: product.tptUrl,
      price: priceValue,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: PRICE_VALID_UNTIL,
      seller: { '@id': ORG_ID },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0.00',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
        merchantReturnDays: 0,
      },
    },
  };

  if (matchingReviews.length > 0) {
    schema.review = matchingReviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.reviewer,
      },
      datePublished: review.isoDate,
      reviewBody: review.review,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    }));

    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: 5,
      worstRating: 1,
      reviewCount: matchingReviews.length,
    };
  }

  return schema;
}
