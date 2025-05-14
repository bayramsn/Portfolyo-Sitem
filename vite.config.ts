import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Portfolyo-Sitem/', // GitHub repository adınız
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // GitHub Pages özel yapılandırması
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    },
    // 404.html dosyasını dist klasörüne kopyala
    copyPublicDir: true,
  }
})
