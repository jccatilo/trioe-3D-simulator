import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Use a relative base path
  server: {
    open: true, // Automatically open the app in a browser
  },
});
