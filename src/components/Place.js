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
      lettersList: [],
      alternateSpellings: []
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

  getLettersList = () => {
    return <p>H</p>
  }

  componentDidMount() {
    console.log(this.props)
    axios.all([
        axios.get('http://ot-api.ecdsdev.org/entities/'+ this.props.location.state.id)])
        .then(axios.spread((getPlace) => {

            const thisPlace = getPlace.data.data;
            const lettersList = getPlace.data.data.attributes['letters-list'];
            const alternateSpellings = getPlace.data.data.attributes.properties['alternate-spellings']
            console.log(alternateSpellings)
            this.setState({ thisPlace, lettersList, alternateSpellings });
            // this.categorizeRelatedEntities(thisPlace.relationships.entities)
            this.setState({ isLoaded: true })
        }))
        .catch((err) => {
            this.setState({ isLoaded: false });
            this.setState({ error: err.message });
        });
  }



  render() {
    console.log(this.state.thisPlace)
    const LettersList = this.state.lettersList.map((letter) =>
      <p>{letter}</p>
    );
    const AlternateSpellings = this.state.alternateSpellings.map((spelling) =>
      <p>{spelling}</p>
    )
    const { error, isLoaded } = this.state;
    // if there is an error
    if (error) {
      return <div>Error: {error.message}</div>;
    // if not loaded show loading
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    // return now that component has value
    } else {

      return (
        <Container>
        <Row>
          <Col md={6}>
            <img src="../imgs/Val-de-Marne.jpg" alt={this.state.thisPlace.PlaceName} />
          </Col>
          <Col md={6}>
            <h1>{this.state.thisPlace.attributes.label}
            {this.state.alternateSpellings.length > 0 ?
              <p>Alternate: {AlternateSpellings} </p>
            : null}
            </h1>
            <p>{this.state.thisPlace.attributes.properties.description}</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <h4>Letters List</h4>
            {LettersList}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <h4>Related Places</h4>
          </Col>
        </Row>
        </Container>
      )
    }
  }
}

export default Place;
