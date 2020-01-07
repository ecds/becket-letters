import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DocMetaBuilder from './utilities/DocMetaBuilder';
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
        console.log(entityData)

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
        description: `View details for ${this.state.entityData.attributes.label}`,
        id: this.state.entityData.id
      };
      return (
        <div className="details">
        <DocMetaBuilder {...metaBuild} />
        <h1>
          <span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.properties ? this.state.entityData.attributes.properties['last-name'] : null}} />
          <span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.properties ? this.state.entityData.attributes.properties['first-name'] : null}} className="comma" />
          {this.state.entityData.attributes.properties && this.state.entityData.attributes.properties['alternate-names-spellings'].length > 0 ? <span className='spellings'>{this.state.entityData.attributes.properties['alternate-names-spellings'].map((entity, key) => <span key={key}  dangerouslySetInnerHTML={{__html: entity}} className="list-span"></span>)} </span> :null}
          {this.state.entityData.attributes.properties ? <span className="comma">{this.state.entityData.attributes.properties['life-dates']}</span> : null}
          {this.state.entityData.attributes.properties ? <span className="comma" dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties.description }} /> : null}


        </h1>
        {this.state.entityData.attributes.properties && this.state.entityData.attributes.properties.links && this.state.entityData.attributes.properties.links.length > 0 ?
          <a href={this.state.entityData.attributes.properties ? this.state.entityData.attributes.properties.links[0] : null} target="_blank" rel="noopener noreferrer" className="btn btn-primary">VIAF</a>
           : null }
        {this.state.entityData.attributes.properties && this.state.entityData.attributes.properties.profile ?
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#personProfile" aria-expanded="false" aria-controls="personProfile">
              View Profile
            </button>
           : null }
        {this.state.entityData.attributes.properties && this.state.entityData.attributes.properties.profile ?
          <div class="collapse" id="personProfile">
              {this.state.entityData.attributes.properties && this.state.entityData.attributes.properties.media && this.state.entityData.attributes.properties.media.images ? this.state.entityData.attributes.properties.media.images.map((image, index) =>
                  <Row><Col md={9}><div dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties.profile }}/></Col>
                  <Col md={3}><img src={image.link} alt={'photo of ' + this.state.entityData.attributes.label} className="profile-photo"/></Col></Row>
              ) : <div dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties.profile }}/> }
            </div>
              : null }

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
