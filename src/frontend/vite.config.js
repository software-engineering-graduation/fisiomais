import { defineConfig } from 'vite'
import jsconfigPaths from 'vite-jsconfig-paths'
import react from '@vitejs/plugin-react'
import { ViteFaviconsPlugin } from "vite-plugin-favicon";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.jsx",
    }),
    jsconfigPaths(),
    ViteFaviconsPlugin({
      logo: './public/favicons/favicon-32x32.png',
      favicons: {
        appName: 'Fisiomais',
        appDescription: 'Clinica de fisioterapia online',
        developerName: 'Guilherme Henrique Coelho Santos, José Victor Mendes Dias e Rubens Marcelo Ramos dos Santos',
        developerURL: null,
        background: '#ddd',
        theme_color: '#333',
        icons: {
          coast: false,
          yandex: false
        }
      }
    })
  ],
  define: {
    'process.env': {
      API_TYPE: process.env.API_TYPE === 'json' ? 'json' :
        process.env.API_TYPE === 'spring' ? 'spring' : '',
    }
  }
});
