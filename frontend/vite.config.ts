import { fileURLToPath, URL } from 'node:url';

import { defineConfig, ViteDevServer } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';

function myPlugin() {
  return {
    name: 'my-plugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        req.url = '/proxy/5173' + req.url;

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [myPlugin(), VueRouter({}), vue()],
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
