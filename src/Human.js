import React, { Component } from 'react';
import './Human.css'

class Human extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            foots: {
                leftFootOffset: 0,
                rightFootOffset: 0,
                leftBoatOffset: 0,
                rightBoatOffset: 0
            },
        };
    }



    render() {
        return (
            <div className="human">
                <div className="boats">
                    <div className="left boat"/>
                    <div className="right boat"/>
                </div>
                <div className="foots">
                    <div className="left foot"/>
                    <div className="right foot"/>
                </div>
                <div className="body"/>
                <div className="head"/>
            </div>
        );
    }
}

export default Human;