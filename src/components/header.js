import React, { Component } from "react";
import { Row } from 'react-bootstrap';

export class Header extends Component {
    render() {
        return (
            <div>
                <Row className='headerRow1'>
                    <div className='header-container'>
                        <img src='./imgs/EU_hz_rev.png' alt='emory-logo-white'></img>
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
                        <a href='/'>
                            Research
                            <img src='../imgs/downArrow.svg' alt='down-arrow' class='navArrow' />
                        </a>
                        <a href='/'>
                            Index
                            <img  src='../imgs/downArrow.svg' alt='down-arrow' class='navArrow' />
                        </a>
                        <a href='/'>About</a>
                        <a href='/' id='searchBtn'>
                            <img id='searchImg' src='../imgs/searchRed.png' alt='magnifying glass' />
                        </a>
                    </div>
                </Row>
            </div>
        )
    }
}

export default Header;
