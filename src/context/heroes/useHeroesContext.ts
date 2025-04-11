import { useContext } from 'react';
import { HeroesContext } from './heroesContext';

// Custom hook for consuming heroes context
export const useHeroesContext = () => {
  const context = useContext(HeroesContext);

  if (!context) {
    throw new Error("useHeroesContext must be used within a HeroesProvider");
  }

  return context;
};
