import { build } from 'vite';
import { resolve } from 'path';

async function run() {
  try {
    await build({
      build: {
        rollupOptions: {
          input: {
            main: resolve(process.cwd(), 'index.html'),
            about: resolve(process.cwd(), 'about.html'),
            university: resolve(process.cwd(), 'university.html')
          },
          output: {
            inlineDynamicImports: true
          }
        }
      }
    });
  } catch (e) {
    console.error(e.message);
  }
}
run();
