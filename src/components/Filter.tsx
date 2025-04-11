interface IFilter {
  filterBy: string;
  sortBy: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  publishers: string[];
  powerstats: string[];
  resetFilter: () => void;
}

export const Filter = ({
  filterBy,
  sortBy,
  handleFilterChange,
  handleSortChange,
  publishers,
  powerstats,
  resetFilter
}: IFilter) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4 ps-7 justify-center">
      <select
        value={filterBy}
        onChange={handleFilterChange}
        className="dropdown bg-white"
      >
        <option value="show-all">Show all</option>
        {publishers.map((publisher) => (
          <option
            key={publisher}
            value={publisher}
          >
            {publisher}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={handleSortChange}
        className="dropdown bg-white"
      >
        <option value="default">Default</option>
        {powerstats.map((powerstat) => (
          <option
            key={powerstat}
            value={powerstat}
          >
            {powerstat}
          </option>
        ))}
      </select>

      <button
        onClick={resetFilter}
        className="btn cursor-pointer text-white"
      >
        Reset
      </button>
    </div>
  );
};