import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Ensures that references to static assets work both locally and in production
  base: './', 
  server: {
    open: true, // Automatically open your app in the browser on `npm run dev`
  },
  // Optional build settings
  build: {
    outDir: 'dist', // Name of the output directory after building
  },
});
