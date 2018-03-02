// @flow

import {addReducer} from 'redux-easy';
import type {HeroType, StateType} from './types';

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

addReducer('selectHero',
  (state: StateType, hero: HeroType) => ({
    ...state,
    selectedHero: hero,
    previousRoute: state.route,
    route: 'Detail'
  })
);
