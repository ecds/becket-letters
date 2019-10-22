import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import LetterQuickGlance from './LetterQuickGlance';
import AlternateSpellings from './utilities/AlternateSpellings';
import SearchRecipientOnPage from './utilities/SearchRecipientOnPage';
import MentionedLetters from './utilities/MentionedLettersTable';
import { Map, TileLayer } from 'react-leaflet'
import Geocode from "react-geocode";

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
      axios.get(this.props.apiUrl + '/entities/' + this.props.match.params.id)])
      .then(axios.spread((getData) => {
        const entityData = getData.data.data;
        console.log(entityData)
        this.setState({ entityData });
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
      console.log(this.state.entityData)
      return (
        <div className="details">
          <Row className="place-details">
            <Col md={7} className='h-100 p-3'>
              <h1 dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} />
              <h2>Letters <span dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} /> is Mentioned In:</h2>
              <SearchRecipientOnPage tableId='repositoryLetters' placeHolder='by recipient' />
              <table className='table table-bordered' id='repositoryLetters'>
                <thead>
                  <tr>
                    <th>Recipient(s)</th>
                    <th colSpan="2">Date</th>
                  </tr>
                </thead>
                <MentionedLetters letters={this.state.entityData.attributes['public-letters-hash']} />

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
        </div >
      )
    }
  }
}

export default Place;
