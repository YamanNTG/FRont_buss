export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.addEventListener('statechange', () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  const updateConfirmation = window.confirm(
                    'New content is available. Would you like to reload to update?',
                  );
                  if (updateConfirmation) {
                    window.location.reload();
                  }
                }
                break;
            }
          });
        }
      });

      // Check for updates periodically
      setInterval(
        () => {
          registration.update();
        },
        60 * 60 * 1000,
      ); // Check every hour
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};
