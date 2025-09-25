import { defineConfig } from 'vite';
import { coverageConfigDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 4001,
  },
  test: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'tests': path.resolve(__dirname, './tests'),
    },
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['@mui/x-data-grid'],
      }
    },
    setupFiles: ['./tests/setup-tests.ts'],
    coverage: {
      exclude: ['src/application/main.tsx', ...coverageConfigDefaults.exclude],
      include: ['src/**/*.{ts,tsx}'],
      reporter: ['html'],
      thresholds: {
        functions: 95,
        branches: 90,
        lines: 90,
        statements: 90
      }
    }
  },
});
