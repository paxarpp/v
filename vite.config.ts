import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRouter(), svgr()],
  server: {
    proxy: {
      '/magicvolley': 'http://localhost:8081',
    },
    port: 3000,
  },
});
