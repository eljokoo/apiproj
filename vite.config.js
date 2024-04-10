import eslint from 'vite-plugin-eslint';
import autoprefixer from 'autoprefixer';

/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint(),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
});
