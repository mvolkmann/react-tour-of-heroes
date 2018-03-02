// @flow

import React, {Component} from 'react';
import {dispatchSet, watch} from 'redux-easy';

import type {HeroType} from '../types';

import './hero-detail.css';

type PropsType = {
  selectedHero: HeroType
};

export function showDetail(hero: HeroType): void {
  dispatchSet('selectedHero', hero);
  dispatchSet('route', 'Detail');
}

class HeroDetail extends Component<PropsType> {

  render() {
    const {selectedHero} = this.props;
    return (
      <div className="hero-detail">
        Detail for {selectedHero.name}!
      </div>
    );
  }
}

export default watch(HeroDetail, {selectedHero: ''});
