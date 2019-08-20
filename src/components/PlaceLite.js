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
    console.log(this.props)
    axios.all([
        axios.get('../'+this.props.placeId+'.json')])
        .then(axios.spread((getPlaceData) => {
            const placeData = getPlaceData.data[0];
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
                {this.state.placeData.PlaceName}
              </Card>
            </Col>
          </Row>
    )
  }
}}

export default PlaceLite;
