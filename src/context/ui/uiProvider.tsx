import { useState, useMemo } from 'react';
import { UIContext } from './uiContext';

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('heroes');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBy, setFilterBy] = useState('show-all');
  const [sortBy, setSortBy] = useState('default');
  const [resetSignal, setResetSignal] = useState(0);

  const heroesPerPage = 10;

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setFilterBy('show-all');
    setSortBy('default');
    setCurrentPage(1);
    setResetSignal(prev => prev + 1);
  };

  const value = useMemo(() => ({
    activeTab,
    currentPage,
    filterBy,
    heroesPerPage,
    resetSignal,
    sortBy,
    handleFilterChange,
    handleSortChange,
    resetFilter,
    setActiveTab,
    setCurrentPage
  }), [activeTab, currentPage, filterBy, heroesPerPage, resetSignal, sortBy]);

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};