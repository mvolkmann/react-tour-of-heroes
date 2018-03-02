// @flow

import React, {Component} from 'react';
import {dispatch, watch} from 'redux-easy';

import './messages.css';

type PropsType = {
  messages: string[]
};

const renderMessage = (message, index) => (
  <div
    className="message"
    key={'message' + index}
  >
    {message}
  </div>
);

const clear = () => dispatch('clearMessages');

class Messages extends Component<PropsType> {
  render() {
    const {messages} = this.props;
    if (messages.length === 0) return null;

    return (
      <div className="messages">
        <h3>Messages</h3>
        <button onClick={clear}>Clear</button>
        {messages.map(renderMessage)}
      </div>
    );
  }
}

export default watch(Messages, {messages: ''});
