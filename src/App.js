// @flow

import React, {Component} from 'react';
import {dispatchSet} from 'redux-easy';
import Dashboard from './dashboard/dashboard';
import HeroList from './hero-list/hero-list';

import './App.css';

type PropsType = {};

class App extends Component<PropsType> {
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
        <Dashboard />
        <HeroList />
      </div>
    );
  }
}

export default App;
