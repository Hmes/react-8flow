import React from 'react';
import { ToastType } from '@/providers/toast/types';

interface ToastProps {
  type: ToastType;
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ type, message }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div 
      className={`
        fixed top-4 right-4 ${bgColor} text-white 
        px-4 py-2 rounded shadow-lg
      `}
    >
      {message}
    </div>
  );
};