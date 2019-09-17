import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {Row, Col, Card} from "react-bootstrap";

import axios from "axios";

class Places extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      isLoaded: false,
      allPlaces: []
    };
  }

  componentDidMount() {
    axios.all([
        axios.get('http://ot-api.ecdsdev.org/entities/'+ this.props.history.location.state.id)])
        .then(axios.spread((getPlaces) => {
            const allPlaces = getPlaces.data;
            this.setState({ allPlaces });
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
      const events = this.state.allPlaces.map((place, key) =>
        <Card key={key}>
          {place.PlaceName}
          {place.Description}
          <Link to="places/place" params={{ placeID: place.ID }}>View More</Link>
        </Card>
      );
      return (
        <Row>
          <Col md={3}>
            {events}
          </Col>
          <Col md={9}>
            Google Maps over here
          </Col>
          <p>{this.state.places}</p>
          Places
        </Row>
      )
    }
  }
}

export default Places;
