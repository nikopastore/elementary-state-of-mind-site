import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        purple: '#a07cc3',        // Primary accent, nav highlights
        coral: '#f59f80',         // CTA buttons (Buy Now, Shop Now)
        dustyRose: '#e1889f',     // Secondary accent, tags

        // Background colors
        lavender: '#fdd5ff',      // Main page background
        lightPurple: '#dccbeb',   // Card/section backgrounds
        peach: '#fcccba',         // Alternative warm background
        lavenderGray: '#c8cadc',  // Borders, dividers

        // Accent colors
        softPink: '#eeb6c1',      // Hover states, subtle accents

        // Neutrals
        black: '#000000',         // Primary text
        gray: '#838383',          // Secondary text
        white: '#ffffff',         // Card backgrounds, light text
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-quicksand)', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 4px 15px rgba(160, 124, 195, 0.15), 0 2px 6px rgba(0, 0, 0, 0.08)',
        glow: '0 0 20px rgba(160, 124, 195, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config
