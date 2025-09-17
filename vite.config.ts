import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: false,
        manifestFilename: 'manifest.json',
        devOptions: {
          enabled: true,
        },
      }),
    ],
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      hmr: {
        host: 'localhost',
        port: 5173,
        protocol: 'ws',
      },
      watch: {
        usePolling: true,
      },
    },
    define: {
      'process.env.VITE_HEROKU_URL': JSON.stringify(env.VITE_HEROKU_URL),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});
