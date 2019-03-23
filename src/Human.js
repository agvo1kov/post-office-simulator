import React, { Component } from 'react';
import './Human.css'

class Human extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            leftFootOffset: 0,
            rightFootOffset: 0,
            leftBoatOffset: 4,
            rightBoatOffset: 0,
            bodyOffset: 0,

            footLength: 20,
            footWidth: 16.5,
            bodyHeight: 17.2,
            boatWidth: 13.5,
            boatHeight: 22,
        };

        setTimeout(() => {
            this.startStep(20);
        }, 1000);
    }

    startStep = distance => {
        this.setState({leftFootOffset: distance * 0.8,
                            bodyOffset: -distance * 0.4,
                            rightFootOffset: -distance * 0.4 + 2,
                            leftBoatOffset: distance}, () => {
            const that = this;
            setTimeout(() => {
                that.setState({leftFootOffset: distance + 4}, () => {
                    // setTimeout(() => {
                    //     that.setState({bodyOffset: -distance,
                    //                         leftFootOffset: 0,
                    //                         rightFootOffset: -distance,});
                    // }, 50);
                });
            }, 170);
        });
    };

    render() {
        return (
            <div className="human">
                <div className="boats">
                    <div className="left boat"
                        style={{top: this.state.bodyHeight / 2 - this.state.boatHeight / 2
                                        - this.state.leftBoatOffset + 'pt'}}/>
                    <div className="right boat"/>
                </div>
                <div className="foots">
                    <div className="left foot"
                        style={{height: this.state.leftFootOffset + 'pt',
                                top: this.state.bodyHeight / 2 - this.state.leftFootOffset + 'pt'}}/>
                    <div className="right foot"
                         style={{height: this.state.rightFootOffset + 'pt',
                             top: (this.state.bodyHeight + this.state.bodyOffset) / 2 + 'pt'}}/>
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