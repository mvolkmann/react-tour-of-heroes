// @flow

import React from 'react';
import {reduxSetup} from 'redux-easy';

import App from './App';
import initialState from './initial-state';
import './reducers';

reduxSetup({component: <App />, initialState});
