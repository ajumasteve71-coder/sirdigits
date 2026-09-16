/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './assets/app.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf1',
          100: '#d2f9dd',
          200: '#a7f0bd',
          300: '#6ee295',
          400: '#34d06a',
          500: '#108b0e',
          600: '#0d730d',
          700: '#0b5c0c',
          800: '#0a4a0b',
          900: '#083c0a',
        },
        night: {
          DEFAULT: '#181c25',
          900: '#14171f',
          800: '#1e232e',
          700: '#262d3b',
          600: '#313a4c',
        },
        buy: '#00c390',
        sell: '#de0040',
        gold: '#fbbf24',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(16,139,14,.22), 0 24px 60px -18px rgba(16,139,14,.55)',
        lift: '0 24px 60px -24px rgba(8,20,10,.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pop: {
          '0%': { transform: 'scale(.6)', opacity: '0' },
          '60%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(16,139,14,.45)' },
          '70%': { boxShadow: '0 0 0 14px rgba(16,139,14,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(16,139,14,0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        pop: 'pop .35s cubic-bezier(.22,1,.36,1)',
        pulseRing: 'pulseRing 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
};
