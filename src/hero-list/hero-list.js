// @flow

import React, {Component} from 'react';
import {watch} from 'redux-easy';

import type {HeroType} from '../types';

import './hero-list.css';

type PropsType = {
  heroes: HeroType[]
};

class HeroList extends Component<PropsType> {
  renderHero(hero) {
    return (
      <div className="hero" key={hero.id}>
        <div className="hero-id">{hero.id}</div>
        <div className="hero-name">
          {hero.name}
          <button>&#215;</button>
        </div>
      </div>
    );
  }

  render() {
    console.log('hero-list.js render: entered');
    const {heroes} = this.props;
    return (
      <div className="hero-list">
        {heroes.map(hero => this.renderHero(hero))}
      </div>
    );
  }
}

export default watch(HeroList, {heroes: ''});
