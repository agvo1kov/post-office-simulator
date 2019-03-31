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
            goalY: 0,
            population: 0,
        };
        window.queues = [
            [],
            [],
            [],
            [],
            [],
        ];
        window.privacySpace = 65;
        window.queueLength = Math.round((window.innerWidth - 740) / window.privacySpace);
        console.log(window.queueLength);
        // window.queueLength = 3;
    }
    moveGoal = (e) => {
        this.setState({
            goalX: e.clientX - 5,
            goalY: e.clientY - 5
        });
    };
    componentDidMount() {
        document.addEventListener('click', this.moveGoal, false);
        setInterval(() => {
        }, 2000);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.moveGoal, false);
    }

    render() {
        const workers = [1, 2, 3, 4];
        const workerItems = workers.map((number) =>
            <Human x={window.innerWidth - 180} y={number * (window.innerHeight * 0.8) / 4} stepDistance={15}kind="worker" deg={-90} key={'worker'+number.toString()} code={'worker'+number.toString()}/>
        );
        const clients = [];
        for (let i = 1; i < 10; i++) {
            clients.push(i);
        }
        const clientItems = clients.map((number) =>
            <Human x={0} y={number * (window.innerHeight * 0.8) / 4 * (number > 5 ? 1.5 : 1) + 200} stepDistance={15}kind="client" deg={-90} key={'client'+number.toString()} code={'client'+number.toString()}/>
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

                    <div className="top-stack shadow" />
                    <div className="top-stack" />

                    <div className="bottom-stack shadow" />
                    <div className="bottom-stack" />
                </div>
                <div className="goal" style={{
                    top: this.state.goalY + 'px',
                    left: this.state.goalX + 'px'
                }}/>
                <div id="population">
                    {clientItems}
                    {workerItems}
                </div>
                <div className="window" />
            </div>
          </div>
        );
  }
}

export default App;
