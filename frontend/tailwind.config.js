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
        primary: '#1C1C1E',
        background: '#FBF7F2',
        'background-alt': '#F5EFE6',
        accent: {
          DEFAULT: '#F58220',
          light: '#F7941D',
          dark: '#D96D0A',
        },
        'accent-text': '#C05E00',
        surface: '#FFFFFF',
        'text-primary': '#1C1C1E',
        'text-secondary': '#52525B',
        'text-muted': '#6B7280',
        border: '#E8E2D9',
        'border-light': '#F0EBE3',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],           // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }],       // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],          // 16px
        lg: ['1.25rem', { lineHeight: '1.75rem' }],        // 20px
        xl: ['1.5rem', { lineHeight: '2rem' }],            // 24px
        '2xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.015em' }],  // 36px
        hero: ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],           // 48px (was 64px)
        'section-title': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }], // 36px (was 40px)
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
