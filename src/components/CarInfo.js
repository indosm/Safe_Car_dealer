import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';

import History from "./history.react";

class CarInfo extends Component{
    static defaultProps = {
        info: {
            name: 'Sonata',
            owner: 'master',
            id: 0
        }
    }

    render() {
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };

        const {
            name, owner, id
        } = this.props.info;

        return (
            <div style={style}>
                <div>차량명 : <b>{name}</b></div>
                <div>소유주 : {owner}</div>
                <Link to="/history" component={History}>
                   <Button type="submit">
                        히스토리 확인하기
                    </Button> 
                </Link>
            </div>
        );
    }
}

export default CarInfo;