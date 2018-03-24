// @flow

import React, {Component} from 'react';
import {dispatch, dispatchPush, dispatchSet, Input, watch} from 'redux-easy';
import {putJson} from '../util/rest-util';

import type {HeroType} from '../types';

import './hero-detail.css';

type PropsType = {
  previousRoute: string,
  selectedHero: HeroType
};

export const showDetail = (hero: HeroType) => dispatch('selectHero', hero);

class HeroDetail extends Component<PropsType> {
  back = () => dispatchSet('route', this.props.previousRoute);

  save = async () => {
    const {selectedHero} = this.props;
    const {id, name} = selectedHero;
    try {
      await putJson('hero/' + id, {name});
      dispatchSet(`heroes.${id}`, {...selectedHero, name});
      dispatchPush('messages', 'modified hero ' + name);
    } catch (e) {
      console.error('hero-detail.js save: e =', e);
    }
  };

  render() {
    const {selectedHero} = this.props;
    return (
      <div className="hero-detail">
        <h2>{selectedHero.name.toUpperCase()} Details</h2>
        <div className="id">id: {selectedHero.id}</div>
        <div className="name">
          <label>Name:</label>
          <Input path="selectedHero.name" />
        </div>
        <div className="buttons">
          <button onClick={this.back}>Back</button>
          <button onClick={this.save}>Save</button>
        </div>
      </div>
    );
  }
}

export default watch(HeroDetail, {
  previousRoute: '',
  selectedHero: ''
});
