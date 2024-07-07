import React, { createContext, useContext, useState } from 'react';
import { User, AuthContextType } from '../types/types';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    });
  
    const loginUser = (userData: User) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    };
  
    const logoutUser = () => {
      setUser(null);
      localStorage.removeItem('user');
    };
  
    return (
      <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
  

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
