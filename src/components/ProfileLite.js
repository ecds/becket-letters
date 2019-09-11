import React, { Component } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { nullLiteral } from '@babel/types';

class ProfileLite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: '',
      personData: []
    }
  }

  componentDidMount() {
    axios.all([
      axios.get('http://ot-api.ecdsdev.org/entities/' + this.props.personId)])
      .then(axios.spread((getPersonData) => {
        const personData = getPersonData.data;
        this.setState({ personData });
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
      let cardText = null;
      if (this.state.personData.data.attributes.properties != null) {
        cardText = this.state.personData.data.attributes.properties.description
      }
      
      return (
        <Row>
          <Col>
            <Card className='profileLite-card'>
              <Card.Body>
                <Card.Img src={this.state.personData.data.attributes.properties.media.images["0"].link} className='profileLite-card-img' />
                <Card.Title>
                  <h5>{this.state.personData.data.attributes["label"]}</h5>
                </Card.Title>
                <Card.Text>
                  {cardText}
                </Card.Text>
                <Card.Footer className="btn btn-primary" to={'/people/' + this.state.personData.id}>Explore</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )
    }
  }
}

export default ProfileLite;
