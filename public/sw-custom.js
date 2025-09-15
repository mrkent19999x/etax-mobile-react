// Custom Service Worker cho eTax Mobile PWA
// Tác giả: Cirphe AI Assistant
// Ngày: 15/09/2025

const CACHE_NAME = 'etax-mobile-v1';
const OFFLINE_URL = '/etax-mobile-react/offline.html';

// Cache strategies
const CACHE_STRATEGIES = {
  // Static assets - Cache First
  static: {
    pattern: /\.(?:js|css|png|jpg|jpeg|svg|webp|ico)$/,
    strategy: 'CacheFirst',
    cacheName: 'static-assets'
  },
  
  // API calls - Network First
  api: {
    pattern: /^https:\/\/api\./,
    strategy: 'NetworkFirst',
    cacheName: 'api-cache'
  },
  
  // HTML pages - Stale While Revalidate
  pages: {
    pattern: /\.html$/,
    strategy: 'StaleWhileRevalidate',
    cacheName: 'pages-cache'
  }
};

// Install event
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching offline page');
        return cache.add(OFFLINE_URL);
      })
      .then(() => {
        console.log('[SW] Service Worker installed');
        return self.skipWaiting();
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Handle different types of requests
  if (CACHE_STRATEGIES.static.pattern.test(url.pathname)) {
    event.respondWith(handleStaticAssets(request));
  } else if (CACHE_STRATEGIES.api.pattern.test(url.href)) {
    event.respondWith(handleApiRequest(request));
  } else if (CACHE_STRATEGIES.pages.pattern.test(url.pathname)) {
    event.respondWith(handlePageRequest(request));
  } else {
    event.respondWith(handleDefaultRequest(request));
  }
});

// Handle static assets (Cache First)
async function handleStaticAssets(request) {
  try {
    const cache = await caches.open(CACHE_STRATEGIES.static.cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Static asset fetch failed:', error);
    return new Response('Asset not available offline', { status: 404 });
  }
}

// Handle API requests (Network First)
async function handleApiRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_STRATEGIES.api.cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] API request failed, trying cache:', error);
    
    const cache = await caches.open(CACHE_STRATEGIES.api.cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return mock data for offline
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'Không có kết nối mạng. Dữ liệu có thể không cập nhật.',
      offline: true
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle page requests (Stale While Revalidate)
async function handlePageRequest(request) {
  try {
    const cache = await caches.open(CACHE_STRATEGIES.pages.cacheName);
    const cachedResponse = await cache.match(request);
    
    // Try network first
    const networkPromise = fetch(request).then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    }).catch(() => {
      // Network failed, return cached if available
      return cachedResponse;
    });
    
    // Return cached immediately if available, otherwise wait for network
    return cachedResponse || networkPromise;
  } catch (error) {
    console.log('[SW] Page request failed:', error);
    return new Response('Page not available offline', { status: 404 });
  }
}

// Handle default requests
async function handleDefaultRequest(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.log('[SW] Default request failed:', error);
    
    // Try to serve from cache
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_URL);
    }
    
    return new Response('Resource not available offline', { status: 404 });
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'tax-submission') {
    event.waitUntil(syncTaxSubmissions());
  }
});

// Sync tax submissions when back online
async function syncTaxSubmissions() {
  try {
    // Get pending submissions from IndexedDB
    const pendingSubmissions = await getPendingSubmissions();
    
    for (const submission of pendingSubmissions) {
      try {
        const response = await fetch('/api/tax-submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission)
        });
        
        if (response.ok) {
          await removePendingSubmission(submission.id);
          console.log('[SW] Synced submission:', submission.id);
        }
      } catch (error) {
        console.log('[SW] Failed to sync submission:', submission.id, error);
      }
    }
  } catch (error) {
    console.log('[SW] Background sync failed:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Thông báo mới từ eTax Mobile',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Xem chi tiết',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Đóng',
        icon: '/icons/icon-192x192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('eTax Mobile', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/etax-mobile-react/dashboard')
    );
  }
});

// Helper functions for IndexedDB
async function getPendingSubmissions() {
  // Implementation for getting pending submissions from IndexedDB
  return [];
}

async function removePendingSubmission(id) {
  // Implementation for removing pending submission from IndexedDB
  console.log('[SW] Removed pending submission:', id);
}

console.log('[SW] Custom Service Worker loaded');