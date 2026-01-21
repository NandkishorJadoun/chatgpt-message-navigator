import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        script: resolve(__dirname, 'src/script.ts'),
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      output: {
        assetFileNames: '[name].[ext]',
      },
    },
    sourcemap: true, 
    outDir: 'dist',
  },
});