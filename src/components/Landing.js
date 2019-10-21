import React, { Component } from "react";
import HomeJumbotron from './Jumbotron';
import SearchPage from './SearchPage';
import HomeTiles from './utilities/HomeTiles';

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
