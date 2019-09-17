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


  componentDidMount() {
    axios.all([
      axios.get('http://ot-api.ecdsdev.org/entities/' +  this.props.history.location.state.id)])
      .then(axios.spread((getPersonData) => {
        const personData = getPersonData.data.data;
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
      return <Container>Loading...</Container>;
      // return now that component has value
    } else {
      return (
        <Container>
          <h1>{this.state.personData.attributes.label}</h1>
        </Container>
      )
    }
  }
}

export default ProfileLite;
