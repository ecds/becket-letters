import React, { Component } from 'react';
import { Container, Button, Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';

class ProfileLite extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: '',
      personData: []
    }
  }

  componentWillReceiveProps() {

  }

  componentDidMount() {
    const { match: { params } } = this.props;
    axios.all([
      axios.get('../' + params.personId + '.json')])
      .then(axios.spread((getPersonData) => {
        const personData = getPersonData.data.data[0];
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
      const fullName = this.state.personData.attributes.properties["first-name"] + " " + this.state.personData.attributes.properties["last-name"];
      return (
        <Container>
          <Row>
            <Col md={6}>
              <img src={this.state.personData.attributes.properties.media.images[0].link} className='profileLite-card-img' />
            </Col>
            <Col md={6}>
              <h5>{fullName}</h5>
              {this.state.personData.attributes.properties.profile}
            </Col>
          </Row>

        </Container>
      )
    }
  }
}

export default ProfileLite;
