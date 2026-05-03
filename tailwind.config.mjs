/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Lovio-inspired color scheme - Luxury, elegant, refined
        cream: {
          DEFAULT: '#FFFBF5',
          light: '#FFFEF9',
          dark: '#F5F0E8',
        },
        white: {
          DEFAULT: '#FFFFFF',
          off: '#FEFEFE',
        },
        charcoal: {
          DEFAULT: '#2A2A2A',
          light: '#3A3A3A',
          soft: '#4A4A4A',
        },
        text: {
          primary: '#2A2A2A',
          muted: '#666666',
          light: '#999999',
        },
        gold: {
          DEFAULT: '#C5A572',
          light: '#D4B685',
          dark: '#B69563',
        },
        divider: {
          DEFAULT: '#E8E4DE',
          light: '#F0EDE8',
        },
      },
      fontFamily: {
        display: ['"Marcellus"', 'serif'],
        body: ['"Montserrat"', 'sans-serif'],
        serif: ['"Marcellus"', 'serif'],
      },
      fontSize: {
        'hero': 'clamp(3.5rem, 10vw, 8rem)',
        'hero-sub': 'clamp(1rem, 2vw, 1.25rem)',
        'section': 'clamp(2rem, 5vw, 3.5rem)',
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'widest-2xl': '0.35em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
};
