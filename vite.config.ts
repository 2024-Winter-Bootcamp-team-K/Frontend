import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api/v1': {
        target: 'https://ailibi.click', // 백엔드 주소
        changeOrigin: true, // Origin 헤더 변경
        secure: true, // HTTPS를 사용하는 경우 true로 설정
        
      },
    },
  },
});