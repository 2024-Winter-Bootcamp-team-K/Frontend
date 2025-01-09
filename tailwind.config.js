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
        'Binggrae':['BinggraeII']
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
  ],
}
