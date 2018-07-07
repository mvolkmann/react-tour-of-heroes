// @flow

import React, {Component} from 'react';
import {
  dispatch,
  dispatchDelete,
  dispatchPush,
  dispatchSet,
  Input,
  watch
} from 'redux-easy';

import {showDetail} from '../hero-detail/hero-detail';
import {type HeroMapType, type HeroType, heroMapToList} from '../types';
import {deleteResource, getJson, postJson} from '../util/rest-util';

import './hero-list.css';

type PropsType = {
  filter: string,
  heroes: HeroMapType,
  newHeroName: string
};

class HeroList extends Component<PropsType> {
  addHero = async () => {
    if (this.canAdd()) {
      // Restore collection of heroes.
      const heroes = await getJson('hero');
      dispatchSet('heroes', heroes);

      // Add a new hero.
      const name = this.props.newHeroName;
      const id = await postJson('hero', {name});
      dispatch('addHero', id);

      dispatchPush('messages', 'added hero ' + name);
    }
  };

  /**
   * The user can add a hero if they have entered a name
   * and that name doesn't match an existing hero.
   * Since we filter the list based on the name entered,
   * we know the name matches an existing hero
   * if there are any heroes in the list.
   */
  canAdd = () => {
    const {heroes, newHeroName} = this.props;
    if (!newHeroName) return false;

    const heroList = heroMapToList(heroes);
    const matchesExisting = heroList.find(hero => hero.name === newHeroName);
    return !matchesExisting;
    //return newHeroName && Object.keys(heroes).length === 0;
  };

  deleteHero = async (
    event: SyntheticInputEvent<HTMLButtonElement>,
    hero: HeroType
  ) => {
    event.stopPropagation();
    const {id, name} = hero;
    try {
      await deleteResource('hero/' + id);
      dispatchDelete(`heroes.${id}`);
      dispatchPush('messages', 'deleted hero ' + name);
    } catch (e) {
      console.error('hero-list.js deleteHero: e =', e);
    }
  };

  /*
  filterList = async event => {
    const {value} = event.target;
    const path = value ? 'hero/contains/' + value : 'hero';
    const heroes = await getJson(path);
    dispatchSet('heroes', heroes);
  };
  */

  getAddForm = () => (
    <div className="add-form">
      <label>Hero Name:</label>
      <Input
        path="newHeroName"
        onChange={this.filterList}
        onEnter={this.addHero}
      />
      <button disabled={!this.canAdd()} onClick={this.addHero}>
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
    const {filter, heroes} = this.props;
    let heroList = heroMapToList(heroes);
    if (filter) heroList = heroList.filter(hero => hero.name.includes(filter));
    return (
      <div className="hero-list">
        <h2>My Heroes</h2>
        {this.getAddForm()}
        <div>
          <label>Filter</label>
          <Input path="filter" />
        </div>
        {heroList.map(hero => this.renderHero(hero))}
      </div>
    );
  }
}

export default watch(HeroList, {filter: '', heroes: '', newHeroName: ''});
