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
        purple: '#624e83',        // Primary accent, nav highlights
        coral: '#8a4a36',         // CTA buttons (Buy Now, Shop Now)
        dustyRose: '#62476d',     // Secondary accent, tags

        // Background colors
        lavender: '#fff9f1',      // Main page background
        lightPurple: '#ece8fa',   // Card/section backgrounds
        peach: '#f8cebf',         // Alternative warm background
        lavenderGray: '#dcd5cd',  // Borders, dividers

        // Accent colors
        softPink: '#f8cebf',      // Hover states, subtle accents

        // Neutrals
        black: '#25263a',         // Primary text
        gray: '#555467',          // Secondary text
        white: '#ffffff',         // Card backgrounds, light text
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-quicksand)', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 0 0 1px #dcd5cd',
        glow: '0 0 0 1px #a699bb',
      },
    },
  },
  plugins: [],
}
export default config
