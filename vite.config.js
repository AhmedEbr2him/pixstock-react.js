import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  include: ['src/**/*.ts', 'src/**/*.tsx', 'vitest.config.ts'],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx', 'vitest.config.ts'],
    },
  ],
});
