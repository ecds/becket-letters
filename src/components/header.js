import React, { Component } from "react";
import { Row } from 'react-bootstrap';

export class Header extends Component {
    render() {
        return (
            <div>
                <Row className='headerRow1'>
                    <div className='header-container'>
                        <img src='../imgs/EU_hz_rev.png' alt='emory-logo-white'></img>
                    </div>
                </Row>
                <Row className='headerRow2'>
                    <div className='header-container'>
                        <h1>Samuel Beckett</h1>
                        <h1>Letters</h1>
                    </div>
                </Row>
                <Row className='headerRow3'>
                    <div className='header-container'>
                        <a href='/'>Home</a>
                        <a href="/letters/">Browse Letters</a>
                        <a href="/timeline/">Timeline</a>
                    </div>
                </Row>
            </div>
        )
    }
}

export default Header;
