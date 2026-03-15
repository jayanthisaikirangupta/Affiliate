/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B2B3A',
        background: '#FAF8F5',
        accent: {
          DEFAULT: '#D4763C',
          light: '#E08F5A',
          dark: '#B8612E',
        },
        surface: '#FFFFFF',
        'text-primary': '#1E2832',
        'text-secondary': '#5A6872',
        'text-muted': '#94A0AA',
        border: '#E2DDD7',
        'border-light': '#F0ECE7',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        hero: ['4rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'section-title': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        subheading: ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
