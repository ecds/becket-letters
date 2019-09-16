import React, { Component } from 'react';
import {Col, Row, Card} from 'react-bootstrap';
import axios from 'axios';

class PlaceLite extends Component {
  constructor(props) {
      super(props);
      this.state= {
        isLoaded: false,
        error: '',
        placeData: []
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
          <Row>
            <Col>
              <Card>
                {this.state.placeData.attributes ?
                  <p>{this.state.placeData.attributes.label}</p>
                  : null
                }
                {this.state.placeData.attributes.properties ?
                  <p>{this.state.placeData.attributes.properties.description}</p>
                  : null
                }
              </Card>
            </Col>
          </Row>
    )
  }
}}

export default PlaceLite;
