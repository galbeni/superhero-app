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