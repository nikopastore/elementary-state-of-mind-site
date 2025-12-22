export type GalleryPhoto = {
  id: string;
  image: string;
  alt: string;
  productId: string; // Links to product in products.ts
  caption?: string;
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'space-case-classroom-1',
    image: '/gallery/classroom/space-case-trial.jpg',
    alt: 'Students engaged in Space Case mock trial activity',
    productId: 'space-case-mock-trial',
    caption: 'Mock trial in action!',
  },
  {
    id: 'oreo-writing-samples',
    image: '/gallery/classroom/oreo-writing-work.jpg',
    alt: 'Student OREO opinion writing samples',
    productId: 'oreo-opinion-writing',
    caption: 'Student opinion writing examples',
  },
  {
    id: 'anchor-charts-display',
    image: '/gallery/classroom/ela-anchor-charts.jpg',
    alt: 'ELA anchor charts displayed in classroom',
    productId: 'ela-anchor-charts',
    caption: 'Anchor charts on display',
  },
  {
    id: 'debate-prep-classroom',
    image: '/gallery/classroom/debate-prep.jpg',
    alt: 'Students using debate prep tool',
    productId: 'any-text-debate',
    caption: 'Debate prep in action',
  },
  {
    id: 'math-notes-student-work',
    image: '/gallery/classroom/math-notes.jpg',
    alt: 'Student work with fraction math notes',
    productId: 'math-notes-fractions',
    caption: 'Math notes helping students understand fractions',
  },
  {
    id: 'narrative-writing-progress',
    image: '/gallery/classroom/narrative-writing.jpg',
    alt: 'Student narrative writing with graphic organizers',
    productId: 'narrative-writing-packet',
    caption: 'Narrative writing process',
  },
  {
    id: 'article-week-reading',
    image: '/gallery/classroom/article-reading.jpg',
    alt: 'Students reading article of the week',
    productId: 'article-a-week',
    caption: 'Weekly reading routine',
  },
  {
    id: 'friendsgiving-celebration',
    image: '/gallery/classroom/friendsgiving.jpg',
    alt: 'Friendsgiving classroom celebration',
    productId: 'friendsgiving',
    caption: 'Building classroom community',
  },
];
