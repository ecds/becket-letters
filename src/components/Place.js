import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Map, TileLayer } from 'react-leaflet'
import LetterQuickGlance from "./LetterQuickGlance";
import SearchRecipientOnPage from './utilities/SearchRecipientOnPage';
import Geocode from "react-geocode";

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
      zoom: 13
    };

  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    axios.all([
        axios.get(this.props.apiUrl+'/entities/'+this.props.match.params.id)])
        .then(axios.spread((getPlace) => {
            const thisPlace = getPlace.data.data;
            const lettersList = getPlace.data.data.attributes['public-letters-hash'];
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
    if (this.state.thisPlace.attributes.properties != null) {
      const lat = this.state.thisPlace.attributes.properties.coordinates.lat
      const lng = this.state.thisPlace.attributes.properties.coordinates.lng
      this.setState({ lat, lng })
    }
  }

  getAlternateSpellings() {
    if (this.state.thisPlace.attributes["alternate-spelling-list"].length > 0) {
      return this.state.thisPlace.attributes["alternate-spelling-list"].map((spelling, i) => <span className='list-span' key={i}>{spelling}</span>)
    }
  }

  getLinks() {
    if (this.state.thisPlace.attributes.properties["links"].length > 0) {
      return this.state.thisPlace.attributes.properties["links"].map((link, i) => <a key={i} href={link} target="_blank">{link}</a>)
    }
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
        <Row className="place-details">
          <Col md={7} className='h-100 p-3'>
            <h1>{this.state.thisPlace.attributes.label}</h1>
            <div className="spellings">{this.getAlternateSpellings()}</div>
            <p>{this.state.thisPlace.attributes.properties ? this.state.thisPlace.attributes.properties.description : null}</p>
            {this.state.thisPlace.attributes.properties ? this.getLinks() : null }
            <h2>Samuel Beckett Mentioned {this.state.thisPlace.attributes.label} in the following letters:</h2>
            <SearchRecipientOnPage tableId='repositoryLetters' placeHolder='by recipient'/>
            <table className='table table-bordered' id='repositoryLetters'>
            <thead>
              <tr>
                <th>Recipient(s)</th>
                <th colSpan="2">Date</th>
              </tr>
            </thead>
            {this.state.lettersList.map((letter, index) =>
              <tr>
                <td>{letter['recipients'].map((this_recipient) => <a href={'/people/'+this_recipient.id+'/'+this_recipient.name}>{this_recipient.name}</a>)}</td>
                <td>{letter['date']}</td>
                <td className="actions"><a href={'/letters/letterdetails/'+letter.id}>Explore Letter</a></td>
              </tr>
            )}
            </table>


          </Col>

          <div className="col-sm-5 p-0 sidebar-outer">
            <div className="map">
              <Map center={position} zoom={this.state.zoom}>
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
