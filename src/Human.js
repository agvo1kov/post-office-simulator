import React, { Component } from 'react'
import './Human.css'
import { connect } from 'react-redux'

class Human extends Component {
    deg;
    stepDistance;
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            animated: true,
            leftFootOffset: 0,
            rightFootOffset: 0,
            leftBoatOffset: 1,
            rightBoatOffset: 1,
            bodyOffset: 0,
            rotate: props.deg,
            afterRotate: 0,
            iAmChosen: false,

            footLength: 20,
            footWidth: 16.5,
            bodyHeight: 17.2,
            boatWidth: 13.5,
            boatHeight: 22,
        };

        if (this.props.kind === 'client') {
            this.atmQueuePosition = window.queues[0].length;
            this.windowNumber = 0;
            this.queueLength = 0;
            this.enteredToOffice = false;
            this.iAmGoing = false;
            this.goal = 'atm';
            this.goals = [
                [120, 260],
                [200, 250 - Math.random() * 50],
                [270, 270],
                [290 + Math.random() * 20 - 10, window.innerHeight - 170 - window.privacySpace * window.queues[0].length]
            ];
        }

        this.service = {
            'pay': 10,
            'get-mail': 7,
            'get-box': 15,
            'get-money': 18,
            'get-package': 6,
            'send-mail': 12,
            'send-box': 25,
            'send-money': 9,
            'send-documents': 8,
        };

        this.chosenService = '0';
    }

    startStep = (distance, callback) => {
        clearTimeout(this.rotationTimeout);
        this.setState({
            animated: true,
            y: this.state.y - distance,
            leftFootOffset: distance,
            leftBoatOffset: distance,
            rightFootOffset: -distance - this.state.boatHeight * 0.45,
            rightBoatOffset: -distance,
            afterRotate: 0
        },
        () => {
            // const that = this;
            setTimeout(() => {
                if (typeof callback === 'function') {
                    callback();
                }
            }, 300);
        });
    };

    continueStep = (distance, deg, steps, callback) => {
        this.setState({
                animated: true,
                y: this.state.y - distance * 2 * Math.sin(this.deg2rad(deg + 90)),
                x: this.state.x - distance * 2 * Math.cos(this.deg2rad(deg + 90)),
                leftFootOffset: this.state.leftFootOffset < 0 ? distance : -distance,
                leftBoatOffset: this.state.leftBoatOffset < 0 ? distance : -distance, // + this.state.boatHeight * 0.45,
                rightFootOffset: this.state.rightFootOffset < 0 ? distance : -distance,
                rightBoatOffset: this.state.rightBoatOffset < 0 ? distance : -distance,
                rotate: deg,
            },
            () => {
                setTimeout(() => {
                    if (steps > 0) {
                        this.continueStep(distance, deg, steps - 1, callback);
                    } else if (typeof callback === 'function') {
                        callback();
                    }
                }, 300);
            });
    };

    finishStep = (distance, callback) => {
        this.turnNear(0);
        this.setState({
            animated: true,
            y: this.state.y - distance * Math.sin(this.deg2rad(this.state.rotate + 90)),
            x: this.state.x - distance * Math.cos(this.deg2rad(this.state.rotate + 90)),
            leftFootOffset: 0,
            leftBoatOffset: 0, // + this.state.boatHeight * 0.45,
            rightFootOffset: 0,
            rightBoatOffset: 0,
        },
        () => {
            setTimeout(() => {
                if (typeof callback === 'function') {
                    callback();
                }
            }, 300);
        });
    };

    toPoint = (point, callback) => {
        const deltaX = this.state.x - point[0];
        const deltaY = this.state.y - point[1];
        let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 90;

        const dAngle = (this.state.rotate - angle) % 360;
        // console.log(this.state.rotate, angle, dAngle);
        if (dAngle > 180) {
            // console.log('+');
            angle += 360;
        }
        if (dAngle < -180) {
            // console.log('-');
            angle -= 360;
        }

        const newDistanceToPoint = Math.sqrt( deltaX*deltaX + deltaY*deltaY);

        this.continueStep(this.props.stepDistance, angle, newDistanceToPoint / (this.props.stepDistance * 2) - 2, () => {
            if (typeof callback === 'function') {
                callback();
            }
        });
    };

    deg2rad = (degrees) => {
        return degrees * Math.PI/180;
    };

    handleClick = (e) => {
        // console.log(e);
        // this.setState({iAmChosen: false}, () => {});
    };

    nextGoal = (callback) => {
        if (this.goals.length > 0) {
            if (this.goal === 'atm' && this.goals.length === 1 && !this.enteredToOffice) {
                this.enteredToOffice = true;
                this.goals[0] = [290 + Math.random() * 20 - 10, window.innerHeight - 170 - window.privacySpace * window.queues[0].length];
                this.myNumber = window.queues[0].length;
                window.queues[0].push(this.props.code);
            }
            this.toPoint(this.goals[0], () => {
                this.nextGoal(callback);
            });
            this.currentGoal = this.goals[0];
            this.goals.shift();
        } else {
            if (this.iAmGoing && this.myNumber !== window.queues[this.windowNumber].indexOf(this.props.code)) {
                this.myNumber = window.queues[this.windowNumber].indexOf(this.props.code);
                this.goals = [
                    [window.innerWidth - 280 - window.privacySpace * this.myNumber + Math.floor(Math.random() * 5) - 10, this.windowNumber * (window.innerHeight * 0.8) / 4 + Math.floor(Math.random() * 20) - 10],
                ];
                console.log('aha', this.myNumber, window.queues[this.windowNumber].indexOf(this.props.code));
                this.nextGoal(callback);
                return;
            }
            const deltaX = this.state.x - this.currentGoal[0];
            const deltaY = this.state.y - this.currentGoal[1];
            const distance = Math.sqrt( deltaX*deltaX + deltaY*deltaY);
            this.finishStep(distance, () => {
                this.iAmGoing = false;
                if (typeof callback === 'function') {
                    callback();
                }
            });
        }
    };

    turnNear = (timeout) => {
        this.rotationTimeout = setTimeout(() => {
            const span = 60;
            this.setState({afterRotate: Math.random() * span - span / 2}, () => {
                this.turnNear(Math.random() * this.turnDelay + 1000);
            });
        }, timeout);
    };

    checkQueue = (queue, times, serviceTime) => {
        const newNumber = queue.indexOf(this.props.code);
        // console.log(window.queues[0]);

        if (this.myNumber === 0) {
            if (this.goal === 'atm') {
                window.number++;
            }
            if (this.props.selected && this.goal === 'atm') {
                this.props.showATM((event) => {
                    console.log(event);
                    this.willBeWait = this.service[event];
                    this.chosenService = event;
                    queue.shift();
                    times.shift();

                    this.newGoal();
                });
            } else {
                const serviceTimer = setInterval(() => {
                    times[0]--;
                }, 1000);
                setTimeout(() => {
                    clearInterval(serviceTimer);
                    const keys = Object.keys(this.service);
                    const randomKey = keys[Math.floor(Math.random() * keys.length)];
                    setTimeout(() => {
                        times.shift();
                        queue.shift();
                    }, 700);
                    this.willBeWait = this.service[randomKey];
                    this.chosenService = randomKey;
                    this.newGoal();
                    console.log(this.willBeWait, randomKey, this.service[randomKey]);
                }, serviceTime);
            }
            clearTimeout(this.queueCheckTimer);
            return;
        }

        if (newNumber !== this.myNumber) {
            this.myNumber = newNumber;
            this.props.queued(newNumber, this.props.code);
            if (this.goal === 'atm') {
                this.goals = [
                    [290 + Math.random() * 20 - 10, window.innerHeight - 170 - (window.privacySpace * this.myNumber)]
                ];
            } else if (this.goal === 'window') {
                this.goals = [
                    [window.innerWidth - 280 - window.privacySpace * this.myNumber + Math.floor(Math.random() * 5) - 10, this.windowNumber * (window.innerHeight * 0.8) / 4 + Math.floor(Math.random() * 20) - 10],
                ];
            }
            this.startStep(5, () => {
                this.nextGoal(() => {
                    this.checkQueue(queue, times, serviceTime);
                });
            });
            clearTimeout(this.queueCheckTimer);
            return;
            // console.log(this.props.code, this.myNumber);
        }

        this.queueCheckTimer = setTimeout(() => {
            this.checkQueue(queue, times, serviceTime);
        }, 500);
    };

    newGoal = () => {
        clearTimeout(this.queueCheckTimer);
        switch (this.goal) {
            case 'atm':
                this.goal = 'window';
                this.props.windowed(this.props.code);
                const windowNumber = Math.round(Math.random() * 3 + 1);
                console.log(windowNumber);
                this.windowNumber = windowNumber;

                this.goals = [
                    [400, window.innerHeight - 230],
                    [window.innerWidth - 280 - window.privacySpace * window.queueLength, windowNumber * (window.innerHeight * 0.8) / 4],
                    [window.innerWidth - 280 - window.privacySpace * window.queues[windowNumber].length + Math.floor(Math.random() * 5) - 10, windowNumber * (window.innerHeight * 0.8) / 4 + Math.floor(Math.random() * 20) - 10],
                ];
                window.queues[windowNumber].push(this.props.code);
                window.times[windowNumber].push(this.willBeWait);
                this.myNumber = window.queues[windowNumber].indexOf(this.props.code);
                this.iAmGoing = true;
                setTimeout(() => {
                    this.startStep(this.props.stepDistance, () => {
                        this.nextGoal(() => {
                            this.checkQueue(window.queues[windowNumber], window.times[windowNumber], this.willBeWait * 1000);
                        });
                    });
                }, 100);
                this.props.update(this.windowNumber, this.chosenService, this.myNumber, this.props.code, this.goal);
                break;

            case 'window':
                this.goal = 'quit';
                this.props.quited(this.props.code);
                const newY = this.state.y + (Math.random() < 0.5 ? -1 : 1) * 80;
                this.goals = [
                    [this.state.x, newY],
                    [window.innerWidth - 290 - window.privacySpace * window.queueLength, newY],
                    [300, 150 + Math.random() * 50],
                    [100, 125 + Math.random() * 50],
                    [Math.random() * 700 - 540, -200]
                ];
                setTimeout(() => {
                    this.startStep(this.props.stepDistance, () => {
                        this.nextGoal(() => {
                            this.props.kill(this.props.id);
                        });
                    });
                }, 100);

                break;

            default:
                console.log('opa');
        }
    };

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false);
        this.setState({'rotate': this.props.deg}, () => {});
        switch (this.props.kind) {
            case 'client':
                this.turnDelay = 5000;
                this.startStep(this.props.stepDistance, () => {
                    this.nextGoal(() => {
                        this.checkQueue(window.queues[0], window.times[0],1500);
                    });
                });
                break;

            case 'worker':
                this.turnDelay = 1000;
                this.turnNear(0);
                // this.setState({
                //     leftFootOffset: 30,
                //     rightFootOffset: 30,
                // }, () => {});
                break;

            default:
                console.log('heh');
        }
        // this.toPoint(150, 300);
    };

    // componentWillUnmount() {
    //     document.removeEventListener('click', this.handleClick, false);
    // }

    iAmChosen = () => {
        // this.setState({iAmChosen: true}, () => {});
        if (this.props.kind !== 'worker') {
            this.props.onClick(this.windowNumber, this.chosenService, this.myNumber, this.props.code, this.goal);
            this.props.select(this.props.id);
        }
    };

    render() {
        const flareAngle = this.state.rotate + this.state.afterRotate - 120;
        // let humanClass = 'Human';
        // if (this.props.kind === 'worker') {
        //     humanClass += ' worker';
        // }
        // if (this.state.iAmChosen) {
        //     humanClass += ' chosen'
        // }
        return (
            <div className={
                     `Human ${this.props.kind === 'worker' ? 'worker' : ''} ${this.state.animated ? '' : 'non-transition'} ${this.props.selected ? 'chosen' : ''}`
                 }
                 onClick={this.iAmChosen}
                 style={{
                     transform: 'translate('+ this.state.x +'px, '+ this.state.y +'px) rotate(' + (this.state.rotate + this.state.afterRotate) + 'deg)',
                 }}>
                <div className="boats">
                    <div className="left boat"
                        style={{top: this.state.bodyHeight / 2 - this.state.boatHeight / 2
                                        - this.state.leftBoatOffset + 'px'}}/>
                    <div className="right boat"
                         style={{top: this.state.bodyHeight / 2 - this.state.boatHeight / 2
                                        - this.state.rightBoatOffset + 'px'}}/>
                </div>
                <div className="foots">
                    <div className="left foot"
                        style={{height: this.state.leftFootOffset * (1 - 2 * (this.state.leftFootOffset < 0)) + 'px',
                                top: this.state.bodyHeight / 2 - this.state.leftFootOffset * (this.state.leftFootOffset > 0) + 'px'}}/>
                    <div className="right foot"
                         style={{height: this.state.rightFootOffset * (1 - 2 * (this.state.rightFootOffset < 0)) + 'px',
                                top: this.state.bodyHeight / 2 - this.state.rightFootOffset * (this.state.rightFootOffset > 0) + 'px'}}/>
                </div>
                <div className="body-shadow"
                     style={{top: this.state.bodyOffset + 'px'}}/>
                <div className="body"
                    style={{top: this.state.bodyOffset + 'px'}}/>
                <div className="balloon" />
                <div className="head"
                     style={{top: this.state.bodyOffset - 3.8 + 'px'}}>
                    <div className="hat" />
                    <div className="flare"
                         style={{
                             transform: 'rotate(-' + flareAngle + 'deg) translateY(-9px) rotate(90deg)'
                         }}/>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    people: state.people
});

const mapDispatchToProps = dispatch => {
    return {
        kill: (index) => dispatch({
            type: 'KILL_HUMAN',
            payload: index
        }),
        select: (index) => dispatch({
            type: 'SELECT_HUMAN',
            payload: index
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Human)