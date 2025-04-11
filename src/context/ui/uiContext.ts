import { createContext } from 'react';

export interface UIContextType {
  activeTab: string;
  currentPage: number;
  filterBy: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  heroesPerPage: number;
  resetFilter: () => void;
  resetSignal: number;
  setActiveTab: (tab: string) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  sortBy: string;
}

export const UIContext = createContext<UIContextType | null>(null);