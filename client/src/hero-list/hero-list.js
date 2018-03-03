// @flow

import React, {Component} from 'react';
import {dispatch, Input, watch} from 'redux-easy';

import {showDetail} from '../hero-detail/hero-detail';
import type {HeroType} from '../types';

import './hero-list.css';

type PropsType = {
  heroes: HeroType[],
  newHeroName: string
};

class HeroList extends Component<PropsType> {

  addHero = () => {
    if (!this.disabled()) dispatch('addHero');
  };

  deleteHero = (hero: HeroType) => dispatch('deleteHero', hero.id);

  disabled = () => !this.props.newHeroName;

  getAddForm = () => (
    <div className="add-form">
      <label>Hero Name:</label>
      <Input path="newHeroName" onEnter={this.addHero} />
      <button disabled={this.disabled()} onClick={this.addHero}>
        Add
      </button>
    </div>
  );

  renderHero(hero) {
    return (
      <div
        className="hero"
        key={hero.id}
        onClick={() => showDetail(hero)}
      >
        <div className="hero-id">{hero.id}</div>
        <div className="hero-name">
          {hero.name}
          <button onClick={() => this.deleteHero(hero)}>&#215;</button>
        </div>
      </div>
    );
  }

  render() {
    console.log('hero-list.js render: entered');
    const {heroes} = this.props;
    return (
      <div className="hero-list">
        <h2>My Heroes</h2>
        {this.getAddForm()}
        {heroes.map(hero => this.renderHero(hero))}
      </div>
    );
  }
}

export default watch(HeroList, {heroes: '', newHeroName: ''});
