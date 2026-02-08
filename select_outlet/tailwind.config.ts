// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // This is a sophisticated "Luxury Gold" matching your logo
        brand: {
          gold: "#C5A059",
          black: "#1A1A1A",
          gray: "#F5F5F5",
        },
      },
      fontFamily: {
        // We'll use a clean sans-serif for UI and keep serif for headings
        sans: ['var(--font-geist-sans)'],
      },
      letterSpacing: {
        'ultra-widest': '0.3em',
      }
    },
  },
  plugins: [],
};
export default config;