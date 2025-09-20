import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  // 스래쉬를 넣지않아도 자동으로 메인으로 이동한다.
  // base: "/app/" : app라는 폴더로 하려면?
  // if deploying to example.com/app/
  plugins: [react(), svgr()],
})
