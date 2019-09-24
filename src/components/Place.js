import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "./ProfileCard";
import PlaceCard from "./PlaceCard";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import LetterQuickGlance from "./LetterQuickGlance";

import axios from "axios";

class Place extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      isLoaded: false,
      thisPlace: [],
      lettersList: [],
      alternateSpellings: [],
      lat: 51.505,
      lng: -0.09,
      zoom: 1
    };

  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    axios.all([
        axios.get('http://ot-api.ecdsdev.org/entities/'+this.props.match.params.placeId)])
        .then(axios.spread((getPlace) => {
            const thisPlace = getPlace.data.data;
            const lettersList = getPlace.data.data.attributes['letters-list'];
            const alternateSpellings = getPlace.data.data.attributes['alternate-spelling-list']
            this.setState({ thisPlace, lettersList, alternateSpellings });
            // this.categorizeRelatedEntities(thisPlace.relationships.entities)
            this.setLatAndLng()
            this.setState({ isLoaded: true })
        }))
        .catch((err) => {
            this.setState({ isLoaded: false });
            this.setState({ error: err.message });
        });
  }

  setLatAndLng = () => {
    const lat = this.state.thisPlace.attributes.properties.coordinates.lat
    const lng = this.state.thisPlace.attributes.properties.coordinates.lng
    this.setState({ lat, lng })
  }

  getAlternateSpellings() {
    if (this.state.thisPlace.attributes["alternate-spelling-list"].length > 0) {
      return this.state.thisPlace.attributes["alternate-spelling-list"].map((spelling, i) => <span className='list-span' key={i}>{spelling}</span>)
    }
  }


  render() {
    const position = [this.state.lat, this.state.lng];
    const LettersList = this.state.lettersList.map((letter, index) =>
      <LetterQuickGlance letterId={letter} key={index}/>
    );

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
        <Row className="place-details">
          <Col md={7} className='h-100 p-3'>
            <h1>{this.state.thisPlace.attributes.label}

            </h1>
            <div className="spellings">{this.getAlternateSpellings()}</div>
            <p>{this.state.thisPlace.attributes.properties.description}</p>
            <h4>Letters List</h4>

            {LettersList}

          </Col>
          <div className="col-sm-5 p-0 sidebar-outer">
            <div className="map">
              <Map center={position} zoom={13}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
              </Map>
            </div>
          </div>
        </Row>
      )
    }
  }
}

export default Place;
