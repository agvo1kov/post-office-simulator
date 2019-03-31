import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './Human';
import Human from "./Human";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goalX: 0,
            goalY: 0
        };
    }
    moveGoal = (e) => {
        this.setState({
            goalX: e.clientX - 5,
            goalY: e.clientY - 5
        });
    };
    componentWillMount() {
        document.addEventListener('click', this.moveGoal, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.moveGoal, false);
    }

    render() {
    return (
      <div className="App">
        <div className="workspace">
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

                <div className="atm" />
                <div className="atm-shadow" />
            </div>
            <div className="goal" style={{
                top: this.state.goalY + 'px',
                left: this.state.goalX + 'px'
            }}/>
            <Human/>
        </div>
      </div>
    );
  }
}

export default App;
