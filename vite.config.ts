import { defineConfig, PluginOption } from 'vite';
import { resolve, dirname } from 'path';

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