import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0A0A0B',
        abyss: '#111113',
        fog: '#EDEDED',
        brass: '#C9A86A',
        steel: '#8A8D91',
      },
      fontFamily: {
        display: ['Unbounded', 'sans-serif'],
        quote: ['Cormorant Garamond', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      spacing: {
        'section': 'min(20vh, 24rem)',
      },
      aspectRatio: {
        'cinema': '21 / 9',
        'ultra': '32 / 9',
      },
    },
  },
  plugins: [],
} satisfies Config;
