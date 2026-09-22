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
      },
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
      }
    }
  }
})
