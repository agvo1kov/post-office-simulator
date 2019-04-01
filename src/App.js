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
            ATMDisplay: 'none',
            menu: 'main',
            windowNumber: 3,
            ticketNumber: '005',
            service: 'получить денег',
            queueLength: 0,
            waitForMinutes: 0,
            waitForSeconds: 0,
        };
        window.number = 0;
        window.queues = [
            [],
            [],
            [],
            [],
            [],
        ];
        window.times = [
            [],
            [],
            [],
            [],
            [],
        ];
        window.privacySpace = 65;
        window.queueLength = Math.round((window.innerWidth - 740) / window.privacySpace);
        // console.log(window.queueLength);
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
        // this.showATM();

        setInterval(() => {
            // window.times = window.times.map((i) => {
            //     return i.map((sec) => {
            //         return sec > 0 ? sec - 1 : 0;
            //     });
            // });
            console.log(window.times);
        }, 1000);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.moveGoal, false);
    }

    showATM = (callback) => {
        this.setState({
            ATMDisplay: 'flex',
            menu: 'main',
        }, () => {});
        this.callback = callback;
    };

    hideATM = () => {
        this.setState({
            ATMDisplay: 'none'
        }, () => {});
    };

    toGet = () => {
        this.setState({menu: 'get'}, () => {});
    };

    toSend = () => {
        this.setState({menu: 'send'}, () => {});
    };

    toPay = () => {
        this.hideATM();
        this.callback('pay');
    };

    toChill = () => {
        this.hideATM();
        this.callback('chill');
    };

    toGetMail = () => {
        this.hideATM();
        this.callback('get-mail');
    };

    toGetBox = () => {
        this.hideATM();
        this.callback('get-box');
    };

    toGetMoney = () => {
        this.hideATM();
        this.callback('get-money');
    };

    toGetPackage = () => {
        this.hideATM();
        this.callback('get-package');
    };

    toSendMail = () => {
        this.hideATM();
        this.callback('send-mail');
    };

    toSendBox = () => {
        this.hideATM();
        this.callback('send-box');
    };

    toSendMoney = () => {
        this.hideATM();
        this.callback('send-money');
    };

    toSendDocuments = () => {
        this.hideATM();
        this.callback('send-documents');
    };

    humanChosen = (windowNumber, service, myNumber, code, goal) => {
        // console.log(windowNumber, service);
        clearInterval(this.secondInterval);

        const services = {
            'pay': 'оплатить штраф',
            'get-mail': 'получить письмо',
            'get-box': 'получить посылку',
            'get-money': 'получить пенсию',
            'get-package': 'мелкий пакет',
            'send-mail': 'отправить письмо',
            'send-box': 'отправить посылку',
            'send-money': 'отправить перевод',
            'send-documents': 'отправить документы',
        };

        // console.log(windowNumber, typeof windowNumber);
        this.setState({
            goal: goal
        }, () => {});
        this.myCode = code;
        this.myNumber = myNumber;

        let waitFor = 0;
        for (let i = 0; i < this.myNumber + 1; i++) {
            waitFor += window.times[windowNumber][i];
        }

        const minutes = Math.floor(waitFor / 60);
        const seconds = waitFor % 60;

        this.secondInterval = setInterval(() => {
            let waitFor = 0;
            for (let i = 0; i < this.myNumber + 1; i++) {
                waitFor += window.times[windowNumber][i];
            }

            const minutes = Math.floor(waitFor / 60);
            const seconds = waitFor % 60;

            // console.log(this.myNumber);

            this.setState({
                waitForMinutes: minutes,
                waitForSeconds: seconds,
                queueLength: this.myNumber + 1,
            }, () => {});
        }, 1000);

        let code2 = code.split('client')[1];
        if (code2.length === 1) {
            code2 = '00' + code2;
        }
        if (code2.length === 2) {
            code2 = '0' + code2;
        }

        this.setState({
            windowNumber: windowNumber,
            service: services[service],
            queueLength: myNumber + 1,
            waitForMinutes: minutes,
            waitForSeconds: seconds,
            ticketNumber: code2,
        }, () => {});
    };

    queued = (myNumber, code) => {
        if (this.myCode === code) {
            this.myNumber = myNumber;
        }
    };

    quited = (code) => {
        if (this.myCode === code) {
            this.setState({
                goal: 'quit'
            }, () => {});
        }
    };

    windowed = (code) => {
        if (this.myCode === code) {
            this.setState({
                goal: 'window'
            }, () => {});
        }
    };

    updateMe =(windowNumber, service, myNumber, code, goal) => {
      if (this.myCode === code) {
          this.humanChosen(windowNumber, service, myNumber, code, goal);
      }
    };

    render() {
        const workers = [1, 2, 3, 4];
        const workerItems = workers.map((number) =>
            <Human x={window.innerWidth - 180} y={number * (window.innerHeight * 0.8) / 4} stepDistance={15}kind="worker" deg={-90} key={'worker'+number.toString()} code={'worker'+number.toString()}/>
        );
        const clients = [];
        for (let i = 1; i < 8; i++) {
            clients.push(i);
        }

        let ticketClass = "tickets";
        if (this.state.goal !== 'window') {
            ticketClass += " outed";
        }

        const clientItems = clients.map((number) =>
            <Human x={0}
                   y={number * (window.innerHeight * 0.8) / 4 * (number > 5 ? 1.5 : 1) + 200}
                   stepDistance={15}
                   kind="client"
                   deg={-90} key={'client'+number.toString()}
                   code={'client'+number.toString()}
                   showATM={this.showATM}
                   onClick={this.humanChosen}
                   queued={this.queued}
                   quited={this.quited}
                   windowed={this.windowed}
                   update={this.updateMe}
            />
        );
        return (
          <div className="App">
            <div className="workspace">
                <div className="street" />
                <div className="post-office">
                    <div className="shadows">
                        <div className="window-shadow" />
                    </div>
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
                {/*<div className="goal" style={{*/}
                    {/*top: this.state.goalY + 'px',*/}
                    {/*left: this.state.goalX + 'px'*/}
                {/*}}/>*/}
                <div id="population">
                    {clientItems}
                    {workerItems}
                </div>
                <div className="window" />
            </div>
            <div className="ATM"
                 style={{
                     display: this.state.ATMDisplay
                 }}>
                <div className="main-group"
                    style={{
                        display: this.state.menu === 'main' ? 'flex' : 'none'
                    }}>
                    <div className="item" onClick={this.toGet}>Получить</div>
                    <div className="item" onClick={this.toSend}>Отправить</div>
                    <div className="item" onClick={this.toPay}>Оплатить штраф</div>
                    <div className="item" onClick={this.toChill}>Чилить</div>
                </div>
                <div className="get-group"
                     style={{
                         display: this.state.menu === 'get' ? 'flex' : 'none'
                     }}>
                    <div className="item" onClick={this.toGetMail}>Письмо</div>
                    <div className="item" onClick={this.toGetBox}>Посылку</div>
                    <div className="item" onClick={this.toGetMoney}>Пенсию</div>
                    <div className="item" onClick={this.toGetPackage}>Мелкий пакет</div>
                </div>
                <div className="send-group"
                     style={{
                         display: this.state.menu === 'send' ? 'flex' : 'none'
                     }}>
                    <div className="item" onClick={this.toSendMail}>Письмо</div>
                    <div className="item" onClick={this.toSendBox}>Посылку</div>
                    <div className="item" onClick={this.toSendMoney}>Перевод</div>
                    <div className="item" onClick={this.toSendDocuments}>Документы</div>
                </div>
            </div>
            <div className={ticketClass}>
                <div className="ticket">
                    <svg height="10" width="200">
                        <polygon points="0,10 0,0 5,10 10,0 15,10 20,0 25,10 30,0 35,10 40,0 45,10 50,0 55,10 60,0 65,10 70,0 75,10 80,0 85,10 90,0 95,10 100,0 105,10 110,0 115,10 120,0 125,10 130,0 135,10 140,0 145,10 150,0 155,10 160,0 165,10 170,0 175,10 180,0 185,10 190,0 195,10 200,0 200,10" fill="white"/>
                    </svg>
                    <svg height="10" width="200">
                        <polygon points="0,10 0,0 5,10 10,0 15,10 20,0 25,10 30,0 35,10 40,0 45,10 50,0 55,10 60,0 65,10 70,0 75,10 80,0 85,10 90,0 95,10 100,0 105,10 110,0 115,10 120,0 125,10 130,0 135,10 140,0 145,10 150,0 155,10 160,0 165,10 170,0 175,10 180,0 185,10 190,0 195,10 200,0 200,10" fill="white"/>
                    </svg>
                    <div className="service-label">Услуга:</div>
                    <span id="service-kind" className="service-value">{this.state.service}</span>
                    <div className="ticket-number">Бумажка №<span id="ticket-number">{this.state.ticketNumber}</span></div>
                    <div id="window-number" className="window-number">{this.state.windowNumber}</div>
                    <div className="window-label">окно</div>
                    <div className="wait">Ждать: <span id="wait-for" className="stm1">{this.state.waitForMinutes} м. {this.state.waitForSeconds} сек.</span></div>
                    <div className="queue">Очередь: <span id="queue-length" className="stm2">{this.state.queueLength} чел.</span></div>
                </div>
            </div>
          </div>
        );
  }
}

export default App;
