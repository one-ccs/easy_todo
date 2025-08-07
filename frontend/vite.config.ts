import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';

import devServerProxy from './src/plugins/devServerProxy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [devServerProxy(), VueRouter({}), vue()],
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
