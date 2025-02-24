// register-sw.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    // First unregister any existing service workers
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
        console.log('Previous service worker unregistered');
      }

      // Then register the minimal service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then(function (registration) {
          console.log('Minimal service worker registered for PWA support');
        })
        .catch(function (error) {
          console.error('Service Worker registration failed:', error);
        });
    });
  });
}
