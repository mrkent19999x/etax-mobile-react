import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { SimpleDemoManager } from '../services/SimpleDemoManager';

interface DemoContextType {
  // State
  isDemoMode: boolean;
  isLoading: boolean;
  error: string | null;
  clientData: any;
  currentToken: string | null;
  isTokenValid: boolean;
  isTokenExpired: boolean;
  expiryDate: Date | null;
  clientName: string | null;

  // Actions
  validateLogin: (mst: string, password: string) => boolean;
  logout: () => void;
  redirectToDashboard: () => void;
  redirectToLogin: () => void;
  clearError: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

interface DemoProviderProps {
  children: ReactNode;
}

export const DemoProvider: React.FC<DemoProviderProps> = ({ children }) => {
  // State
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientData, setClientData] = useState<any>(null);
  const [currentToken, setCurrentToken] = useState<string | null>(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [clientName, setClientName] = useState<string | null>(null);

  // Initialize demo system
  useEffect(() => {
    const initializeDemo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get token from URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
          // Validate token using SimpleDemoManager
          const demo = SimpleDemoManager.validateToken(token);
          if (demo) {
            setIsDemoMode(true);
            setClientData(demo.content);
            setCurrentToken(token);
            setIsTokenValid(true);
            setClientName(demo.name);
            
            // Check expiry
            const expiry = new Date(demo.expires);
            setExpiryDate(expiry);
            setIsTokenExpired(expiry <= new Date());
          } else {
            setError('Demo token không hợp lệ hoặc đã hết hạn');
            setIsTokenExpired(true);
          }
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi khởi tạo demo');
        console.error('Demo initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDemo();
  }, []);

  // Actions
  const validateLogin = (_mst: string, _password: string): boolean => {
    // For demo mode, always return true if token is valid
    if (isDemoMode && isTokenValid && !isTokenExpired) {
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsDemoMode(false);
    setClientData(null);
    setCurrentToken(null);
    setIsTokenValid(false);
    setIsTokenExpired(false);
    setExpiryDate(null);
    setClientName(null);
    setError(null);
    
    // Clear localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('etax_logged_in_user');
    localStorage.removeItem('etax_user');
    localStorage.removeItem('user');
  };

  const redirectToDashboard = () => {
    window.location.href = '/etax-mobile-react/dashboard';
  };

  const redirectToLogin = () => {
    window.location.href = '/etax-mobile-react/login';
  };

  const clearError = () => {
    setError(null);
  };

  const value: DemoContextType = {
    // State
    isDemoMode,
    isLoading,
    error,
    clientData,
    currentToken,
    isTokenValid,
    isTokenExpired,
    expiryDate,
    clientName,

    // Actions
    validateLogin,
    logout,
    redirectToDashboard,
    redirectToLogin,
    clearError,
  };

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = (): DemoContextType => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};