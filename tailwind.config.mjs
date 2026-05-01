/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF7F0',
          deep: '#F1ECDF',
          fold: '#E8DDD0',
        },
        olive: {
          DEFAULT: '#4A5D3A',
          soft: '#7A8B6A',
        },
        wood: {
          DEFAULT: '#6B4F3A',
          deep: '#3E2C1F',
        },
        ink: '#2A2218',
        gold: '#B8935A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Lora', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(62,44,31,0.07)',
        'warm-md': '0 6px 24px rgba(62,44,31,0.10)',
        'warm-lg': '0 16px 48px rgba(62,44,31,0.13)',
      },
      fontSize: {
        'hero': 'clamp(4rem, 8vw, 7rem)',
        'hero-amp': 'clamp(3rem, 6vw, 5rem)',
      },
    },
  },
  plugins: [],
};
