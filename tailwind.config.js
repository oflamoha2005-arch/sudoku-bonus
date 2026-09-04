/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ochre: {
          DEFAULT: '#D97724',
          light: '#E79047',
          dark: '#B85E14',
          subtle: '#FDF2E8',
        },
        sage: {
          DEFAULT: '#768A76',
          light: '#8E9F8E',
          dark: '#586A58',
          subtle: '#F0F4F0',
        },
        terracotta: {
          DEFAULT: '#C85A32',
          light: '#D96E49',
          dark: '#A64522',
          subtle: '#FAF0EB',
        },
        cream: {
          DEFAULT: '#FAF6F0',
          pure: '#FFFFFF',
          card: '#F5EFEB',
          warm: '#EFE7DE',
        },
        cocoa: {
          DEFAULT: '#2C2420',
          muted: '#635852',
          light: '#8C8078',
        },
        softgray: {
          DEFAULT: '#E5E0D8',
          light: '#F2EFEA',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        float: 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
