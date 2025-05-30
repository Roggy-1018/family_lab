import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<User['profile']>) => void;
}

// This is a mock implementation. In a real application, you would connect to your backend.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        
        try {
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful login
          if (email && password) {
            const user: User = {
              id: '1',
              email,
              name: 'Test User',
              role: 'user',
              profile: {
                hasChildren: false,
                age: 35,
                marriageYears: 5,
              }
            };
            
            set({ user, isAuthenticated: true });
          }
        } catch (error) {
          console.error('Login failed:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (email, password, name) => {
        set({ isLoading: true });
        
        try {
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful registration
          if (email && password && name) {
            const user: User = {
              id: '1',
              email,
              name,
              role: 'user',
              profile: {
                hasChildren: false
              }
            };
            
            set({ user, isAuthenticated: true });
          }
        } catch (error) {
          console.error('Registration failed:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (profile) => {
        set(state => {
          if (!state.user) return state;
          
          return {
            user: {
              ...state.user,
              profile: {
                ...state.user.profile,
                ...profile
              }
            }
          };
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);