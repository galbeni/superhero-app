import { createContext } from 'react';
import { IHero } from '@/types';

export interface FavoritesContextType {
  favorites: Array<IHero>;
  toggleFavorite: (hero: IHero) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(null);