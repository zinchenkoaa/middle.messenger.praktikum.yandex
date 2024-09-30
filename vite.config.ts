import { defineConfig, PluginOption } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: 'src',
  server: {
    port: 3000
  },
  plugins: [
    handlebars({
        partialDirectory: resolve(__dirname, 'src', 'partials'),
        context: {
          title: 'Sparkit Messenger',
        },
        compileOptions: {},
        runtimeOptions: {},
        helpers: {},         
        reloadOnPartialChange: true,
      }) as PluginOption,
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});