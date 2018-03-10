// @flow

import type {StateType} from './types';

const initialState: StateType = {
  heroes: {},
  messages: [],
  newHeroName: '',
  previousRoute: '',
  route: 'Dashboard',
  selectedHero: null
};

export default initialState;
