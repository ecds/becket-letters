import React, { Component } from "react";
import { Jumbotron } from 'react-bootstrap';

class HomeJumbotron extends Component {
    render() {
      return (
          <Jumbotron className="home-main">
              <img src="/imgs/Banner1.jpg" alt='jumbotron-welcome' />
          </Jumbotron>
        )
    }
}

export default HomeJumbotron;
