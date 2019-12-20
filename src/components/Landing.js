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
            <HomeTile type='production' />
            <HomeTile type='attendance' />
            <HomeTile type='person' />
            <HomeTile type='organization' />
            <HomeTile type='publication' />
            <HomeTile type='place' />
          </CardGroup>
        </Container>
      </div >
    )
  }
}

export default Landing;
