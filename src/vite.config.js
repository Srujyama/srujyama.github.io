import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/srujyama.github.io/'  // use '/' if you're deploying to a custom domain root
})
