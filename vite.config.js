import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        university: resolve(__dirname, 'university.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor';
            }
            if (id.includes('framer-motion')) {
              return 'framer';
            }
            if (id.includes('three')) {
              return 'three';
            }
            if (id.includes('react-globe.gl') || id.includes('globe.gl')) {
              return 'globe';
            }
            return 'vendor-other';
          }
        }
      }
    }
  }
})
