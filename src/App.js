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
        window.queues = [0, 0, 0, 0, 0];
        window.privacySpace = 65;
        // window.queueLength = (window.innerWidth - 740) / window.privacySpace;
        window.queueLength = 3;
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
        const workers = [1, 2, 3, 4];
        const workerItems = workers.map((number) =>
            <Human x={window.innerWidth - 170} y={number * (window.innerHeight * 0.8) / 4} kind="worker" deg={-90} key={number.toString()}/>
        );
        return (
          <div className="App">
            <div className="workspace">
                <div className="street" />
                <div className="post-office">
                    <div className="walls">
                        <div className="wall shadow top-left" />
                        <div className="wall shadow bottom-left" />
                        <div className="wall shadow top" />
                        <div className="wall shadow bottom" />
                        <div className="wall shadow top-right" />
                        <div className="wall shadow bottom-right" />

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
                <Human x={50} y={100} deg={0} stepDistance={Math.floor(Math.random() * 10) + 15} kind="client"/>
                <Human x={50} y={450} deg={0} stepDistance={Math.floor(Math.random() * 10) + 15} kind="client"/>
                <Human x={50} y={500} deg={0} stepDistance={Math.floor(Math.random() * 10) + 15} kind="client"/>
                <Human x={50} y={600} deg={0} stepDistance={Math.floor(Math.random() * 10) + 15} kind="client"/>
                {workerItems}
                <div className="window" />
            </div>
          </div>
        );
  }
}

export default App;
