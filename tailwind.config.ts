import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        vampior: {
          red: '#f52d2d',
          'red-hover': '#e02626',
          'red-glow': 'rgba(245, 45, 45, 0.45)',
          dark: '#050505',
          border: 'rgba(255, 255, 255, 0.1)',
          'guide-line': 'rgba(255, 255, 255, 0.07)',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
        display: ['"Playfair Display"', 'Syne', 'serif'],
      },
      animation: {
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'subtle-pulse': 'subtlePulse 3s ease-in-out infinite',
      },
      keyframes: {
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        subtlePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.03)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
