import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rewrite-root',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/') {
            req.url = '/university.html';
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 5715,
    open: false,
    strictPort: true
  },
  build: {
    rollupOptions: {
      input: 'university.html'
    }
  }
})
