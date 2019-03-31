import React, { Component } from 'react';
import './Human.css'

class Human extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 400,
            y: 500,
            animated: true,
            leftFootOffset: 0,
            rightFootOffset: 0,
            leftBoatOffset: 1,
            rightBoatOffset: 1,
            bodyOffset: 0,

            footLength: 20,
            footWidth: 16.5,
            bodyHeight: 17.2,
            boatWidth: 13.5,
            boatHeight: 22,
        };

        // setTimeout(() => {
        //     this.startStep(10, () => {
        //         this.continueStep(15, 90, 400, () => {
        //
        //         });
        //     });
        // }, 500);
        this.toPoint(150, 300);
        this.distanceToPoint = 0;
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
            y: this.state.y - distance * 2 * Math.sin(Human.deg2rad(-deg + 180)),
            x: this.state.x - distance * 2 * Math.cos(Human.deg2rad(-deg + 180)),
            leftFootOffset: this.state.leftFootOffset < 0 ? distance : -distance,
            leftBoatOffset: this.state.leftBoatOffset < 0 ? distance : -distance, // + this.state.boatHeight * 0.45,
            rightFootOffset: this.state.rightFootOffset < 0 ? distance : -distance,
            rightBoatOffset: this.state.rightBoatOffset < 0 ? distance : -distance,
            rotate: -deg + 90,
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
                y: this.state.y - distance * Math.sin(Human.deg2rad(-deg + 180)),
                x: this.state.x - distance * Math.cos(Human.deg2rad(-deg + 180)),
                leftFootOffset: 0,
                leftBoatOffset: 0, // + this.state.boatHeight * 0.45,
                rightFootOffset: 0,
                rightBoatOffset: 0,
                rotate: -deg + 90,
            },
            () => {
                setTimeout(() => {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }, 300);
            });
    };

    toPoint = (x, y, deg) => {
        const deltaX = this.state.x - x;
        const deltaY = this.state.y - y;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        const newDistanceToPoint = Math.sqrt( deltaX*deltaX + deltaY*deltaY);

        setTimeout(() => {
            this.startStep(1, () => {
                this.continueStep(15, angle + 70, newDistanceToPoint / 30, () => {
                    this.finishStep(15, angle + 70);
                });
            });
        }, 10);
    };

    static deg2rad(degrees) {
        return degrees * Math.PI/180;
    }

    render() {
        return (
            <div className={this.state.animated ? 'Human' : 'Human non-transition'}
                style={{
                    top: this.state.y + 'px',
                    left: this.state.x + 'px',
                    transform: 'rotate(' + this.state.rotate + 'deg)',
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