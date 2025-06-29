import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface AuthResult {
    success: boolean;
    error?: any;
  }

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (name: string, email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

// Base API configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Request interceptor for auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await api.get('/auth/me');
          setUser(response.data);
        }
      } catch (err) {
        console.error('Authentication initialization error:', err);
        localStorage.removeItem('token');
        setError('Session expired. Please login again.');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setError(null);
      setLoading(true);
      const response = await api.post('/auth/login', { email, password });   //'http://localhost:8080/api/auth/login'
      
      localStorage.setItem('token', response.data.token);
      setUser({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role
      });
      return { success: true };
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'Invalid email or password';
        setError(errorMessage);
        return { success: false, error: errorMessage };
    }finally {
        setLoading(false);
      }
  };

  const register = async (name: string, email: string, password: string): Promise<AuthResult> => {
    try {
      setError(null);
      setLoading(true);
      await api.post('/auth/register', { name, email, password });
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    setUser(null);
  };


  const value = {
    user,
    isAdmin: user?.role === 'ADMIN',
    login,
    register,
    logout,
    loading,
    error,
    clearError: () => setError(null)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}