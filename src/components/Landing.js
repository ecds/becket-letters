import React, { Component } from "react";
import {  Navbar, Nav } from 'react-bootstrap';
import HomeJumbotron from './Jumbotron';
import SearchPage from './SearchPage';
import HomeTiles from '../utilities/HomeTiles';
import Sidebar from '../utilities/Sidebar';
import axios from "axios";

class Landing extends Component {
    render() {
        return (
          <div className="landing">
            <HomeJumbotron/>
            <SearchPage/>
            <HomeTiles/>
          </div>
        )
    }
}

export default Landing;
