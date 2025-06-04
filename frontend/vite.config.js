import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  define: {
    'process.env.REACT_APP_SOCKET_URL': JSON.stringify(process.env.REACT_APP_SOCKET_URL),
    'process.env.REACT_APP_PEER_HOST': JSON.stringify(process.env.REACT_APP_PEER_HOST),
    'process.env.REACT_APP_PEER_PORT': JSON.stringify(process.env.REACT_APP_PEER_PORT),
    'process.env.REACT_APP_PEER_PATH': JSON.stringify(process.env.REACT_APP_PEER_PATH),
    'process.env.REACT_APP_PEER_SECURE': JSON.stringify(process.env.REACT_APP_PEER_SECURE)
  }
})
