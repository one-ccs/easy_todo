import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

function myPlugin() {
  return {
    name: 'my-plugin',
    // transformIndexHtml(html) {
    //   return html.replaceAll('/proxy/5173/', '/proxy/5173/proxy/5173/')
    // },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        req.url = '/proxy/5173' + req.url;

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    myPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['code.oc-nas.duckdns.org'],
  },
  base: '/proxy/5173/',
});
