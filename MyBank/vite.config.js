// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   esbuild: {
//     target: 'esnext',
//   },
//   build: {
//     chunkSizeWarningLimit: 1000, // Increase the chunk size limit to avoid warnings (in KB)
//     rollupOptions: {
//       output: {
//         manualChunks: (id) => {
//           // This helps to split large dependencies into separate chunks (e.g., node_modules)
//           if (id.includes('node_modules')) {
//             return 'vendor';
//           }
//         },
//       },
//     },
//   },
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import postcssPresetEnv from 'postcss-preset-env';

// export default defineConfig({
//   plugins: [
//     react(),
//     legacy({
//       targets: ['defaults', 'not IE 11'], // Adds polyfills for unsupported features
//     }),
//   ],
//   esbuild: {
//     target: 'es2018', // Adjust JavaScript target for Safari
//   },
//   css: {
//     postcss: {
//       plugins: [require('postcss-preset-env')()],
//     },
//   },
//   build: {
//     sourcemap: true, // Enables source maps for debugging
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             return 'vendor'; // Splits large dependencies into a separate chunk
//           }
//         },
//       },
//     },
//   },
// });
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'], // Adds polyfills for unsupported features
    }),
  ],
  esbuild: {
    target: 'es2018', // Adjust JavaScript target for Safari compatibility
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 0, // Use all modern CSS features (adjust as needed)
        }),
      ],
    },
  },
  build: {
    sourcemap: true, // Enables source maps for debugging
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Splits large dependencies into a separate chunk
          }
        },
      },
    },
  },
});
