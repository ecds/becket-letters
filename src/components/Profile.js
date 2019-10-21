import React, { Component } from 'react';
import { Container, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';
import LetterQuickGlance from './LetterQuickGlance';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import SearchRecipientOnPage from './utilities/SearchRecipientOnPage';

class ProfileLite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: '',
      personData: [],
      receivedLetters: [],
      lettersList: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.all([
      axios.get(this.props.apiUrl +'/entities/' +  this.props.match.params.id), axios.get(this.props.apiUrl +'/letters?recipient=' +  this.props.match.params.name)])
      .then(axios.spread((getPersonData, getReceivedLetters) => {
        const personData = getPersonData.data.data;
        console.log(personData)
        const lettersList = getPersonData.data.data.attributes['public-letters-hash'];
        const receivedLetters = getReceivedLetters.data.data;
        this.setState({ personData, lettersList, receivedLetters });
        this.setState({ isLoaded: true })
      }))
      .catch((err) => {
        this.setState({ isLoaded: false });
        this.setState({ error: err.message });
      });
  }


  getProfilePicture() {
    console.log(this.state.personData.attributes.properties.media.images.length)
      return
  }

  render() {
    const LettersList = this.state.lettersList.map((letter, index) =>
    <tr>
      <td>{letter['recipients'].map((this_recipient) => <a href={'/people/'+this_recipient.id+'/'+this_recipient.name}>{this_recipient.name}</a>)}</td>
      <td>{letter['date']}</td>
      <td className="actions"><a href={'/letters/letterdetails/'+letter.id}>Explore Letter</a></td>
    </tr>
    );
    const ReceivedLettersList = this.state.receivedLetters.map((letter, index) =>
      <tr>
        <td>{letter.attributes['formatted-date']}</td>
        <td><a href={'/letters/letterdetails/'+letter.id}>Explore Letter</a></td>
      </tr>
    );

    const columns = [{
      dataField: 'id',
      text: 'ID'
    },{
      dataField: 'attributes[formatted-date]',
      text: 'Formatted Date'
    }];
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
            {this.state.personData.attributes.properties['life-dates'] ? " (" + this.state.personData.attributes.properties['life-dates'] + ") " : null}
          </h1>
          <div className="title">
          {this.state.personData.attributes.properties ? <div dangerouslySetInnerHTML={{__html: this.state.personData.attributes.properties['description']}} />  : null}
          </div>

          <div className="description">
            {this.state.personData.attributes.properties.media ? this.state.personData.attributes.properties.media.images.map((image, index) =>
              <img src={image.link} className="profile-photo"/>
            ) : null}
            {this.state.personData.attributes.properties ? <div dangerouslySetInnerHTML={{__html: this.state.personData.attributes.properties['profile']}} /> : null}
          </div>
          <h2>Letters {this.state.personData.attributes.label} Received from Samuel Beckett:</h2>
          <SearchRecipientOnPage tableId='receivedlettersList' placeHolder='by date'/>
          <table id="receivedlettersList" className="table table-bordered">
          <thead>
            <tr>
              <th colSpan="2">Date(s)</th>
            </tr>
          </thead>
            <tbody>
              {ReceivedLettersList}
            </tbody>
          </table>
          <div className="panel">
          <h2>Letters Samuel Beckett Mentioned {this.state.personData.attributes.label} in:</h2>
          <SearchRecipientOnPage tableId='lettersList' placeHolder='for recipient'/>

          <table id="lettersList" className="table table-bordered">
          <thead>
            <tr>
              <th>Recipient(s)</th>
              <th colSpan="2">Date</th>
            </tr>
          </thead>
          <tbody>
            {LettersList}
          </tbody>
        </table>
        </div>

        </div>
      )
    }
  }
}

export default ProfileLite;
