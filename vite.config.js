import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/my_portfolio/',

  plugins: [react(), tailwindcss()],

  build: {
    chunkSizeWarningLimit: 1300,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) return 'three'
          if (id.includes('@react-three')) return 'r3f'
          if (
            id.includes('node_modules/motion') ||
            id.includes('node_modules/framer-motion')
          )
            return 'motion'
        },
      },
    },
  },
})