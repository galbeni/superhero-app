import { useMemo } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { FavoritesContext } from './favoritesContext';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    favorites,
    toggleFavorite
  } = useFavorites();

  const value = useMemo(() => ({
    favorites,
    toggleFavorite
  }), [favorites, toggleFavorite]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};