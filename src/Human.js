import React, { Component } from 'react';
import './Human.css'

class Human extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 50,
            y: 500,
            animated: true,
            leftFootOffset: 0,
            rightFootOffset: 0,
            leftBoatOffset: 1,
            rightBoatOffset: 1,
            bodyOffset: 0,
            rotate: 0,

            footLength: 20,
            footWidth: 16.5,
            bodyHeight: 17.2,
            boatWidth: 13.5,
            boatHeight: 22,
        };
        this.goalsToAtm = [

        ];
    }

    startStep = (distance, callback) => {
        this.setState({
            animated: true,
            y: this.state.y - distance,
            leftFootOffset: distance,
            leftBoatOffset: distance,
            rightFootOffset: -distance - this.state.boatHeight * 0.45,
            rightBoatOffset: -distance,
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

    finishStep = (distance, deg, callback) => {
        this.setState({
                animated: true,
                y: this.state.y - distance * Math.sin(this.deg2rad(deg + 90)),
                x: this.state.x - distance * Math.cos(this.deg2rad(deg + 90)),
                leftFootOffset: 0,
                leftBoatOffset: 0, // + this.state.boatHeight * 0.45,
                rightFootOffset: 0,
                rightBoatOffset: 0,
                rotate: deg,
            },
            () => {
                setTimeout(() => {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }, 300);
            });
    };

    toPoint = (x, y, callback) => {
        const deltaX = this.state.x - x;
        const deltaY = this.state.y - y;
        let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 90;

        const dAngle = (this.state.rotate - angle) % 360;
        console.log(this.state.rotate, angle, dAngle);
        if (dAngle > 180 && dAngle < 270) {
            angle += 360;
        }
        if (dAngle < -180 && dAngle > -270) {
            angle -= 360;
        }

        const newDistanceToPoint = Math.sqrt( deltaX*deltaX + deltaY*deltaY);

        this.continueStep(15, angle, newDistanceToPoint / 30 - 2, () => {
            if (typeof callback === 'function') {
                callback();
            }
        });
    };

    deg2rad = (degrees) => {
        return degrees * Math.PI/180;
    };

    handleClick = (e) => {
        this.toPoint(e.clientX, e.clientY, 10);
    };

    componentWillMount() {
        document.addEventListener('click', this.handleClick, false);
        this.startStep(15);

        // this.toPoint(150, 300);
    };

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);
    }

    render() {
        return (
            <div className={this.state.animated ? 'Human' : 'Human non-transition'}
                style={{
                    transform: 'translate('+ this.state.x +'px, '+ this.state.y +'px) rotate(' + this.state.rotate + 'deg)',
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
                <div className="body"
                    style={{top: this.state.bodyOffset + 'px'}}/>
                <div className="head"
                     style={{top: this.state.bodyOffset - 3.8 + 'px'}}/>
            </div>
        );
    }
}

export default Human;