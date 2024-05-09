import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'; // Importa Tailwind CSS como un plugin de PostCSS

// https://vitejs.dev/config/
export default defineConfig({
  base: '/newpokemon/',
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss
      ],
    }
  }
})
