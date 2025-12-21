import Stripe from 'stripe';

// Create Stripe instance only if key is available
// This allows the build to succeed without the key
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    })
  : null;

export function getStripe(): Stripe {
  if (!stripe) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
  }
  return stripe;
}
