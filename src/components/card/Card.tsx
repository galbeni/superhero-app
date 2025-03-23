import { ICard } from "../../types";
import addIcon from '../../assets/icons/add.svg';

export const Card = ({ hero, toggleFavorite, isFavorite }: ICard) => {
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/4 pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2">
        <div className="bg-white rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
          <figure className="mb-2">
            <img
              src={hero.images?.md}
              className="h-64 ml-auto mr-auto"
              loading="lazy"
              alt={hero.name}
            />
          </figure>
          <div className="rounded-lg p-4 bg-sky-500/100 flex flex-col">
            <div>
              <h5 className="text-white text-2xl font-bold leading-none">
                {hero.name}
              </h5>
              <div className="text-lg text-white font-light">
                {hero.biography?.publisher}
              </div>
              <span>
                {hero.powerstats && Object.entries(hero.powerstats).map(([key, value]) => (
                  <div key={key} className="text-xs text-white leading-none">
                    {key}: {value}
                  </div>
                ))}
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => toggleFavorite(hero)}
                className={`rounded-full text-white hover:text-purple-900 hover:shadow-xl focus:outline-none w-10 h-10 flex ml-auto transition duration-300 cursor-pointer ${
                  isFavorite ? 'bg-green-400 hover:bg-red-400' : 'bg-white hover:bg-gray-400'
                }`}
              >
                <img
                  src={addIcon}
                  alt="Add to favorites"
                  title="Add to favorites"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};