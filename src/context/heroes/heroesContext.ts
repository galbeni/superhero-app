import { createContext } from 'react';
import { IHero } from '@/types';

interface HeroesContextType {
  heroes: Array<IHero>;
  loading: boolean;
  powerstats: Array<string>;
  publishers: Array<string>;
}

export const HeroesContext = createContext<HeroesContextType | null>(null);
