import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.pem')),
    },
    host: 'localhost',
    proxy: {
      '/__/auth/handler': {
        target: 'https://ntsystem-7d571.firebaseapp.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  assetsInclude: ['**/*.lottie']
})
