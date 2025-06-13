import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Vercel için kök dizini kullanıyoruz
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false, // Disable sourcemaps in production to reduce size
    assetsInlineLimit: 0, // Disables inlining assets
    chunkSizeWarningLimit: 600, // Uyarı limitini yükselt (varsayılan 500kB)
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
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
