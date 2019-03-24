import React, { Component } from 'react';
import './Human.css'

class Human extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 100,
            y: 200,
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

        setTimeout(() => {
            this.startStep(20, this.continueStep(40));
        }, 1000);
    }

    startStep = (distance, callback) => {
        this.setState({
            animated: true,
            leftFootOffset: distance + 3,
            bodyOffset: -distance * 0.4,
            rightFootOffset: -distance * 0.8,
            leftBoatOffset: distance,
        },
        () => {
            const that = this;
            setTimeout(() => {
                that.setState({
                    animated: false,
                    y: that.state.y - distance * 0.4,
                    leftFootOffset: distance + 3 - distance * 0.4,
                    bodyOffset: 0,
                    rightFootOffset: distance * 0.8 + distance * 0.4,
                    leftBoatOffset: distance - distance * 0.4,
                    rightBoatOffset: 1 - distance * 0.4,
                });
                setTimeout(() => {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }, 500);
            }, 500);
        });
    };

    continueStep = (distance, callback) => {
        this.setState({
            animated: true,
            leftFootOffset: distance + 3,
            bodyOffset: -distance * 0.4,
            rightFootOffset: -distance * 0.8,
            leftBoatOffset: distance,
        },
        () => {
            const that = this;
            setTimeout(() => {
                that.setState({
                    animated: false,
                    y: that.state.y - distance * 0.4,
                    leftFootOffset: distance + 3 - distance * 0.4,
                    bodyOffset: 0,
                    rightFootOffset: distance * 0.8 + distance * 0.4,
                    leftBoatOffset: distance - distance * 0.4,
                    rightBoatOffset: 1 - distance * 0.4,
                });
                setTimeout(() => {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }, 500);
            }, 500);
        });
    };

    render() {
        return (
            <div className={this.state.animated ? 'human' : 'human non-transition'}
                style={{
                    top: this.state.y + 'pt',
                    left: this.state.x + 'pt'
                }}>
                <div className="boats">
                    <div className="left boat"
                        style={{top: this.state.bodyHeight / 2 - this.state.boatHeight / 2
                                        - this.state.leftBoatOffset + 'pt'}}/>
                    <div className="right boat"
                         style={{top: this.state.bodyHeight / 2 - this.state.boatHeight / 2
                                        - this.state.rightBoatOffset + 'pt'}}/>
                </div>
                <div className="foots">
                    <div className="left foot"
                        style={{height: this.state.leftFootOffset + 'pt',
                                top: this.state.bodyHeight / 2 - this.state.leftFootOffset + 'pt'}}/>
                    <div className="right foot"
                         style={{height: -this.state.rightFootOffset + 'pt',
                             top: this.state.bodyHeight / 2 + this.state.bodyOffset + 'pt'}}/>
                </div>
                <div className="body"
                    style={{top: this.state.bodyOffset + 'pt'}}/>
                <div className="head"
                     style={{top: this.state.bodyOffset - 3.8 + 'pt'}}/>
            </div>
        );
    }
}

export default Human;