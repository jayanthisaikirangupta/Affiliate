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
        /* ── Brand Primitives ── */
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#1B2B3A',
          950: '#102A43',
        },
        amber: {
          50: '#FFF8F0',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#F59E42',
          500: '#D4763C',
          600: '#B85C2A',
          700: '#9A4A20',
          800: '#7C3A18',
          900: '#5F2D12',
        },
        warm: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F5F1EC',
          300: '#EDE8E1',
          400: '#D8D0C7',
          500: '#B8AFA5',
          600: '#8C847C',
          700: '#6B6560',
          800: '#4A4541',
          900: '#2D2A27',
        },

        /* ── Semantic (flat) ── */
        primary: '#1B2B3A',
        background: '#FAF8F5',
        'background-alt': '#F5F1EC',

        /* ── Accent (expanded) ── */
        accent: {
          DEFAULT: '#D4763C',
          light: '#F59E42',
          dark: '#B85C2A',
          glow: 'rgba(212,118,60,0.1)',
          'glow-strong': 'rgba(212,118,60,0.25)',
        },
        'accent-text': '#B85C2A',

        /* ── Surfaces ── */
        surface: {
          DEFAULT: '#FFFFFF',
          light: '#F5F1EC',
          glass: 'rgba(255,255,255,0.7)',
        },

        /* ── Text ── */
        'text-primary': '#1B2B3A',
        'text-secondary': '#334E68',
        'text-muted': '#8C847C',

        /* ── Borders ── */
        border: '#EDE8E1',
        'border-light': '#D8D0C7',
        'border-accent': 'rgba(212,118,60,0.3)',

        /* ── Pet Category colours ── */
        'cat-dog': '#D4763C',
        'cat-cat': '#7C3AED',
        'cat-bird': '#0EA5E9',
        'cat-fish': '#0D9488',
        'cat-small': '#F59E0B',
        'cat-health': '#059669',
        'cat-accessories': '#6366F1',

        /* ── Semantic Status ── */
        success: '#059669',
        destructive: '#DC2626',
        warning: '#D97706',
        info: '#0369A1',
      },

      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.25rem', { lineHeight: '1.75rem' }],
        xl: ['1.5rem', { lineHeight: '2rem' }],
        '2xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.015em' }],
        '3xl': ['2.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        hero: ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-lg': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'section-title': ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        subheading: ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        /* New from design system */
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        price: ['1.375rem', { lineHeight: '1', fontWeight: '700' }],
        'price-lg': ['1.75rem', { lineHeight: '1', fontWeight: '700' }],
      },

      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },

      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      boxShadow: {
        /* ── Design-system shadows ── */
        soft: '0 2px 8px rgba(27, 43, 58, 0.06)',
        card: '0 1px 3px rgba(27, 43, 58, 0.04), 0 4px 12px rgba(27, 43, 58, 0.06)',
        hover: '0 8px 24px rgba(27, 43, 58, 0.12)',
        lg: '0 8px 32px rgba(27, 43, 58, 0.1)',
        xl: '0 12px 48px rgba(27, 43, 58, 0.14)',
        amber: '0 4px 14px rgba(212, 118, 60, 0.3)',
        'amber-lg': '0 8px 28px rgba(212, 118, 60, 0.35)',

        /* ── Glow variants (navy-based) ── */
        'glow-sm': '0 0 15px -3px rgba(27, 43, 58, 0.12)',
        glow: '0 0 30px -5px rgba(212, 118, 60, 0.15)',
        'glow-lg': '0 4px 60px -10px rgba(212, 118, 60, 0.2)',
        'glow-xl': '0 4px 80px -15px rgba(212, 118, 60, 0.25)',

        /* ── Legacy compat ── */
        premium: '0 4px 30px -4px rgba(27, 43, 58, 0.08)',
        'premium-lg': '0 10px 50px -10px rgba(27, 43, 58, 0.12)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.8)',
      },

      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16,1,0.3,1)',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16,1,0.3,1)',
        'glow-pulse': 'glowPulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        float: 'float 6s cubic-bezier(0.16,1,0.3,1) infinite',
        shimmer: 'shimmer 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'gradient-shift': 'gradientShift 8s cubic-bezier(0.4,0,0.6,1) infinite',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16,1,0.3,1)',
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
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,118,60,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(212,118,60,0.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
