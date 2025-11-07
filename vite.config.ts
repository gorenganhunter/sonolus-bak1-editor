import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },
    plugins: [vue()/*, VitePWA({
        /*registerType: "autoUpdate", injectRegister: "auto", workbox: {
            cleanupOutdatedCaches: true,
            globPatterns: ['**'],
        },
        manifest: {
            background_color: "#000020",
            theme_color: "#000020",
            name: "BAK1 Editor",
            icons: [{
                src: "public/thumbnail.png"
            }]
        }
    })*/],
})
