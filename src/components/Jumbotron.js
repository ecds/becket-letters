import React, { Component } from "react";
import { Container, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class HomeJumbotron extends Component {
    render() {
      return (
          <Jumbotron className="home-main">
            <Container>
              <h1>Samuel Beckett Letters</h1>
              <p>The Samuel Beckett Letters Project is meant to create a useful interface for the study of Samuel Beckett's letters and relationships.</p>
              <Link to="/letters" className="btn btn-primary">Browse Letters Now</Link>
            </Container>
          </Jumbotron>
        )
    }
}

export default HomeJumbotron;
