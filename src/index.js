// @flow

import React from 'react';
import {addReducer, reduxSetup} from 'redux-easy';
import App from './App';

import type {HeroType, StateType} from './types';

const initialState: StateType = {
  heroes: [
    {id: 11, name: 'Mr. Nice'},
    {id: 12, name: 'Narco'},
    {id: 13, name: 'Bombasto'},
    {id: 14, name: 'Celeritas'},
    {id: 15, name: 'Magneta'},
    {id: 16, name: 'RubberMan'},
    {id: 17, name: 'Dynama'},
    {id: 18, name: 'Dr IQ'},
    {id: 19, name: 'Magma'},
    {id: 20, name: 'Tornado'}
  ],
  previousRoute: '',
  route: 'Dashboard',
  selectedHero: null
};

addReducer('selectHero',
  (state, hero: HeroType) => ({
    ...state,
    selectedHero: hero,
    previousRoute: state.route,
    route: 'Detail'
  })
);

reduxSetup({component: <App />, initialState});
