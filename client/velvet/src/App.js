import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import './input.css';

import Footer from './components/Footer';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import useAuthStore from './store/useAuthStore';

import AboutJapan from './pages/AboutJapan';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';
import TourDetails from './pages/TourDetails';
import ToursPage from './pages/Tours';

function App() {
  const initAuth = useAuthStore(state => state.initAuth);
  const isInitialized = useAuthStore(state => state.isInitialized);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <div>
      <BrowserRouter>
        <Header />

        {isInitialized ? (
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tours' element={<ToursPage />} />
            <Route
              path='/tours/:id'
              element={
                  <TourDetails />
              }
            />
            <Route path='/about' element={<AboutJapan />} />
            <Route path='/contacts' element={<Contacts />} />
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
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
