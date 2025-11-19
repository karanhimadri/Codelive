import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContextProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import CodeContextProvider from './context/CodeContextProvider.jsx'
import { GoogleOAuthProvider, } from "@react-oauth/google";
import ScrollToTop from './components/ScrollToTop.jsx'
import { AiProvider } from './context/AiContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <AiProvider>
      <CodeContextProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <App />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </CodeContextProvider>
    </AiProvider>
  </AuthContextProvider>
)
