import { Suspense, lazy, useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './pages/Footer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import FeaturesSection from './pages/FeaturePage';
import FAQSection from './pages/FAQs';
import ContactUsSection from './pages/ContactUs';
import { authContext } from './context/AuthContextProvider';

// Lazy load CodeSpace to reduce initial bundle size (Monaco Editor is heavy)
const CodeSpace = lazy(() => import('./pages/CodeSpace'));

const App = () => {
  const { getUserDetails } = useContext(authContext);
  
  useEffect(() => {
    getUserDetails();
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-20">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh] bg-gray-900">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
              <p className="mt-4 text-white text-lg">Loading Code Editor...</p>
            </div>
          </div>
        }>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/code-space' element={<CodeSpace />} />
            <Route path='/features' element={<FeaturesSection />} />
            <Route path='/faqs' element={<FAQSection />} />
            <Route path='/contact' element={<ContactUsSection />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ToastContainer
        autoClose={2500}
        toastClassName="flex items-center space-x-2 px-4 py-2"
        bodyClassName="flex items-center"
      />
    </div>
  );
};

export default App;
