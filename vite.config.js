import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        plugins: ["@svgr/plugin-jsx"],
      },
    })
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    }
  }
})
