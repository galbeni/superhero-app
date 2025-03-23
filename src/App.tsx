import './App.css';
import { useState, useEffect } from 'react';
import { Header } from './components/header/Header';
import { Card } from './components/card/Card';
import { Filter } from './components/Filter';
import { IAppStates, IHero } from './types';

function App() {
  const initialState: IAppStates = {
    filterBy: "show-all",
    sortBy: "default",
    activeTab: "heroes",
    heroes: [],
    fullHeroes: [],
    publishers: [],
    powerstats: [],
    favorites: [],
    isFavorite: false,
    loading: false,
    currentPage: 1,
    heroesPerPage: 10,
    totalHeroes: 0,
  };

  const [state, setState] = useState<IAppStates>(initialState);
  const apiUrl = import.meta.env.VITE_API_URL as string;

// Fetch heroes from API with useEffect promise and async/await syntax with error handling
  const fetchHeroes = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      const response = await fetch(apiUrl);
      const data = await response.json();
  
      const start = (state.currentPage - 1) * state.heroesPerPage;
      const end = start + state.heroesPerPage;
      const paginatedData = data.slice(start, end);

      const publishers = data.reduce((acc: string[], hero: { biography: { publisher: string } }) => {
        const publisher = hero.biography.publisher;

        if (publisher && !acc.includes(publisher)) {
          acc.push(publisher);
        }

        return acc.sort(); // Sort publishers alphabetically
      }, []);

      const powerstats = data.reduce((acc: string[], hero: { powerstats: { [key: string]: string } }) => {
        const stats = Object.keys(hero.powerstats);

        stats.forEach(stat => {
          if (!acc.includes(stat)) acc.push(stat);
        });

        return acc.sort();
      }, []);

      setState(prev => ({
        ...prev,
        fullHeroes: data,
        heroes: [...prev.heroes, ...paginatedData],
        publishers,
        powerstats,
        totalHeroes: data.length,
        loading: false
      }));
    } catch (error) {
      console.error("Error fetching heroes:", error);
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  // Load favorites from localStorage with useEffect and JSON.parse
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
  
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setState(prev => ({ ...prev, favorites: parsedFavorites }));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);
      }
    }
  }, []);

  // Filter heroes by publisher
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPublisher = event.target.value;
    setState(prev => ({ ...prev, filterBy: selectedPublisher }));
  };

  // Sort heroes by powerstats
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    setState(prev => ({ ...prev, sortBy: selectedSort }));
  };

  // Adding/removing a hero from favorites and persisting in localStorage
  const toggleFavorite = (hero: IHero) => {
    const { favorites } = state;
    const isFavorite = favorites.some(fav => fav.id === hero.id);

    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== hero.id); // Remove from favorites
    } else {
      updatedFavorites = [...favorites, hero]; // Add to favorites
    }

    setState(prev => ({ ...prev, favorites: updatedFavorites }));
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Persist favorites in localStorage
  };

  const filteredFull = state.filterBy === "show-all"
    ? state.fullHeroes
    : state.fullHeroes.filter(hero => hero.biography.publisher === state.filterBy);

  const filteredHeroes = filteredFull
    .slice(0, state.currentPage * state.heroesPerPage) // Pagination
    .sort((a, b) => {
      const stat = state.sortBy;
      if (stat === "default") return 0;

      const aStat = a.powerstats?.[stat as keyof typeof a.powerstats] ?? 0;
      const bStat = b.powerstats?.[stat as keyof typeof b.powerstats] ?? 0;

      return bStat - aStat; // Descending order
    });

  const resetFilter = () => {
    setState(prev => ({ ...prev, filterBy: "show-all", sortBy: "default" }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
  
      if (bottom && !state.loading && state.heroes.length < state.totalHeroes) {
        setState((prev) => ({
          ...prev,
          currentPage: prev.currentPage + 1,
        }));
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.loading, state.heroes.length, state.totalHeroes]);

  return (
    <>
      <div className="flex bg-indigo-100 w-screen min-h-screen">
        <div className="container ml-auto mr-auto flex flex-col flex-wrap items-start">
          <div className="w-full pl-5 lg:pl-2 mb-4 mt-4">
            <h1 className="text-center text-4xl lg:text-4xl text-gray-700 font-extrabold">Superhero.App</h1>
            <h2 className="text-center text-3xl">
              {state.activeTab === "heroes" ? "Heroes" : state.activeTab === "favorites" ? "Favorites" : ""}
            </h2>
          </div>
          <Header
            activeTab={state.activeTab}
            setActiveTab={(tab: string) =>
              setState(prev => ({ ...prev, activeTab: tab }))
            }
          />
          <hr className="w-full p-2 border-gray-400 dark:border-white" />
          {state.activeTab === "heroes" && (
            <>
              <Filter
                filterBy={state.filterBy}
                sortBy={state.sortBy}
                handleFilterChange={handleFilterChange}
                handleSortChange={handleSortChange}
                publishers={state.publishers}
                powerstats={state.powerstats}
                resetFilter={resetFilter}
              />
              <div className="w-full flex flex-wrap">
                {filteredHeroes.map((hero: IHero) => (
                  <Card
                    key={hero.id}
                    hero={hero}
                    toggleFavorite={() => toggleFavorite(hero)}
                    isFavorite={state.favorites.some(fav => fav.id === hero.id)}
                  />
                ))}
              </div>
            </>
          )}
          {state.activeTab === "favorites" && (
            <>
              <div className="w-full flex flex-wrap">
                {state.favorites.length > 0 ? (
                  state.favorites.map((hero: IHero) => (
                    <Card
                      key={hero.id}
                      hero={hero}
                      toggleFavorite={() => toggleFavorite(hero)}
                      isFavorite={true}
                    />
                  ))
                ) : (
                  <p>No favorites yet...</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
