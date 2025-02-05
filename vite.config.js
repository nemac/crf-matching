import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      __AIRTABLE_TOKEN__: JSON.stringify(env.AIRTABLE_TOKEN),
      __AIRTABLE_BASE__: JSON.stringify(env.AIRTABLE_BASE),
      __AGOL_API_KEY__: JSON.stringify(env.AGOL_API_KEY),
    },
    //base: 'https://nemac.github.io/crf-matching',
    plugins: [react()],
    optimizeDeps: { // 
      include: ['@mui/material/Unstable_Grid2'],
    },    
  };
});
