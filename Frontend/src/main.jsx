import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContextProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import CodeContextProvider from './context/CodeContextProvider.jsx'
import AuthPage from './pages/AuthPage.jsx'
import { GoogleOAuthProvider, } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(

  <AuthContextProvider>
    <CodeContextProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App />
          <AuthPage />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </CodeContextProvider>
  </AuthContextProvider>

)
