/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html'
  ],
  theme: {
    extend: {
      fontFamily:{
        'Binggrae':['BinggraeII'],
        'intelmono': ['Intelone_mono_font_family_regular', 'monospace'],
        'cursive': ['THEFACESHOP_INKLIPQUID']
      },
      textStroke: {
        '1': '1px',
        '1-5': '1.5px',
        '2': '2px',
        '3': '3px',
      },
      textStrokeColor: {
        black: 'black',
      },
      keyframes: {
        stamp: {
          '0%': { transform: 'translate(-50%, 0) scale(3)', opacity: '0' },
          '100%': { transform: 'translate(-50%, 0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        stamp: 'stamp 1s cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-stroke-black1': {
          '-webkit-text-stroke': '1px black',
        },
        '.text-stroke-black1-5': {
          '-webkit-text-stroke': '1.5px black',
        },
        '.text-stroke-black2': {
          '-webkit-text-stroke': '2px black',
        },
        '.text-stroke-black3': {
          '-webkit-text-stroke': '3px black',
        },
      });
    },
    require('tailwind-scrollbar-hide')
  ],
}
