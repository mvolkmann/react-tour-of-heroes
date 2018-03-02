// @flow

import React from 'react';
import {reduxSetup} from 'redux-easy';
import App from './App';

import type {StateType} from './types';

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
  route: 'Dashboard',
  selectedHero: null
};

reduxSetup({component: <App />, initialState});
