// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/productivity-pwa/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Productivity Tracker',
        short_name: 'ProdTrack',
        description: 'A minimalist app to gamify your productivity.',
        theme_color: '#ffffff',
        display: 'standalone', // This is the key property to remove the browser UI
        start_url: '.', // Ensures the app starts at the root, relative to its path
        background_color: '#ffffff', // The splash screen color before the app loads
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});