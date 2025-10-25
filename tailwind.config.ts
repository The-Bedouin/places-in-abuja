import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,md,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './pages/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effaf3',
          100: '#d9f2e2',
          200: '#b3e5c6',
          300: '#85d4a6',
          400: '#58bf85',
          500: '#3aa66b',
          600: '#2b8557',
          700: '#226a47',
          800: '#1d5339',
          900: '#173f2c',
        },
        earth: '#6b4f3b'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;


