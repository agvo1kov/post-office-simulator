import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Human';
import Human from "./Human";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="street" />
        <div className="post-office">
            <div className="walls">
                <div className="wall top-left" />
                <div className="wall bottom-left" />
                <div className="wall top" />
                <div className="wall bottom" />
                <div className="wall top-right" />
                <div className="wall bottom-right" />
            </div>
        </div>
        <Human/>
      </div>
    );
  }
}

export default App;
