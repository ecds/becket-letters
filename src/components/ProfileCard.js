import React, { Component } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { nullLiteral } from '@babel/types';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: '',
      personData: []
    }
  }

  componentDidMount() {
    console.log("in profile card");
    this.getData();
  }

  getData = () => {
    axios.all([
      axios.get('http://ot-api.ecdsdev.org/entities/' + this.props.personId)])
      .then(axios.spread((getPersonData) => {
        const personData = getPersonData.data;
        console.log(personData)
        this.setState({ personData });
        this.setState({ isLoaded: true })
      }))
      .catch((err) => {
        this.setState({ isLoaded: false });
        this.setState({ error: err.message });
      });
  }

  renderPhoto() {
    if (this.state.personData.data.attributes.properties != null) {
      if (this.state.personData.data.attributes.properties.media != null) {
        return <Card.Img src={this.state.personData.data.attributes.properties.media.images["0"].link} className='profileLite-card-img' />
      }
      else {
        return  <Card.Img src="http://localhost:3000/imgs/empty-profile-pic.jpg" className='profileLite-card-img' />
      }
    }
    else {
      return  <Card.Img src="http://localhost:3000/imgs/empty-profile-pic.jpg" className='profileLite-card-img' />
    }
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
            <Card className='relationship-card'>
              <Card.Body>
                <Row>
                  <Col sm={6}>{this.renderPhoto()}</Col>
                  <Col sm= {6}>
                    <Card.Text>
                      <h5>{this.state.personData.data.attributes["label"]}</h5>
                      {this.state.personData.data.attributes.properties ? " (" + this.state.personData.data.attributes.properties['life-dates'] + ") " : null}
                      {this.state.personData.data.attributes.properties ? this.state.personData.data.attributes.properties['description'] : null}
                      {this.state.personData.data.attributes ? <div dangerouslySetInnerHTML={{__html: this.state.personData.data.attributes.description}} /> : null}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer><a href={ '/people/' + this.state.personData.data.id }>Explore</a></Card.Footer>
            </Card>

      )
    }
  }
}

export default ProfileCard;
