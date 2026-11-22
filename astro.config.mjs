// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    // gsap se importa desde <script>, así que Vite lo descubre recién en el
    // primer request: al re-optimizar invalida los módulos ya pedidos y el
    // dev toolbar muere con "504 Outdated Optimize Dep". Pre-bundlearlo al
    // arrancar evita ese reload.
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger', 'gsap/ScrollToPlugin']
    }
  }
});
