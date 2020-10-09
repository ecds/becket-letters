import React, { Component } from "react";
import HomeJumbotron from './Jumbotron';
import HomeTile from './utilities/HomeTile';
import DocMetaBuilder from './utilities/DocMetaBuilder';
import { CardGroup, Container } from 'react-bootstrap';

class Landing extends Component {
  render() {
    const metaBuild = {
      title: "Samuel Beckett's Letters",
      description: "Begin your exploration of Samuel Beckett's letters",
    };

    return (
      <div className="landing" >
        <DocMetaBuilder {...metaBuild} />
        <HomeJumbotron />
        <Container fluid className="home-tiles">
          <h2>Browse Letters By</h2>
          <CardGroup className='landing-group'>
            <HomeTile type='productions' />
            <HomeTile type='attendances' />
            <HomeTile type='people' />
            <HomeTile type='organizations' />
            <HomeTile type='publications' />
            <HomeTile type='places' />
          </CardGroup>
        </Container>
      </div >
    )
  }
}

export default Landing;
