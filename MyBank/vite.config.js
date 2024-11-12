import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   esbuild: {
//     target: 'es2018',
//   },
// })
export default defineConfig({
  plugins: [react()],
  esbuild: {
    target: 'esnext',
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase the chunk size limit to avoid warnings (in KB)
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // This helps to split large dependencies into separate chunks (e.g., node_modules)
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})

