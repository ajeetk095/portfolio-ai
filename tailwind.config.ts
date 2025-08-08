import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        accent: '#a78bfa'
      }
    }
  },
  plugins: []
} satisfies Config;
