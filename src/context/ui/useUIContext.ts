import { useContext } from 'react';
import { UIContext } from './uiContext';

// Custom hook for consuming UI context
export const useUIContext = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUIContext must be used within a UIProvider");
  }

  return context;
};