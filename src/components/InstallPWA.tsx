import { useEffect, useState } from 'react';

const InstallPWA = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowButton(true);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    const result = await installPrompt.prompt();
    if (result.outcome === 'accepted') {
      setShowButton(false);
    }
    setInstallPrompt(null);
  };

  if (!showButton) return null;

  return (
    <button onClick={handleInstallClick} className="install-button">
      Install App
    </button>
  );
};

export default InstallPWA;
