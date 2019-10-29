import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import MentionedLetters from './utilities/MentionedLettersTable';
import React, { Component } from 'react';
import SearchRecipientOnPage from './utilities/SearchRecipientOnPage';

let striptags = require('striptags');

class TranslationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: '',
      entityData: [],
      lettersList: []
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
      let strippedTitle = striptags(this.state.entityData.attributes.label)
      let strippedIntoLang = striptags(this.state.entityData.attributes.properties['translated-into'])
      let strippedTranslator = striptags(this.state.entityData.attributes.properties.translator)
      const meta = {
        title: `${strippedTitle} translated by ${strippedTranslator}`,
        description: `View details for ${strippedTitle}; translated into ${strippedIntoLang} by ${strippedTranslator}`,
      };
      return (
        <div className="details">
          <DocumentMeta {...meta} />
          <h1 dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} />
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>Author</td>
                <td>{this.state.entityData.attributes.properties.author}</td>
              </tr>
              <tr>
                <td>Comments</td>
                <td>{this.state.entityData.attributes.properties.comments}</td>
              </tr>
              <tr>
                <td>Translated Into</td>
                <td>{this.state.entityData.attributes.properties['translated-into']}</td>
              </tr>
              <tr>
                <td>Translated Title</td>
                <td dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties['translated-title']}}></td>
              </tr>
              <tr>
                <td>Translator</td>
                <td>{this.state.entityData.attributes.properties.translator}</td>
              </tr>
            </tbody>
          </table>
          <h2>Mentioned In:</h2>
          <SearchRecipientOnPage tableId='repositoryLetters' placeHolder='by recipient' />
          <table className='table table-bordered' id='repositoryLetters'>
            <thead>
              <tr>
                <th>Recipient(s)</th>
                <th colSpan="2">Date</th>
              </tr>
            </thead>
            <MentionedLetters letters={this.state.entityData.attributes['public-letters-hash']} />
          </table>
        </div>
      )
    }
  }
}

export default TranslationDetails;
