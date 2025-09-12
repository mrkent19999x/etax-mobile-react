import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { demoManager } from '../utils/DemoManager';
import type { DemoTokenData } from '../utils/DemoManager';

interface DemoContextType {
  // State
  isDemoMode: boolean;
  isLoading: boolean;
  error: string | null;
  clientData: DemoTokenData['data'] | null;
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
  const [clientData, setClientData] = useState<DemoTokenData['data'] | null>(null);
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

        await demoManager.init();
        
        const token = demoManager.getCurrentToken();
        const isValid = demoManager.validateToken();
        const isExpired = demoManager.isTokenExpired();
        const data = demoManager.getClientData();
        const name = demoManager.getClientName();
        const expiry = demoManager.getExpiryDate();

        setCurrentToken(token);
        setIsTokenValid(isValid);
        setIsTokenExpired(isExpired);
        setClientData(data);
        setClientName(name);
        setExpiryDate(expiry);
        setIsDemoMode(!!token);

        // Nếu token hết hạn, redirect về login
        if (token && isExpired) {
          setTimeout(() => {
            demoManager.redirectToLogin();
          }, 3000);
        }

      } catch (err) {
        console.error('Error initializing demo:', err);
        setError(err instanceof Error ? err.message : 'Lỗi khởi tạo demo');
      } finally {
        setIsLoading(false);
      }
    };

    initializeDemo();
  }, []);

  // Actions
  const validateLogin = (mst: string, password: string): boolean => {
    try {
      const isValid = demoManager.validateLogin(mst, password);
      
      if (isValid) {
        // Update state after successful login
        const data = demoManager.getClientData();
        const name = demoManager.getClientName();
        const expiry = demoManager.getExpiryDate();
        
        setClientData(data);
        setClientName(name);
        setExpiryDate(expiry);
        setIsDemoMode(true);
        setError(null);
      }
      
      return isValid;
    } catch (err) {
      console.error('Error validating login:', err);
      setError('Lỗi xác thực đăng nhập');
      return false;
    }
  };

  const logout = () => {
    try {
      demoManager.logout();
      setIsDemoMode(false);
      setClientData(null);
      setCurrentToken(null);
      setIsTokenValid(false);
      setIsTokenExpired(false);
      setExpiryDate(null);
      setClientName(null);
      setError(null);
    } catch (err) {
      console.error('Error during logout:', err);
      setError('Lỗi đăng xuất');
    }
  };

  const redirectToDashboard = () => {
    try {
      demoManager.redirectToDashboard();
    } catch (err) {
      console.error('Error redirecting to dashboard:', err);
      setError('Lỗi chuyển hướng');
    }
  };

  const redirectToLogin = () => {
    try {
      demoManager.redirectToLogin();
    } catch (err) {
      console.error('Error redirecting to login:', err);
      setError('Lỗi chuyển hướng');
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Context value
  const contextValue: DemoContextType = {
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
    <DemoContext.Provider value={contextValue}>
      {children}
    </DemoContext.Provider>
  );
};

// Custom hook để sử dụng DemoContext
export const useDemo = (): DemoContextType => {
  const context = useContext(DemoContext);
  
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  
  return context;
};

// Export context để sử dụng trong components khác
export { DemoContext };
