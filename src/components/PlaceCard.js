import React, { Component } from 'react';
import {Col, Row, Card} from 'react-bootstrap';
import axios from 'axios';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class PlaceCard extends Component {
  constructor(props) {
      super(props);
      this.state= {
        isLoaded: false,
        error: '',
        placeData: [],
        lat: 51.505,
        lng: -0.09,
        zoom: 13
      }
  }

  componentDidMount() {
    axios.all([
        axios.get('http://ot-api.ecdsdev.org/entities/'+this.props.placeId)])
        .then(axios.spread((getPlaceData) => {
            const placeData = getPlaceData.data.data;
            this.setState({ placeData });

            this.setState({ isLoaded: true })
        }))
        .catch((err) => {
            this.setState({ isLoaded: false });
            this.setState({ error: err.message });
        });
  }


  render() {
    const position = [this.state.lat, this.state.lng];
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
        <Card className='relationship-card'>
          <Card.Header>
            <h5>{this.state.placeData.attributes.label}</h5>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {this.state.placeData.attributes.properties ? this.state.placeData.attributes.properties['description'] : null }
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Card.Footer><a href={ '/places/' + this.state.placeData.id }>Explore Place</a></Card.Footer>
          </Card.Footer>
        </Card>


    )
  }
}}

export default PlaceCard;
