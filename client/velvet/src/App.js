import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import './input.css';

import ConsentBanner from './components/ConsentBanner';
import Footer from './components/Footer';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import useAuthStore from './store/useAuthStore';

import AboutJapan from './pages/AboutJapan';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Profile from './pages/Profile';
import Register from './pages/Register';
import TourDetails from './pages/TourDetails';
import ToursPage from './pages/Tours';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const initAuth = useAuthStore(state => state.initAuth);
  const isInitialized = useAuthStore(state => state.isInitialized);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />

        {isInitialized ? (
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tours' element={<ToursPage />} />
            <Route path='/tours/:id' element={<TourDetails />} />
            <Route path='/about' element={<AboutJapan />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        ) : (
          <div className='flex min-h-[80vh] items-center justify-center'>
            <div className='h-10 w-10 animate-spin rounded-full border-b-2 border-[#b0164f]' />
          </div>
        )}

        <Footer />
        <Toaster />
        <ConsentBanner />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
