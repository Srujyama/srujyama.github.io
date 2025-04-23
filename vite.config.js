import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/', // this is correct for a user site like yourusername.github.io
    plugins: [react()]
})
