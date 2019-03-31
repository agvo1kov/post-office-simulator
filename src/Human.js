import React, { Component } from 'react';
import './Human.css'

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

            footLength: 20,
            footWidth: 16.5,
            bodyHeight: 17.2,
            boatWidth: 13.5,
            boatHeight: 22,
        };

        this.nearATMCoords = [290, window.innerHeight - 170];
        this.goals = [
            [120, 260],
            [200, 250],
            [270, 270],
            [290, window.innerHeight - 170 - window.privacySpace * window.queues[0]]
        ];
        window.queues[0]++;
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
        this.toPoint([e.clientX, e.clientY], 10);
    };

    nextGoal = (callback) => {
        if (this.goals.length > 0) {
            this.toPoint(this.goals[0], () => {
                this.nextGoal(callback);
            });
            this.currentGoal = this.goals[0];
            this.goals.shift();
        } else {
            const deltaX = this.state.x - this.currentGoal[0];
            const deltaY = this.state.y - this.currentGoal[1];
            const distance = Math.sqrt( deltaX*deltaX + deltaY*deltaY)
            this.finishStep(distance, () => {
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

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false);
        this.setState({'rotate': this.props.deg}, () => {});
        switch (this.props.kind) {
            case 'client':
                this.turnDelay = 5000;
                this.startStep(this.props.stepDistance, () => {
                    this.nextGoal(() => {
                        // const windowNumber = Math.floor(Math.random() * 4) + 1;
                        console.log(Math.round(this.state.x), Math.round(this.nearATMCoords[0]));
                        console.log(Math.round(this.state.y), Math.round(this.nearATMCoords[1]));
                        console.log(' ');
                        if (Math.round(this.state.x) === Math.round(this.nearATMCoords[0]) && Math.round(this.state.y) === Math.round(this.nearATMCoords[1])) {
                            const windowNumber = 3;
                            console.log(windowNumber);
                            console.log(window.queues);
                            this.goals = [
                                [400, window.innerHeight - 230],
                                // [window.innerWidth - 290, windowNumber * (window.innerHeight * 0.8) / 4],
                                [window.innerWidth - 290 - window.privacySpace * window.queueLength, windowNumber * (window.innerHeight * 0.8) / 4],
                                [window.innerWidth - 290 - window.privacySpace * window.queues[windowNumber] + Math.floor(Math.random() * 5) - 10, windowNumber * (window.innerHeight * 0.8) / 4 + Math.floor(Math.random() * 10) - 20],
                            ];
                            window.queues[windowNumber]++;
                            setTimeout(() => {
                                this.startStep(this.props.stepDistance, () => {
                                    this.nextGoal(() => {
                                    });
                                });
                            }, 500);
                        }
                    });
                });
                break;

            case 'worker':
                this.turnDelay = 1000;
                this.turnNear(0);
                break;

            default:
                console.log('heh');
        }
        // this.toPoint(150, 300);
    };

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);
    }

    render() {
        const flareAngle = this.state.rotate + this.state.afterRotate - 120;
        return (
            <div className={this.state.animated ? 'Human' : 'Human non-transition'}
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

export default Human;