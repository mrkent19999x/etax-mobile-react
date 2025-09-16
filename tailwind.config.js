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
      'etax-primary': '[object Object]',
      'etax-secondary': '[object Object]',
      'etax-warning': '[object Object]',
      'etax-error': '[object Object]',
      'etax-background': '#F2F2F7',
      'etax-surface': '#FFFFFF',
      'etax-text': '#000000',
      'etax-text-secondary': '#8E8E93',
      'etax-border': '#C6C6C8',
      // Legacy colors for backward compatibility
      'primary': '#007AFF',
      'secondary': '#34C759',
      'warning': '#FF9500',
      'error': '#FF3B30',
      'background': '#F2F2F7',
      'surface': '#FFFFFF',
      'text': '#000000',
      'text-secondary': '#8E8E93',
      'border': '#C6C6C8',
      // Patch V4: Unmapped colors
      'white': '#ffffff'
    },
      // iOS-like fonts
      fontFamily: {
      'sf-pro': ['SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif'],
      'sans': ['SF Pro Text', 'system-ui', 'sans-serif'],
      'display': ['SF Pro Display', 'system-ui', 'sans-serif']
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
      // Figma-specific sizes (auto-generated patch)
      width: {
        'w-1242': '1242px',
        // Patch V4: Unmapped width
        '390': '390px',
      },
      height: {
        'h-2688': '2688px',
      },
      // Typography aliases (Patch V2)
      fontSize: {
        'heading-1': '1.875rem', // 30px
        'heading-2': '1.5rem',   // 24px
        'heading-3': '1.25rem',  // 20px
        'body-1': '1rem',        // 16px
        'body-2': '0.875rem',    // 14px
        'caption': '0.75rem'     // 12px
      },
      lineHeight: {
        'heading-1': '1.2',
        'heading-2': '1.3',
        'heading-3': '1.4',
        'body-1': '1.6',
        'body-2': '1.5',
        'caption': '1.4'
      },
      fontWeight: {
        'heading-1': '700',
        'heading-2': '600',
        'heading-3': '600',
        'body-1': '400',
        'body-2': '400',
        'caption': '400'
      },
      // Additional spacing (Patch V2)
      spacing: {
        '1131': '1131px',
        '1184': '1184px',
        '2448': '2448px',
        '2560': '2560px'
      },
      // iOS-like shadows + Patch V2 levels
      boxShadow: {
        'ios': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'ios-lg': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)'
      },
      // iOS-like border radius + Patch V2 levels
      borderRadius: {
        'ios': '12px',
        'ios-lg': '16px',
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
})
