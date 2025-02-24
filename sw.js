// This is an intentionally empty service worker that does nothing.
// It's only here to allow "Add to Home Screen" functionality.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// No caching or routing - just let all requests pass through normally
