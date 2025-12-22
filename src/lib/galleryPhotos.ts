export type GalleryPhoto = {
  id: string;
  image: string;
  alt: string;
  productId: string; // Links to product in products.ts
  caption?: string;
};

export const galleryPhotos: GalleryPhoto[] = [
  // Space Case Mock Trial images
  {
    id: 'space-case-1',
    image: '/gallery/IMG_6701 2_SpaceCaseMockTrial.jpg',
    alt: 'Students engaged in Space Case mock trial activity',
    productId: 'space-case-mock-trial',
    caption: 'Mock trial in action',
  },
  {
    id: 'space-case-2',
    image: '/gallery/IMG_6707 2_SpaceCaseMockTrial.jpg',
    alt: 'Space Case mock trial classroom scene',
    productId: 'space-case-mock-trial',
    caption: 'Courtroom comes to life',
  },
  {
    id: 'space-case-3',
    image: '/gallery/IMG_6708 2_SpaceCaseMockTrial.jpg',
    alt: 'Students participating in Space Case mock trial',
    productId: 'space-case-mock-trial',
    caption: 'Students as lawyers',
  },
  {
    id: 'space-case-4',
    image: '/gallery/IMG_6710 2_SpaceCaseMockTrial.jpg',
    alt: 'Space Case mock trial activity in classroom',
    productId: 'space-case-mock-trial',
    caption: 'Engaging with the text',
  },
  {
    id: 'space-case-5',
    image: '/gallery/IMG_6712 2_SpaceCaseMockTrial.jpg',
    alt: 'Space Case mock trial student work',
    productId: 'space-case-mock-trial',
    caption: 'Building critical thinking',
  },
  {
    id: 'space-case-6',
    image: '/gallery/IMG_7484 2_SpaceCaseMockTrial.jpg',
    alt: 'Space Case mock trial presentation',
    productId: 'space-case-mock-trial',
    caption: 'Presenting evidence',
  },
  {
    id: 'space-case-7',
    image: '/gallery/IMG_7485 2_SpaceCaseMockTrial.jpg',
    alt: 'Students working on Space Case mock trial',
    productId: 'space-case-mock-trial',
    caption: 'Collaborative learning',
  },
  {
    id: 'space-case-8',
    image: '/gallery/IMG_7492_SpaceCaseMockTrial.jpg',
    alt: 'Space Case mock trial classroom activity',
    productId: 'space-case-mock-trial',
    caption: 'Deep reading comprehension',
  },
  {
    id: 'space-case-9',
    image: '/gallery/IMG_7495 2_SpaceCaseMockTrial.jpg',
    alt: 'Space Case mock trial student engagement',
    productId: 'space-case-mock-trial',
    caption: 'Every student engaged',
  },
  {
    id: 'space-case-10',
    image: '/gallery/IMG_7496_SpaceCaseMockTrial.jpg',
    alt: 'Space Case mock trial learning experience',
    productId: 'space-case-mock-trial',
    caption: 'Memorable learning',
  },
  {
    id: 'space-case-11',
    image: '/gallery/IMG_7529_SpaceCaseMockTrial.jpg',
    alt: 'Space Case mock trial classroom setup',
    productId: 'space-case-mock-trial',
    caption: 'Ready for trial',
  },
  {
    id: 'space-case-12',
    image: '/gallery/IMG_7533_SpaceCaseMockTrial.jpg',
    alt: 'Students enjoying Space Case mock trial',
    productId: 'space-case-mock-trial',
    caption: 'Learning through play',
  },

  // Friendsgiving images
  {
    id: 'friendsgiving-1',
    image: '/gallery/IMG_6875 3_Friendsgiving.jpg',
    alt: 'Friendsgiving classroom celebration',
    productId: 'friendsgiving',
    caption: 'Building classroom community',
  },
  {
    id: 'friendsgiving-2',
    image: '/gallery/IMG_6887 2_Friendsgiving.jpg',
    alt: 'Students celebrating Friendsgiving together',
    productId: 'friendsgiving',
    caption: 'Gratitude and friendship',
  },

  // Behind the Beat: KPop DemonHunters images
  {
    id: 'kpop-1',
    image: '/gallery/IMG_6924_BehindTheBeat.jpg',
    alt: 'Students engaging with Behind the Beat activity',
    productId: 'kpop-demonhunters',
    caption: 'Music meets learning',
  },
  {
    id: 'kpop-2',
    image: '/gallery/IMG_6926_BehindTheBeat.jpg',
    alt: 'Behind the Beat classroom activity',
    productId: 'kpop-demonhunters',
    caption: 'Critical thinking through music',
  },
  {
    id: 'kpop-3',
    image: '/gallery/IMG_6930_BehindTheBeat.jpg',
    alt: 'Students working on Behind the Beat project',
    productId: 'kpop-demonhunters',
    caption: 'High-energy learning',
  },
  {
    id: 'kpop-4',
    image: '/gallery/IMG_6934_BehindTheBeat.jpg',
    alt: 'Behind the Beat student engagement',
    productId: 'kpop-demonhunters',
    caption: 'Connecting culture to curriculum',
  },
  {
    id: 'kpop-5',
    image: '/gallery/IMG_6936_BehindTheBeat.jpg',
    alt: 'Behind the Beat learning in action',
    productId: 'kpop-demonhunters',
    caption: 'Making learning relevant',
  },
];
