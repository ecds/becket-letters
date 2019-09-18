import React, { Component } from "react";
import { } from 'react-bootstrap';
import HomeJumbotron from './Jumbotron';
import SearchPage from './SearchPage';
import HomeTiles from '../utilities/HomeTiles';
import axios from "axios";

class Landing extends Component {
    render() {
        return (
            <div>
                <HomeJumbotron />

                <SearchPage />

                <HomeTiles />
            </div>
        )
    }
}

export default Landing;
