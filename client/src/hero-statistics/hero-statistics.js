// @flow

import React, {Component} from 'react';
import {watch} from 'redux-easy';

import {type HeroMapType, heroMapToList} from '../types';

import './hero-statistics.css';

type PropsType = {heroes: HeroMapType};

function getLongestName(nameList) {
  if (nameList.length === 0) return '';
  return nameList.reduce(
    (longest, name) => (name.length > longest.length ? name : longest),
    ''
  );
}

function getShortestName(nameList) {
  if (nameList.length === 0) return '';
  const [firstName] = nameList;
  return nameList.reduce(
    (shortest, name) => (name.length < shortest.length ? name : shortest),
    firstName
  );
}

class HeroStatistics extends Component<PropsType> {
  render() {
    const nameList = heroMapToList(this.props.heroes).map(hero => hero.name);
    return (
      <div className="hero-statistics">
        <div>
          <label># of heroes:</label> {nameList.length}
        </div>
        <div>
          <label>Shortest Name:</label> {getShortestName(nameList)}
        </div>
        <div>
          <label>Longest Name:</label> {getLongestName(nameList)}
        </div>
      </div>
    );
  }
}

export default watch(HeroStatistics, {heroes: ''});
