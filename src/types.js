// @flow

export type HeroType = {
  id: number,
  name: string
};

export type StateType = {
  heroes: HeroType[],
  route: string,
  selectedHero: ?HeroType
};
