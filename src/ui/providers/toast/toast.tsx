import { createContext, useCallback, useContext, useState } from 'react';
import { Toast } from '@/components/Toast';
import { ToastType } from './types';

interface ToastProps {
  renderToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastProps | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{type: ToastType; message: string} | null>(null)
  
  const renderToast = useCallback((type: ToastType, message: string) => {
    setToast({type, message});
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <ToastContext.Provider
      value={{renderToast}}>
      {children}
      {toast && <Toast type={toast.type} message={toast.message} />}
    </ToastContext.Provider>
  );
}

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
