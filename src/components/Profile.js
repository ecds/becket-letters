import React, { Component } from 'react';
import { Container, Button, Card, Col, Row, Popover, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';
import LetterQuickGlance from './LetterQuickGlance';

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
    this.getData()
  }

  getAlternateSpellings() {
    if (this.state.personData.attributes["alternate-spelling-list"].length > 0) {
      return <Popover id="popover-basic">
          <Popover.Title as="h3">Alternate Spellings</Popover.Title>
          <Popover.Content>
            {this.state.personData.attributes["alternate-spelling-list"].map((spelling, i) => <span className='list-span' key={i}>{spelling}</span>)}
          </Popover.Content>
        </Popover>
    }
  }


  getData = () => {
    axios.all([
      axios.get('http://ot-api.ecdsdev.org/entities/' +  this.props.match.params['personId'])])
      .then(axios.spread((getPersonData) => {
        const personData = getPersonData.data.data;
        console.log(personData)
        this.setState({ personData });
        this.setState({ isLoaded: true })
      }))
      .catch((err) => {
        this.setState({ isLoaded: false });
        this.setState({ error: err.message });
      });
  }

  getProfilePicture() {
    if (this.state.personData.attributes.properties > 0) {
      return <img src={this.state.personData.attributes.properties.media.images[0].link} className="profile-photo"/>
    }
  }

  getLettersList() {
    if (this.state.personData.attributes['letters-list'].length > 0) {
      return this.state.personData.attributes['letters-list'].map((letter) => <LetterQuickGlance letterId={letter}/>)
    }

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
        <div className="profile-details">
          <h1>{this.state.personData.attributes.label}
            <sup><OverlayTrigger trigger="click" placement="right" overlay={this.getAlternateSpellings()}>
              <Button className="additional-info">?</Button>
            </OverlayTrigger></sup>
            {this.state.personData.attributes.properties ? " (" + this.state.personData.attributes.properties['life-dates'] + ") " : null}
            {this.state.personData.attributes.properties ? <div dangerouslySetInnerHTML={{__html: this.state.personData.attributes.properties['description']}} />  : null}

          </h1>

          <p className="lead">
            {this.state.personData.attributes.properties ? this.getProfilePicture() : null}

            {this.state.personData.attributes.properties ? this.state.personData.attributes.properties['profile'] : null}
          </p>
          <h2>Letters List</h2>
            {this.getLettersList()}
        </div>
      )
    }
  }
}

export default ProfileLite;
