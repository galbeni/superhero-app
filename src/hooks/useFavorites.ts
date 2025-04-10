import { useState, useEffect, useCallback } from 'react';
import { IHero } from '@/types';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Array<IHero>>([]);

  // Load favorites from localStorage with useEffect and JSON.parse
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');

    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      }
    }
  }, []);

  // Adding/removing a hero from favorites and persisting in localStorage
  const toggleFavorite = useCallback((hero: IHero) => {
    const isFavorite = favorites.some(favorite => favorite.id === hero.id);
    let updatedFavorites: Array<IHero> = [];

    if (isFavorite) {
      updatedFavorites = favorites.filter(favorite => favorite.id !== hero.id);
    } else {
      updatedFavorites = [...favorites, hero]; // Add to favorites
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
  };
}