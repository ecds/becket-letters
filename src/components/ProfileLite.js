import React, { Component } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
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
    console.log(this.props)
    axios.all([
      axios.get('../' + this.props.personId + '.json')])
      .then(axios.spread((getPersonData) => {
        const personData = getPersonData.data[0];
        console.log(personData);
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
      return (
        <Row>
          <Col>
            <Card className='profileLite-card'>
              <Card.Body>
                <Card.Img src={this.state.personData.Media.Images.URL} className='profileLite-card-img' />
                <Card.Title>
                  <h5>{this.state.personData.FirstName} {this.state.personData.LastName}</h5>
                </Card.Title>
                <Card.Text>
                  <p>{this.state.personData.Descriptions}</p>
                </Card.Text>
                <Button variant="primary">Explore</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )
    }
  }
}

export default ProfileLite;