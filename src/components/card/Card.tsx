import { ICard } from "@/types";
import addIcon from '@/assets/icons/add.svg';

export const Card = ({ hero, toggleFavorite, isFavorite }: ICard) => {
  return (
    <div className="relative flex items-end overflow-hidden p-4 w-full text-white bg-white/10 shadow-md rounded-[15px] group h-[360px] transition-transform duration-500 ease-in-out hover:scale-[1.015]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:-translate-y-[4%] pointer-events-none"
        style={{ backgroundImage: `url(${hero.images?.md})` }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-black/0 to-black/80 -translate-y-1/2 opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out pointer-events-none"></div>
      <div className="relative flex flex-col items-center w-full p-4 transition-transform duration-500 ease-out group-hover:translate-y-0 translate-y-[calc(100%-4.5rem)] z-10">
        <div className="absolute inset-0 bg-black/40 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-[-1]"></div>
        <h2 className="text-xl font-bold leading-tight">{hero.name}</h2>
        <div className="mt-4 font-serif text-lg italic leading-snug opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 delay-75">
          {hero.powerstats && Object.entries(hero.powerstats).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-5 right-5 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
        <button
          onClick={() => toggleFavorite(hero)}
          className={`flex items-center justify-center rounded-full text-white hover:text-purple-900 hover:shadow-xl focus:outline-none w-10 h-10 flex ml-auto transition duration-300 cursor-pointer ${
            isFavorite ? 'bg-green-400 hover:bg-red-400' : 'bg-white hover:bg-gray-400'
          }`}
        >
          <img
            src={addIcon}
            alt="Add to favorites"
            title="Add to favorites"
            className="w-7 h-7"
          />
        </button>
      </div>
    </div>
  );
};