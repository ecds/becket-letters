import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "./ProfileCard";
import PlaceCard from "./PlaceCard";

import axios from "axios";

class RelatedAuthors extends Component {
  constructor(props, context) {
    super(props, context);
    this.categorizeRelatedEntities = this.categorizeRelatedEntities.bind(this);
    this.state = {
      relatedPlaces: {},
      relatedAuthors: {}
    };

  }

  categorizeRelatedEntities(entities) {

  }



  componentDidMount() {
    console.log(this.props.entities['entity-type'])
    const entities = this.props.entities;
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



  render() {
      return (
        <div>Stuff</div>
      )
    }
}

export default RelatedAuthors;
