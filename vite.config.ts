import { defineConfig } from "vite"
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  server: {
    port: 3000
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true
  }
});
