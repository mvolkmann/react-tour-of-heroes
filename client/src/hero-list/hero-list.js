// @flow

import React, {Component} from 'react';
import {dispatch, dispatchFilter, dispatchPush, Input, watch} from 'redux-easy';

import {showDetail} from '../hero-detail/hero-detail';
import type {HeroType} from '../types';
import {deleteResource, postJson} from '../util/rest-util';

import './hero-list.css';

type PropsType = {
  heroes: HeroType[],
  newHeroName: string
};

class HeroList extends Component<PropsType> {
  addHero = async () => {
    if (!this.disabled()) {
      const name = this.props.newHeroName;
      const id = await postJson('hero', {name});
      dispatch('addHero', id);
      dispatchPush('messages', 'added hero ' + name);
    }
  };

  deleteHero = async (
    event: SyntheticInputEvent<HTMLButtonElement>,
    hero: HeroType
  ) => {
    event.stopPropagation();
    const {id, name} = hero;
    try {
      await deleteResource('hero/' + id);
      dispatchFilter('heroes', hero => hero.id !== id);
      dispatchPush('messages', 'delete hero ' + name);
    } catch (e) {
      console.error('hero-list.js deleteHero: e =', e);
    }
  };

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
      <div className="hero" key={hero.id} onClick={() => showDetail(hero)}>
        <div className="hero-id">{hero.id}</div>
        <div className="hero-name">
          {hero.name}
          <button
            className="delete-btn"
            onClick={event => this.deleteHero(event, hero)}
          >
            &#215;
          </button>
        </div>
      </div>
    );
  }

  render() {
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
