// @flow

export type HeroType = {
  id: number,
  name: string
};

export type HeroMapType = {[id: number]: HeroType};

export type StateType = {
  heroes: HeroMapType,
  messages: string[],
  newHeroName: string,
  route: string,
  selectedHero: ?HeroType
};

export const heroListToMap = (heroList: HeroType[]): HeroMapType =>
  heroList.reduce((map, hero) => {
    map[hero.id] = hero;
    return map;
  }, {});

export const heroMapToList = (heroMap: HeroMapType): HeroType[] =>
  ((Object.values(heroMap): any): HeroType[]);
