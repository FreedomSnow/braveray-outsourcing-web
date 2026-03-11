import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  base: '/customization/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-static-files',
      apply: 'build',
      writeBundle() {
        // 确保静态文件复制到 dist/customization/ 目录
        const staticFiles = ['robots.txt', 'sitemap.xml', 'llms.txt', 'google10572cd992f6fd1f.html'];
        const outDir = path.join(__dirname, 'dist', 'customization');
        
        // 确保目录存在
        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true });
        }
        
        staticFiles.forEach(file => {
          const srcPath = path.join(__dirname, 'public', file);
          const destPath = path.join(outDir, file);
          if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${file} to dist/customization/`);
          }
        });
        
        // 复制 404.html 到 dist 根目录（GitHub Pages 使用）
        const src404 = path.join(__dirname, 'public', '404.html');
        const dest404 = path.join(__dirname, 'dist', '404.html');
        if (fs.existsSync(src404)) {
          fs.copyFileSync(src404, dest404);
          console.log('Copied 404.html to dist/');
        }
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    middlewares: [
      (req, res, next) => {
        // 开发环境下直接返回静态文件
        const staticFiles = ['robots.txt', 'sitemap.xml', 'llms.txt', 'google10572cd992f6fd1f.html'];
        const fileName = req.url?.split('?')[0].split('/').pop();
        
        if (fileName && staticFiles.includes(fileName)) {
          const filePath = path.join(__dirname, 'public', fileName);
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const mimeTypes: Record<string, string> = {
              'robots.txt': 'text/plain; charset=UTF-8',
              'sitemap.xml': 'application/xml; charset=UTF-8',
              'llms.txt': 'text/plain; charset=UTF-8',
              'google10572cd992f6fd1f.html': 'text/html; charset=UTF-8',
            };
            res.setHeader('Content-Type', mimeTypes[fileName] || 'text/plain');
            res.end(content);
            return;
          }
        }
        next();
      }
    ]
  }
})
