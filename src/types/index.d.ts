export interface IAppStates {
  filterBy: string;
  sortBy: string;
  activeTab: string;
  fullHeroes: Array<IHero>;
  heroes: Array<IHero>;
  publishers: Array<string>;
  powerstats: Array<string>;
  favorites: Array<IHero>;
  isFavorite: boolean;
  loading: boolean;
  currentPage: number;
  heroesPerPage: number;
  totalHeroes: number;
}

export interface IHeader {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface IHero {
  id: number | string;
  images: {
    md: string;
    [key: string]: string;
  };
  name: string;
  biography: {
    publisher: string;
    [key: string]: string;
  };
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
}

export interface ICard {
  hero: IHero;
  toggleFavorite: (hero: Hero) => void;
  isFavorite: boolean;
}

export interface IFilter {
  filterBy: string;
  sortBy: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  publishers: string[];
  powerstats: string[];
  resetFilter: () => void;
}