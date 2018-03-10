// @flow

import React, {Component} from 'react';
import {dispatchSet, watch} from 'redux-easy';
import Dashboard from './dashboard/dashboard';
import HeroDetail from './hero-detail/hero-detail';
import HeroList from './hero-list/hero-list';
import Messages from './messages/messages';
import {getJson} from './util/rest-util';

import {type HeroType, heroListToMap} from './types';

import './App.css';

type PropsType = {
  route: string
};

const routeMap = {
  Dashboard: <Dashboard />,
  Detail: <HeroDetail />,
  Heroes: <HeroList />
};

class App extends Component<PropsType> {
  async componentDidMount() {
    const heroes = ((await getJson('hero'): any): HeroType[]);
    dispatchSet('heroes', heroListToMap(heroes));
  }

  getButtons() {
    return (
      <div className="buttons">
        <button onClick={this.show}>Dashboard</button>
        <button onClick={this.show}>Heroes</button>
      </div>
    );
  }

  show = (event: SyntheticInputEvent<HTMLButtonElement>) => {
    const {textContent} = event.target;
    dispatchSet('route', textContent);
  };

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Tour of Heroes</h1>
        {this.getButtons()}
        {routeMap[this.props.route]}
        <Messages />
      </div>
    );
  }
}

export default watch(App, {route: ''});
