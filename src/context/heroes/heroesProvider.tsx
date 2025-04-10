import { useMemo } from 'react';
import { useHeroes } from '@/hooks/useHeroes';
import { HeroesContext } from './heroesContext';

export const HeroesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    heroes,
    loading,
    powerstats,
    publishers
  } = useHeroes();

  const value = useMemo(() => ({
    heroes,
    loading,
    powerstats,
    publishers
  }), [heroes, loading, powerstats, publishers]);

  return (
    <HeroesContext.Provider value={value}>
      {children}
    </HeroesContext.Provider>
  );
};