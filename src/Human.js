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
            this.startStep(20, () => {
                this.continueStep(20);
            });
        }, 1000);
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
            const that = this;
            setTimeout(() => {
                if (typeof callback === 'function') {
                    callback();
                }
            }, 300);
        });
    };

    continueStep = (distance, callback) => {
        this.setState({
            animated: true,
            y: this.state.y - distance,
            leftFootOffset: -distance,
            leftBoatOffset: -distance + this.state.boatHeight * 0.45,
            rightFootOffset: distance + 3,
            rightBoatOffset: distance,
        },
        () => {
            const that = this;
            setTimeout(() => {
                // that.setState({
                //     animated: false,
                //     y: that.state.y - distance * 0.5,
                //     rightFootOffset: distance + 3 + distance * 0.5,
                //     rightBoatOffset: distance - distance,
                //     bodyOffset: 0,
                //     leftFootOffset: -50,
                //     leftBoatOffset: -distance * 0.5,
                // });
                // setTimeout(() => {
                //     if (typeof callback === 'function') {
                //         callback();
                //     }
                // }, 500);
            }, 500);
        });
    };

    render() {
        return (
            <div className={this.state.animated ? 'Human' : 'Human non-transition'}
                style={{
                    top: this.state.y + 'px',
                    left: this.state.x + 'px'
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