// @flow

import React from 'react';
import {dispatchSet, reduxSetup} from 'redux-easy';

import App from './App';
import initialState from './initial-state';
import './reducers';
import {getJson} from './util/rest-util';

reduxSetup({component: <App />, initialState});

async function loadHeroes() {
  const heroes = await getJson('hero');
  dispatchSet('heroes', heroes);
}

loadHeroes();
