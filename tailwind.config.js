/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')]
};
