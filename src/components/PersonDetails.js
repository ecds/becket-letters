import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DocMetaBuilder from './utilities/DocMetaBuilder';
import HeaderBuilder from './utilities/HeaderBuilder';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SearchRecipientOnPage from './utilities/SearchRecipientOnPage';
import MentionedLetters from './utilities/MentionedLettersTable';

class PersonDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: '',
      entityData: [],
      receivedLetters: [],
      lettersList: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.all([
      axios.get(this.props.apiUrl +'/entities/' +  this.props.match.params.id)])
      .then(axios.spread((getEntityData) => {
        const entityData = getEntityData.data.data;
        const lettersList = getEntityData.data.data.attributes['public-letters-hash'];
        this.getReceivedLetters(getEntityData.data.data.attributes.label)
        this.setState({ entityData, lettersList });
        this.setState({ isLoaded: true })
      }))
      .catch((err) => {
        this.setState({ isLoaded: false });
        this.setState({ error: err.message });
      });
  }

  getReceivedLetters = (name) => {
    if (name !== " ") {
      axios.all([
        axios.get(this.props.apiUrl +'/letters?recipients=' +  name)])
        .then(axios.spread((getReceivedLetters) => {
          const receivedLetters = getReceivedLetters.data.data;
          this.setState({ receivedLetters });
          this.setState({ isLoaded: true })
        }))
        .catch((err) => {
          this.setState({ isLoaded: false });
          this.setState({ error: err.message });
        });
    }

  }


  render() {

    const ReceivedLettersList = this.state.receivedLetters.map((letter, index) =>
      <tr key={index}>
        <td>{letter.attributes['formatted-date']}</td>
        <td><Link to={'/letters/letterdetails/'+letter.id}>Explore Letter</Link></td>
      </tr>
    );

    const { error, isLoaded } = this.state;
    // if there is an error
    if (error) {
      return <div>Error: {error.message}</div>;
      // if not loaded show loading
    } else if (!isLoaded) {
      return <Container>Loading...</Container>;
      // return now that component has value
    } else {
      const metaBuild = {
        title: this.state.entityData.attributes.label,
        description: `${this.state.entityData.attributes.label} ${this.state.entityData.attributes.properties.description}`,
        id: this.state.entityData.id
      };
      return (
        <div className="profile-details">
        <DocMetaBuilder {...metaBuild} />
        <HeaderBuilder header={this.state.entityData.attributes.label} id={this.state.entityData.id} lifedates={this.state.entityData.attributes.properties['life-dates']} />

        <Row>
          <Col md={this.state.entityData.attributes.properties && this.state.entityData.attributes.properties.media && this.state.entityData.attributes.properties.media.images ? 10 : 12}>
          <table className="table table-striped">
            <tbody className='details-table'>
              <tr>
                <td>Description</td>
                {this.state.entityData.attributes.properties ? <td dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties.description }} /> : <td></td> }
              </tr>
              <tr>
                <td>Profile</td>
                {this.state.entityData.attributes.properties ? <td dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties.profile }} /> : <td></td> }
              </tr>
            </tbody>
          </table>
          </Col>
          {this.state.entityData.attributes.properties && this.state.entityData.attributes.properties.media && this.state.entityData.attributes.properties.media.images ? this.state.entityData.attributes.properties.media.images.map((image, index) =>
            <Col md={2}>
              <img src={image.link} alt={'photo of ' + this.state.entityData.attributes.label} className="profile-photo"/>
            </Col>
          ) : null}
        </Row>


          <h2>Letters Received:</h2>
          <SearchRecipientOnPage tableId='receivedlettersList' placeHolder='by date'/>
          <table id="receivedlettersList" className="table table-bordered">
          <thead>
            <tr>
              <th colSpan="2">Date</th>
            </tr>
          </thead>
            <tbody>
              {this.state.receivedLetters.length === 0 ? <tr><td>No Letters</td></tr> : ReceivedLettersList}

            </tbody>
          </table>
          <div className="panel">
          <h2>Mentioned in:</h2>
          <MentionedLetters letters={this.state.entityData.attributes['public-letters-hash']} />
        </div>

        </div>
      )
    }
  }
}

export default PersonDetails;
