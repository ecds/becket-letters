import React, { Component } from 'react';
import axios from 'axios';
import AlternateSpellings from './utilities/AlternateSpellings';
import LetterQuickGlance from './LetterQuickGlance';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import SearchRecipientOnPage from './utilities/SearchRecipientOnPage';

class ProductionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: '',
      entityData: [],
      lettersList: [],
      lettersLoaded: false
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.all([
      axios.get(this.props.apiUrl + '/entities/' + this.props.match.params.id)])
      .then(axios.spread((getData) => {
        const entityData = getData.data.data;
        const lettersList = getData.data.data.attributes['public-letters-hash'];
        this.setState({ entityData, lettersList, isLoaded: true });
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

        <div className="details">
          <h1 dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} />
          {this.state.entityData.attributes.properties != null ?
            <AlternateSpellings spellingList={this.state.entityData.attributes.properties['alternate-spellings']} />
            : null}
          {this.state.entityData.attributes.properties != null ?
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>City</td>
                  <td>{this.state.entityData.attributes.properties.city}</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{this.state.entityData.attributes.properties.date}</td>
                </tr>
                <tr>
                  <td>Director</td>
                  <td>{this.state.entityData.attributes.properties.director}</td>
                </tr>
                <tr>
                  <td>Proposal</td>
                  <td>{this.state.entityData.attributes.properties.proposal}</td>
                </tr>
                <tr>
                  <td>Reason</td>
                  <td>{this.state.entityData.attributes.properties.reason}</td>
                </tr>
                <tr>
                  <td>Response</td>
                  <td>{this.state.entityData.attributes.properties.response}</td>
                </tr>
                <tr>
                  <td>Theatre</td>
                  <td>{this.state.entityData.attributes.properties.theatre}</td>
                </tr>
              </tbody>
            </table>
            : null
          }

          <h2>Letters <span dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} /> Mentioned In:</h2>
          <SearchRecipientOnPage tableId='repositoryLetters' placeHolder='by recipient' />
          <table className='table table-bordered' id='repositoryLetters'>
            <thead>
              <tr>
                <th>Recipient(s)</th>
                <th colSpan="2">Date</th>
              </tr>
            </thead>
            {this.state.lettersList.map((letter, index) =>
              <tr>
                <td>{letter['recipients'].map((this_recipient) => <a href={'/people/' + this_recipient.id + '/' + this_recipient.name}>{this_recipient.name}</a>)}</td>
                <td>{letter['date']}</td>
                <td className="actions"><a href={'/letters/letterdetails/' + letter.id}>Explore Letter</a></td>
              </tr>
            )}
          </table>

        </div>
      )
    }
  }
}

export default ProductionDetails;
