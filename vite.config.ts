import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/media': 'http://localhost:8081',
      '/coaches': 'http://localhost:8081',
      '/camps': 'http://localhost:8081',
      '/questions': 'http://localhost:8081',
    },
  },
})
