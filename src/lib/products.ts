export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // Price in cents
  category: 'lesson-plan' | 'worksheet' | 'decor' | 'bundle';
  image: string; // Path to product image
  tptUrl?: string; // Link to TPT product page
};

// TPT Store URL
export const TPT_STORE_URL = 'https://www.teacherspayteachers.com/store/elementary-state-of-mind';

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Morning Meeting Slides',
    description: 'Engaging slides for your daily morning meeting routine.',
    price: 499,
    category: 'lesson-plan',
    image: '/placeholder-product.jpg',
    tptUrl: TPT_STORE_URL,
  },
  {
    id: 'prod-002',
    name: 'Alphabet Flash Cards',
    description: 'Printable flash cards to help students learn the alphabet.',
    price: 299,
    category: 'worksheet',
    image: '/placeholder-product.jpg',
    tptUrl: TPT_STORE_URL,
  },
  {
    id: 'prod-003',
    name: 'Classroom Calendar Set',
    description: 'A complete set for your classroom calendar, including dates, months, and special events.',
    price: 599,
    category: 'decor',
    image: '/placeholder-product.jpg',
    tptUrl: TPT_STORE_URL,
  },
  {
    id: 'prod-004',
    name: 'Math Centers Bundle',
    description: 'A comprehensive bundle of activities for various math centers.',
    price: 1299,
    category: 'bundle',
    image: '/placeholder-product.jpg',
    tptUrl: TPT_STORE_URL,
  },
  {
    id: 'prod-005',
    name: 'Reading Comprehension Pack',
    description: 'Worksheets and activities to improve reading comprehension skills.',
    price: 399,
    category: 'worksheet',
    image: '/placeholder-product.jpg',
    tptUrl: TPT_STORE_URL,
  },
  {
    id: 'prod-006',
    name: 'Welcome Door Signs',
    description: 'Decorate your classroom door with these welcoming signs.',
    price: 249,
    category: 'decor',
    image: '/placeholder-product.jpg',
    tptUrl: TPT_STORE_URL,
  },
];
