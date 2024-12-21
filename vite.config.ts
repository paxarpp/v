import { defineConfig, loadEnv } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const url = loadEnv(mode, process.cwd(), '').URL_ENTRY_POINT;
  return {
    plugins: [reactRouter(), svgr()],
    server: {
      proxy: {
        '/magicvolley': mode !== 'production' ? 'http://localhost:8081' : '',
      },
      port: 3000,
    },
    base: mode !== 'production' ? '/' : url,
  };
});
