import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Human';
import Human from "./Human";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="post-office" />
        <Human/>
      </div>
    );
  }
}

export default App;
