import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      __AIRTABLE_TOKEN__: JSON.stringify(env.AIRTABLE_TOKEN),
      __AIRTABLE_BASE__: JSON.stringify(env.AIRTABLE_BASE)
    },
    base: 'https://nemac.github.io/crf-matching',
    plugins: [react()],
  }
})
