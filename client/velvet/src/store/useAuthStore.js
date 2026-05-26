import Cookies from 'js-cookie';
import { create } from 'zustand';
import api from '../api/api';

const useAuthStore = create(set => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  setUser: user => set({ user, isAuthenticated: true }),

  clearUser: () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    set({ user: null, isAuthenticated: false });
  },

  initAuth: async () => {
    const token = Cookies.get('access');
    if (!token) {
      set({ isInitialized: true });
      return;
    }
    try {
      const res = await api.get('/me/');
      set({ user: res.data, isAuthenticated: true, isInitialized: true });
    } catch {
      Cookies.remove('access');
      Cookies.remove('refresh');
      set({ user: null, isAuthenticated: false, isInitialized: true });
    }
  }
}));

export default useAuthStore;
