import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import './input.css';

import Footer from './components/Footer';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

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
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tours' element={<ToursPage />} />
          <Route
            path='/tours/:id'
            element={
              <ProtectedRoute>
                <TourDetails />
              </ProtectedRoute>
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

        <Footer />
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
