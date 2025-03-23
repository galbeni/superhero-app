import { IFilter } from "../types";

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
    <>
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        <select
          value={filterBy}
          onChange={handleFilterChange}
          className="dropdown bg-white"
        >
          <option value="show-all">Show all</option>
          {publishers.map((publisher, index) => (
            <option key={index} value={publisher}>
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
          {powerstats.map((powerstat, index) => (
            <option key={index} value={powerstat}>
              {powerstat}
            </option>
          ))}
        </select>

        <button
          onClick={resetFilter}
          className="btn cursor-pointer"
        >
          Reset
        </button>
      </div>
    </>
  );
};