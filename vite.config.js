import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const GOOGLE_SITE_VERIFICATION = 'VRxAjfZgmw2EG3f_aiEU6rupWURg-2h5kaOU3fr7uKo';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'inject-prod-meta',
      transformIndexHtml(html) {
        if (mode !== 'production') return html;
        return html.replace(
          '</head>',
          `  <meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}" />\n  </head>`
        );
      }
    }
  ],
  server: { port: 5173 },
  build: { outDir: 'dist' }
}));