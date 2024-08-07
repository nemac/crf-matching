import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://nemac.github.io/crf-matching',
  plugins: [react()],
})
