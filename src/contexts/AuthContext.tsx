
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserData = {
  name?: string;
  surname?: string;
  email: string;
  childAge?: number;
  childGrade?: string;
  childGender?: 'male' | 'female' | 'other';
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (email: string, password: string) => void;
  signup: (userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);

  // Mock login function
  const login = (email: string, password: string) => {
    // No actual authentication, just simulate successful login
    setUser({ email });
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Mock signup function
  const signup = (userData: UserData) => {
    // No actual registration, just simulate successful signup
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
  };

  // Check if user was previously logged in (persistence across refreshes)
  React.useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
