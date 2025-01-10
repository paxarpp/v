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
  const isDev = env.MODE !== 'production';

  const API_URL = env.VITE_API_URL;
  const PORT = env.VITE_PORT;
  const url = env.URL_ENTRY_POINT;

  return {
    plugins: [reactRouter(), svgr()],
    server: {
      proxy: {
        '/magicvolley': 'API_URL_test',
      },
      port: isDev ? 3000 : Number(PORT),
    },
    base: isDev ? '/' : url,
  };
});
