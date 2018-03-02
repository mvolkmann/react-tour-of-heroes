// @flow

import React, {Component} from 'react';
import {dispatch, dispatchSet, Input, watch} from 'redux-easy';

import type {HeroType} from '../types';

import './hero-detail.css';

type PropsType = {
  previousRoute: string,
  selectedHero: HeroType
};

function save() {
  console.log('hero-detail.js save: not implemented yet');
}

export const showDetail = (hero: HeroType) =>
  dispatch('selectHero', hero);

class HeroDetail extends Component<PropsType> {

  back = () =>
    dispatchSet('route', this.props.previousRoute);

  render() {
    const {selectedHero} = this.props;
    return (
      <div className="hero-detail">
        <h2>
          {selectedHero.name.toUpperCase()} Details
        </h2>
        <div className="id">
          id: {selectedHero.id}
        </div>
        <div className="name">
          <label>Name:</label>
          <Input path="selectedHero.name" />
        </div>
        <div className="buttons">
          <button onClick={this.back}>Back</button>
          <button onClick={save}>Save</button>
        </div>
      </div>
    );
  }
}

export default watch(HeroDetail, {
  previousRoute: '',
  selectedHero: ''
});
