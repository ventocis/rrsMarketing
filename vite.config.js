import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const GOOGLE_SITE_VERIFICATION = 'VRxAjfZgmw2EG3f_aiEU6rupWURg-2h5kaOU3fr7uKo';

const ANALYTICS_MARKER = '<!-- Analytics injected at build time via vite.config.js -->';

function buildGtagBlock(ga4Id, adsId) {
  return `<!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${ga4Id}', {
        linker: {
          domains: ['roadreadysafety.com', 'app.roadreadysafety.com']
        }
      });
      gtag('config', '${adsId}');
    </script>`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const enableAnalytics = env.VITE_ENABLE_ANALYTICS === 'true';
  const ga4Id = (env.VITE_GA4_ID || '').trim();
  const adsId = (env.VITE_GOOGLE_ADS_ID || '').trim();
  const injectAnalytics = enableAnalytics && ga4Id && adsId;

  return {
    plugins: [
      react(),
      {
        name: 'inject-prod-meta',
        transformIndexHtml(html) {
          let out = html;
          if (injectAnalytics) {
            out = out.replace(ANALYTICS_MARKER, buildGtagBlock(ga4Id, adsId));
          }
          if (mode !== 'production') return out;
          return out.replace(
            '</head>',
            `  <meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}" />\n  </head>`
          );
        }
      }
    ],
    server: { port: 5173 },
    build: { outDir: 'dist' }
  };
});
