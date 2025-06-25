
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUser, 
  getUserByEmail, 
  createSession, 
  validateSession, 
  deleteSession,
  User 
} from '../lib/database';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const NeonAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simple password hashing (in production, use proper bcrypt or similar)
  const hashPassword = (password: string): string => {
    return btoa(password); // Basic encoding - replace with proper hashing
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      // Check if user already exists
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Create user in database
      const user = await createUser(email, displayName);
      
      // Store password hash in localStorage (in production, handle this server-side)
      localStorage.setItem(`password_${email}`, hashPassword(password));
      
      // Create session
      const sessionToken = await createSession(user.id);
      localStorage.setItem('sessionToken', sessionToken);
      
      setCurrentUser(user);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Get user from database
      const user = await getUserByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify password (in production, verify against server-side hash)
      const storedPasswordHash = localStorage.getItem(`password_${email}`);
      if (storedPasswordHash !== hashPassword(password)) {
        throw new Error('Invalid password');
      }

      // Create session
      const sessionToken = await createSession(user.id);
      localStorage.setItem('sessionToken', sessionToken);
      
      setCurrentUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const sessionToken = localStorage.getItem('sessionToken');
      if (sessionToken) {
        await deleteSession(sessionToken);
        localStorage.removeItem('sessionToken');
      }
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const sessionToken = localStorage.getItem('sessionToken');
        if (sessionToken) {
          const user = await validateSession(sessionToken);
          if (user) {
            setCurrentUser(user);
          } else {
            localStorage.removeItem('sessionToken');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('sessionToken');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
