import { defineConfig, loadEnv } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = mode !== 'production';

  // все env переменные в файле .env
  const url = env.URL_ENTRY_POINT;

  return isDev
    ? {
        plugins: [reactRouter(), svgr()],
        server: {
          proxy: {
            '/magicvolley': 'http://localhost:8081',
          },
          port: 3000,
        },
        base: url,
      }
    : {
        plugins: [reactRouter(), svgr()],
        base: url,
      };
});
