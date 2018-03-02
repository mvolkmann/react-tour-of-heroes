// @flow

import React, {Component} from 'react';
import {watch} from 'redux-easy';

import type {HeroType} from '../types';

import './dashboard.css';

type PropsType = {
  heroes: HeroType[]
};

class Dashboard extends Component<PropsType> {
  render() {
    const {heroes} = this.props;
    const topHeroes = heroes.slice(0, 4);
    return (
      <div className="dashboard">
        <h3>Top Heroes</h3>
        {topHeroes.map(hero =>
          <div key={hero.id} className="hero">{hero.name}</div>)}
      </div>
    );
  }
}

export default watch(Dashboard, {heroes: ''});
