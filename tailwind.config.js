/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        oufellia: {
          gold: '#F2A922',
          bg: '#F2A922',
          bgDeep: '#E89E15',
          ink: '#131C24',
          terracotta: '#D95C14',
          cream: '#FFF8EC',
          mint: '#A8E6CF',
          coral: '#FF7654',
          lavender: '#C5B4FA',
          sky: '#8AE0F2',
        },
      },
      boxShadow: {
        'pill': '0 4px 14px 0 rgba(19, 28, 36, 0.08)',
        'pill-hover': '0 8px 24px 0 rgba(19, 28, 36, 0.16)',
        'glass': '0 12px 36px 0 rgba(160, 95, 10, 0.14)',
        'book': '0 20px 45px -12px rgba(19, 28, 36, 0.38)',
      },
    },
  },
  plugins: [],
};
