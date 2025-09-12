const konstaConfig = require('konsta/config');

/** @type {import('tailwindcss').Config} */
module.exports = konstaConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // eTax brand colors
      colors: {
        'etax-red': '#b71c1c',
        'etax-blue': '#0a84ff',
        'etax-gray': '#f5f5f5',
      },
      // iOS-like fonts
      fontFamily: {
        'ios': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
})