const konstaConfig = require('konsta/config');

/** @type {import('tailwindcss').Config} */
module.exports = konstaConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // eTax brand colors theo Figma
      colors: {
        'etax-red': '#b71c1c',
        'etax-blue': '#0a84ff',
        'etax-gray': '#f5f5f5',
        'etax-success': '#34c759',
        'etax-warning': '#ff9500',
        'etax-error': '#ff3b30',
        'etax-dark': '#1c1c1e',
        'etax-light': '#f2f2f7',
        'etax-border': '#e5e5ea',
      },
      // iOS-like fonts
      fontFamily: {
        'ios': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      // Mobile-first spacing
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      // Mobile breakpoints
      screens: {
        'xs': '360px',
        'sm': '375px',
        'md': '414px',
        'lg': '430px',
      },
      // iOS-like shadows
      boxShadow: {
        'ios': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'ios-lg': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      // iOS-like border radius
      borderRadius: {
        'ios': '12px',
        'ios-lg': '16px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
})