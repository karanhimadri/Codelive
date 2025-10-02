import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

export default defineConfig({
  plugins: [
    react(),
    monacoEditorPlugin.default({
      languageWorkers: ['editorWorkerService', 'typescript', 'json', 'html', 'css']
    })
  ],
  server: {
    host: true, // 👈 this allows access from LAN devices
    port: 5173  // optional: explicitly set the port
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'monaco-editor': ['monaco-editor'],
          'monaco-binding': ['y-monaco'],
          'vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase limit to 1000kB for Monaco Editor chunk
  },
  optimizeDeps: {
    include: ['monaco-editor']
  },
  define: {
    global: 'globalThis'
  }
})
