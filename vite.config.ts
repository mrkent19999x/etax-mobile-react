import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/etax-mobile-react/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        navigateFallback: '/etax-mobile-react/index.html',
        navigateFallbackDenylist: [/^\/__.*$/],
        offlineGoogleAnalytics: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.github\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'github-api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // <== 30 days
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources-cache'
            }
          }
        ]
      },
      manifest: {
        name: 'eTax Mobile PWA',
        short_name: 'eTax',
        description: 'Ứng dụng thuế điện tử di động',
        theme_color: '#0a84ff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/etax-mobile-react/',
        start_url: '/etax-mobile-react/',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Khai thuế',
            short_name: 'Khai thuế',
            description: 'Khai thuế trực tuyến',
            url: '/etax-mobile-react/khaithue',
            icons: [{ src: 'icons/icon-192x192.png', sizes: '96x96' }]
          },
          {
            name: 'Nộp thuế',
            short_name: 'Nộp thuế',
            description: 'Nộp thuế điện tử',
            url: '/etax-mobile-react/nopthue',
            icons: [{ src: 'icons/icon-192x192.png', sizes: '96x96' }]
          },
          {
            name: 'Tra cứu',
            short_name: 'Tra cứu',
            description: 'Tra cứu thông tin thuế',
            url: '/etax-mobile-react/tracuttnpt',
            icons: [{ src: 'icons/icon-192x192.png', sizes: '96x96' }]
          }
        ]
      }
    })
  ],
})
