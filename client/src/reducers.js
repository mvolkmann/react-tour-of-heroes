// @flow

import {addReducer} from 'redux-easy';
import type {HeroType, StateType} from './types';

addReducer('addHero', (state: StateType, id: number) => {
  const {heroes, newHeroName} = state;
  const newHero = {id, name: newHeroName};
  return {
    ...state,
    heroes: {...heroes, [id]: newHero},
    newHeroName: ''
  };
});

addReducer('selectHero', (state: StateType, hero: HeroType) => ({
  ...state,
  selectedHero: hero,
  previousRoute: state.route,
  route: 'Detail'
}));
