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
          // Only rewrite exactly '/' or '/about' or paths like '/about/' 
          // Do NOT rewrite requests for static assets like '/about-hero.jpg'
          if (req.url === '/' || req.url === '/about' || req.url === '/about/') {
            req.url = '/about.html';
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 5714,
    open: false,
    strictPort: true
  },
  build: {
    rollupOptions: {
      input: 'about.html'
    }
  }
})
