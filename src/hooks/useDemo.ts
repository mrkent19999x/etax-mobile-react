import { useContext } from 'react';
import { DemoContext } from '../contexts/DemoContext';
import type { DemoContextType } from '../contexts/DemoContext';

/**
 * Custom hook để sử dụng DemoContext
 * @returns DemoContextType - Context value với tất cả state và actions
 * @throws Error nếu sử dụng ngoài DemoProvider
 */
export const useDemo = (): DemoContextType => {
  const context = useContext(DemoContext);

  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }

  return context;
};


