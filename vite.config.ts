import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: isProduction ? '/portfolio/' : '/',
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
