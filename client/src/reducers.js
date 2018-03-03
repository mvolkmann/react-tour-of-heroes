// @flow

import {addReducer} from 'redux-easy';
import type {HeroType, StateType} from './types';

addReducer('addHero',
  (state: StateType) => {
    const {heroes, newHeroName} = state;
    const {length} = heroes;
    const lastId = length ? heroes[length - 1].id : 0;
    const newHero = {id: lastId + 1, name: newHeroName};
    return {
      ...state,
      heroes: [...heroes, newHero],
      newHeroName: ''
    };
  }
);

addReducer('addMessage',
  (state: StateType, message: string) => ({
    ...state,
    messages: [...state.messages, message]
  })
);

addReducer('clearMessages',
  (state: StateType) => ({
    ...state,
    messages: []
  })
);

addReducer('deleteHero',
  (state: StateType, heroId: number) => {
    const {heroes} = state;
    const updatedHeroes = heroes.filter(hero => hero.id !== heroId);
    return {
      ...state,
      heroes: updatedHeroes
    };
  }
);

addReducer('selectHero',
  (state: StateType, hero: HeroType) => ({
    ...state,
    selectedHero: hero,
    previousRoute: state.route,
    route: 'Detail'
  })
);
