import React, { Component } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
        const personData = getPersonData.data.data[0];
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
      const fullName = this.state.personData.attributes.properties["first-name"] + " " + this.state.personData.attributes.properties["last-name"];
      return (
        <Row>
          <Col>
            <Card className='profileLite-card'>
              <Card.Body>
                <Card.Img src={this.state.personData.attributes.properties.media.images[0].link} className='profileLite-card-img' />
                <Card.Title>
                  <h5>{fullName}</h5>
                </Card.Title>
                <Card.Text>
                  {this.state.personData.attributes.properties['description']}
                </Card.Text>
                <Card.Footer className="btn btn-primary" to={'/people/'+this.state.personData.id}>Explore</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )
    }
  }
}

export default ProfileLite;
