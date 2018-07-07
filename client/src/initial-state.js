// @flow

import type {StateType} from './types';

const initialState: StateType = {
  filter: '',
  heroes: {},
  messages: [],
  newHeroName: '',
  previousRoute: '',
  route: 'Dashboard',
  selectedHero: null
};

export default initialState;
