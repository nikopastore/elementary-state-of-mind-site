export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
  category: 'classroom' | 'tips' | 'resources' | 'personal';
};

export const posts: Post[] = [
  {
    slug: 'welcome-to-my-blog',
    title: 'Welcome to My Blog!',
    excerpt: 'I\'m so excited to share my teaching journey with you! Here you\'ll find classroom tips, resource recommendations, and stories from my elementary classroom.',
    content: `
# Welcome to My Blog!

I'm so excited to finally launch this blog and share my teaching journey with you!

## What You'll Find Here

This space is dedicated to all things elementary education. I'll be sharing:

- **Classroom Tips** - Strategies and ideas that have worked in my classroom
- **Resource Spotlights** - Deep dives into my favorite teaching resources
- **Personal Reflections** - Stories and lessons learned along the way
- **Seasonal Ideas** - Activities and projects for different times of the year

## Why I Started This Blog

After years of teaching, I've accumulated so many ideas, lessons learned, and resources that I wanted to share with fellow educators. Whether you're a new teacher looking for guidance or a veteran seeking fresh ideas, I hope you'll find something helpful here.

## Stay Connected

Make sure to follow me on social media for daily updates and quick tips. I love connecting with other educators!

Thank you for being here. I can't wait to share this journey with you!

*Happy Teaching!*
    `.trim(),
    date: '2024-12-21',
    category: 'personal',
  },
];
