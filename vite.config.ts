import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Portfolyo-Sitem/', // GitHub Pages repository name path
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false, // Disable sourcemaps in production to reduce size
    chunkSizeWarningLimit: 600, // Uyarı limitini yükselt (varsayılan 500kB)
    rollupOptions: {
      output: {
        manualChunks: {
          // React bileşenlerini ayrı bir chunk'ta topla
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Framer Motion gibi büyük kütüphaneleri ayrı bir chunk'ta topla
          'vendor-animation': ['framer-motion', 'gsap'],
          // Three.js ve ilgili bileşenlerini ayrı bir chunk'ta topla
          'vendor-three': ['@react-three/fiber', 'three']
        }
      }
    }
  }
})
