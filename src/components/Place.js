import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileLite from "./ProfileLite";
import PlaceLite from "./PlaceLite";

import axios from "axios";

class Place extends Component {
  constructor(props, context) {
    super(props, context);
    this.categorizeRelatedEntities = this.categorizeRelatedEntities.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      thisPlace: [],
      relatedPlaces: {},
      relatedAuthors: {}
    };

  }

  categorizeRelatedEntities(entities) {
    const relatedAuthors = [];
    const relatedPlaces = [];
    entities.forEach(function(entity) {
      if (entity['entity-type'] === 1) {
        relatedAuthors.push(entity['id']);
      }
      else if (entity['entity-type'] === 3) {
        relatedPlaces.push(entity['id']);
      }
    });
    this.setState({
      relatedAuthors: relatedAuthors,
      relatedPlaces: relatedPlaces
    })
  }

  componentDidMount() {
    axios.all([
        axios.get('../place_3.json')])
        .then(axios.spread((getPlace) => {
            const thisPlace = getPlace.data[0];
            this.setState({ thisPlace });
            this.categorizeRelatedEntities(thisPlace.relationships.entities)
            this.setState({ isLoaded: true })
        }))
        .catch((err) => {
            this.setState({ isLoaded: false });
            this.setState({ error: err.message });
        });
  }



  render() {
    const { error, isLoaded } = this.state;
    // if there is an error
    if (error) {
      return <div>Error: {error.message}</div>;
    // if not loaded show loading
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    // return now that component has value
    } else {
      const relatedAuthors = this.state.relatedAuthors.map((relatedAuthor, i) =>
          <ProfileLite key={i} personId={relatedAuthor}/>
      );
      const relatedPlaces = this.state.relatedPlaces.map((relatedPlace, i) =>
          <PlaceLite key={i} placeId={relatedPlace}/>
      );
      return (
        <Container>
        <Row>
          <Col md={6}>
            <img src="../imgs/Val-de-Marne.jpg" alt={this.state.thisPlace.PlaceName} />
          </Col>
          <Col md={6}>
            <h1>{this.state.thisPlace.PlaceName}</h1>
            <p>{this.state.thisPlace.Description}</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <h4>Related Authors</h4>
            {relatedAuthors}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <h4>Related Places</h4>
            {relatedPlaces}
          </Col>
        </Row>
        </Container>
      )
    }
  }
}

export default Place;
