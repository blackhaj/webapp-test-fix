import React, { useState, createContext, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export type FireToastProps = {
  message: string;
  type?: ToastType;
  duration?: number;
};

export type ToastContextData = {
  showToast: boolean;
  fireToast: ({
    message,
    type,
    duration,
  }: FireToastProps) => void | (() => void);
  timerId: NodeJS.Timeout | null;
  message?: FireToastProps['message'];
  type?: ToastType;
  hideToast?: () => void;
  cancelTimer?: () => void;
};

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData
);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [showToast, setShowToast] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [message, setMessage] = useState<FireToastProps['message'] | undefined>(
    undefined
  );
  const [type, setType] = useState<ToastType | undefined>(undefined);

  const fireToast = ({
    message,
    type = 'success',
    duration,
  }: FireToastProps) => {
    setMessage(message);
    setType(type);
    setShowToast(true);
    setTimerId(
      setTimeout(() => {
        setShowToast(false);
      }, duration || 3000)
    );
  };

  const hideToast = () => {
    setShowToast(false);
    setMessage(undefined);
    setType(undefined);
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
  };

  const cancelTimer = () => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
  };

  const initialValue = {
    showToast,
    fireToast,
    timerId,
    message,
    type,
    hideToast,
    cancelTimer,
  };

  return (
    <ToastContext.Provider value={initialValue}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
