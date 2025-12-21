# Elementary State of Mind - Design Document

## Overview
Portfolio and digital storefront for a school teacher selling digital resources.

**Domain:** elementarystateofmind.com
**Hosting:** Vercel
**Theme:** "Apple & Oak" - Teacher-Cute Aesthetic

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- Lucide React (icons)
- Stripe Checkout

## Color Palette
| Name | Hex | Usage |
|------|-----|-------|
| Sage Green | #B2AC88 | Primary buttons, accents, nav |
| Soft Cream | #FFFDD0 | Backgrounds |
| Terracotta | #E2725B | CTAs, price tags, hover states |
| Warm White | #FEFEF9 | Card backgrounds |
| Soft Charcoal | #3D3D3D | Body text |

## Typography
- **Headings:** Fraunces (Google Fonts)
- **Body:** Quicksand (Google Fonts)

## Pages
1. **Home** (`/`) - Hero, featured products, social links
2. **Shop** (`/shop`) - Full product grid
3. **About** (`/about`) - "Meet the Teacher" bio with notebook paper effect
4. **Gallery** (`/gallery`) - Masonry grid of classroom photos

## Components
- `Navigation` - Sticky nav with page links
- `Hero` - Welcome section with photo placeholder + bio intro
- `ProductCard` - Product display with soft-pop hover animation
- `SocialBento` - Instagram/TikTok/Pinterest grid
- `NotebookSection` - Lined paper background effect
- `MasonryGallery` - CSS columns photo grid

## Data Model
```typescript
type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // cents
  category: 'lesson-plan' | 'worksheet' | 'decor' | 'bundle';
  image: string;
  stripeProductId?: string;
}
```

## Stripe Checkout Flow
1. Click "Download Now" on ProductCard
2. POST to `/api/checkout` with product ID
3. API creates Stripe Checkout Session
4. Redirect to Stripe hosted checkout
5. Success redirect to `/success` with download access

## Environment Variables
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_BASE_URL=https://elementarystateofmind.com
```
