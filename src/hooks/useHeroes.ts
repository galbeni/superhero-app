import { useState, useEffect, useCallback } from 'react';
import { IHero } from '@/types';

export function useHeroes() {
  const [heroes, setHeroes] = useState<Array<IHero>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [powerstats, setPowerstats] = useState<Array<string>>([]);
  const [publishers, setPublishers] = useState<Array<string>>([]);

  const apiUrl = import.meta.env.VITE_API_URL as string;

  // Fetch heroes from API with useEffect and useCallback hooks
  // and async/await syntax with try/catch block for error handling
  const fetchHeroes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const data: Array<IHero> = await response.json();

      // Unique publishers from all heroes
      const uniquePublishers = Array.from(
        new Set(data.map(hero => hero.biography.publisher).filter(Boolean))
      ).sort((a, b) => a.localeCompare(b));

      // Unique powerstats from all heroes
      const uniqueStats = Array.from(
        new Set(data.flatMap(hero => Object.keys(hero.powerstats)))
      ).sort((a, b) => a.localeCompare(b));

      setHeroes(data);
      setPublishers(uniquePublishers);
      setPowerstats(uniqueStats);
    } catch (error) {
      console.error('Error fetching heroes:', error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  return {
    heroes,
    loading,
    powerstats,
    publishers
  };
}