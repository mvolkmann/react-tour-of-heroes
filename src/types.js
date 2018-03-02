// @flow

export type HeroType = {
  id: number,
  name: string
};

export type StateType = {
  heroes: HeroType[],
  messages: string[],
  route: string,
  selectedHero: ?HeroType
};
