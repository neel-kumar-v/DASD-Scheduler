import { resolve } from 'path'
import { defineConfig } from 'vite'

const rewriteSlashToIndexHtml = () => {
  return {
    name: 'rewrite-slash-to-index-html',
    apply: 'serve',
    enforce: 'post',
    configureServer(server) {
      // rewrite / as index.html
      server.middlewares.use('/', (req, _, next) => {
        if (req.url === '/') {
          req.url = '/index.html';
        }
        next();
      });
    },
  };
};

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        reports: resolve(__dirname, 'src/reports/index.html'),
        login: resolve(__dirname, 'src/login/index.html'),
        checkin: resolve(__dirname, 'src/form/index.html'),
        schedule: resolve(__dirname, 'src/schedule/index.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          return 'assets/' + assetInfo.name;
        },
      },
    },
  },
  appType: 'mpa', // disable history fallback
  plugins: [
    rewriteSlashToIndexHtml(),
  ],
});