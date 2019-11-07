import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import MentionedLetters from './utilities/MentionedLettersTable';
import React, { Component } from 'react';
import SearchRecipientOnPage from './utilities/SearchRecipientOnPage';

let striptags = require('striptags');

class PublicationDetails extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: '',
      entityData: []
    }
  }


  componentDidMount() {
    this.getData()
  }


  getData = () => {
    axios.all([
      axios.get(this.props.apiUrl + '/entities/' + this.props.match.params.id)])
      .then(axios.spread((getData) => {
        const entityData = getData.data.data;
        console.log(entityData)
        this.setState({ entityData });
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
      let strippedTitle
      if (this.state.entityData.attributes.label) {
        strippedTitle = striptags(this.state.entityData.attributes.label)
      }
      else {
        strippedTitle = this.state.entityData.id
      }
      let strippedPlace = striptags(this.state.entityData.attributes.properties.place)
      const meta = {
        title: strippedTitle,
        description: `View details for ${strippedTitle}; ${strippedPlace}`,
      };
      return (
        <div className="details">
          <DocumentMeta {...meta} />
          <h1 dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} />
          <table className="table table-striped">
            <tbody className='details-table'>
              <tr>
                <td>Author</td>
                <td>{this.state.entityData.attributes.properties.author}</td>
              </tr>
              <tr>
                <td>Translator</td>
                <td>{this.state.entityData.attributes.properties.translator}</td>
              </tr>
              <tr>
                <td>Publication Information</td>
                <td dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties['publication-information'] }} />
              </tr>
              <tr>
                <td>Notes</td>
                <td dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties['notes'] }} />
              </tr>
            </tbody>
          </table>
          <h2>Mentioned In:</h2>
          <SearchRecipientOnPage tableId='repositoryLetters' placeHolder='by recipient' />
          <table className='table table-bordered' id='repositoryLetters'>
            <thead>
              <tr>
                <th>Recipient</th>
                <th colSpan="2">Date</th>
              </tr>
            </thead>
            <MentionedLetters letters={this.state.entityData.attributes['public-letters-hash']} />

          </table>
        </div >
      )
    }
  }
}

export default PublicationDetails;
