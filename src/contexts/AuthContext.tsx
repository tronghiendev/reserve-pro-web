import React, { createContext, useContext, useState } from 'react';
import type { AuthUser } from '../types';
import { loginApi } from '../services/auth.service';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem('reserve_pro_user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        localStorage.removeItem('reserve_pro_user');
      }
    }
    return null;
  });
  const loading = false;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await loginApi(email, password);
      if (response && response.token) {
        localStorage.setItem('reserve_pro_token', response.token);
        
        const loggedUser: AuthUser = response.user;
        
        setUser(loggedUser);
        localStorage.setItem('reserve_pro_user', JSON.stringify(loggedUser));
        return true;
      }
      return false;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Invalid email or password';
      throw new Error(message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('reserve_pro_user');
    localStorage.removeItem('reserve_pro_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
