import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build:{
    outDir: 'dist/react', //build into react folder
  },
  plugins: [react()],
})
