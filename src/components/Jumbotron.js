import React, { Component } from "react";
import { Container, Jumbotron } from 'react-bootstrap';

class HomeJumbotron extends Component {
    render() {
      return (
          <Jumbotron className="home-main">
              <img src="/imgs/Banner1.jpg" />
          </Jumbotron>
        )
    }
}

export default HomeJumbotron;
