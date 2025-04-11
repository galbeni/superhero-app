import { useMemo } from 'react';
import { useHeroesContext } from '@/context/heroes/useHeroesContext';
import { useUIContext } from '@/context/ui/useUIContext';

type PowerstatKey =
  | "combat"
  | "durability"
  | "intelligence"
  | "power"
  | "speed"
  | "strength";

export const useFilteredHeroes = () => {
  const { heroes } = useHeroesContext();

  const {
    currentPage,
    filterBy,
    heroesPerPage,
    sortBy
  } = useUIContext();

  const { filteredFull, filteredHeroes } = useMemo(() => {
    const filtered = filterBy === 'show-all'
      ? heroes
      : heroes.filter(hero => hero.biography.publisher === filterBy);

    const sorted = sortBy === 'default'
      ? filtered
      : [...filtered].sort((a, b) => {
          const statKey = sortBy as PowerstatKey;
          const aStat = a.powerstats?.[statKey] ?? 0;
          const bStat = b.powerstats?.[statKey] ?? 0;
          return bStat - aStat;
        });

    const paginated = sorted.slice(0, currentPage * heroesPerPage);

    return {
      filteredFull: filtered,
      filteredHeroes: paginated,
    };
  }, [currentPage, filterBy, heroes, heroesPerPage, sortBy]);

  return {
    filteredFull,
    filteredHeroes
  };
};