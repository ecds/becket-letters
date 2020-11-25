import React, { Component } from "react";
import HomeJumbotron from '../Jumbotron';
import HomeTile from '../utilities/HomeTile';
import DocMetaBuilder from '../utilities/DocMetaBuilder';
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
            <HomeTile type='attendance' />
            <HomeTile type='music' />
            <HomeTile type='organization' />
            <HomeTile type='person' />
            <HomeTile type='place' />
            <HomeTile type='production' />
            <HomeTile type='publication' />
          </CardGroup>
          <CardGroup className='landing-group'>
          <HomeTile type='public-event' />
            <HomeTile type='reading' />
            <HomeTile type='repository' />
            <HomeTile type='translating' />
            <HomeTile type='work-of-art' />
            <HomeTile type='writing' />
          </CardGroup>
        </Container>
      </div >
    )
  }
}

export default Landing;
