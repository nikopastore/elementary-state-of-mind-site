export type Testimonial = {
  id: string;
  reviewer: string;
  rating: 5;
  review: string;
  product: string;
  productId?: string;
  date: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 'review-1',
    reviewer: 'Olivia G.',
    rating: 5,
    review: 'My students loved doing this on the 67th day of school!',
    product: '67th Day of School Activities',
    productId: '67th-day-activities',
    date: 'December 2025',
  },
  {
    id: 'review-2',
    reviewer: 'Kaitlyn M.',
    rating: 5,
    review: 'This was a great resource in preparing for opinion writing.',
    product: 'Opinion 5 Paragraph Essay Writing Packet',
    productId: 'opinion-essay-packet',
    date: 'June 2025',
  },
  {
    id: 'review-3',
    reviewer: 'Brettany S.',
    rating: 5,
    review: 'Loved this resource! It was a great way to introduce narrative writing.',
    product: 'Narrative Writing Packet',
    productId: 'narrative-writing-packet',
    date: 'December 2025',
  },
  {
    id: 'review-4',
    reviewer: 'Melissa S.',
    rating: 5,
    review: 'My students liked the suggested ideas of things to include in their letters to their third grade teacher.',
    product: 'Letter to my Teacher',
    productId: 'letter-to-teacher',
    date: 'May 2025',
  },
  {
    id: 'review-5',
    reviewer: 'Elizabeth S.',
    rating: 5,
    review: 'Perfect for the end of the year! It was a useful activity that they enjoyed.',
    product: 'Letter to my Teacher',
    productId: 'letter-to-teacher',
    date: 'August 2023',
  },
  {
    id: 'review-6',
    reviewer: 'Rhonda O.',
    rating: 5,
    review: 'These ideas of what to write about helped my students. Without sentence frames or starters, writing is very difficult to come up with ideas. Thank you.',
    product: 'Letter to my Teacher',
    productId: 'letter-to-teacher',
    date: 'July 2023',
  },
  {
    id: 'review-7',
    reviewer: 'Lynn G.',
    rating: 5,
    review: 'I found this to be an awesome addition to my teaching resources. Thank you.',
    product: 'Letter to my Teacher',
    productId: 'letter-to-teacher',
    date: 'October 2022',
  },
];
