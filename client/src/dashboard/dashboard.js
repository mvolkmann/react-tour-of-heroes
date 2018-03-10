// @flow

import React, {Component} from 'react';
import {watch} from 'redux-easy';

import {showDetail} from '../hero-detail/hero-detail';
import {type HeroMapType, heroMapToList} from '../types';

import './dashboard.css';

type PropsType = {
  heroes: HeroMapType
};

const renderHero = hero => (
  <div
    className="hero"
    key={hero.id}
    onClick={() => showDetail(hero)}
  >
    {hero.name}
  </div>
);

class Dashboard extends Component<PropsType> {
  render() {
    const {heroes} = this.props;
    const heroList = heroMapToList(heroes);
    const topHeroes = heroList.slice(0, 4);
    return (
      <div className="dashboard">
        <h3>Top Heroes</h3>
        {topHeroes.map(renderHero)}
      </div>
    );
  }
}

export default watch(Dashboard, {heroes: ''});
