import { create } from 'zustand';

interface AppState {
  user: any;
  theme: 'light' | 'dark';
  setUser: (user: any) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  theme: 'light',
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
}));