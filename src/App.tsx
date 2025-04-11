import './App.css';
import { HeroSection } from './components/HeroSection';
import { Filter } from './components/Filter';
import { useHeroesContext } from './context/heroes/useHeroesContext';
import { useFavoritesContext } from './context/favorites/useFavoritesContext';
import { useUIContext } from './context/ui/useUIContext';
import { HeroList } from './components/lists/HeroList';
import { FavoriteList } from './components/lists/FavoriteList';

function App() {
  const {
    powerstats,
    publishers
  } = useHeroesContext();

  const { favorites } = useFavoritesContext();

  const {
    activeTab,
    filterBy,
    handleFilterChange,
    handleSortChange,
    resetFilter,
    sortBy
  } = useUIContext();

  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <div className="flex min-h-screen items-center justify-center flex-col lg:flex-row">
        <HeroSection />
        <div className="flex bg-black w-screen min-h-screen">
          <div className="container ml-auto mr-auto flex flex-col flex-wrap items-start">
            {activeTab === "heroes" && (
              <>
                {<Filter
                  filterBy={filterBy}
                  sortBy={sortBy}
                  handleFilterChange={handleFilterChange}
                  handleSortChange={handleSortChange}
                  publishers={publishers}
                  powerstats={powerstats}
                  resetFilter={resetFilter}
                />}
                <HeroList />
              </>
            )}
            {activeTab === "favorites" && (
              favorites.length > 0 ? (
                <FavoriteList />
              ) : (
                <p className="text-center w-full py-4 text-gray-600">No favorites yet...</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;