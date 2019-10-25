import React, { Component } from 'react';
import axios from 'axios';
import LetterQuickGlance from './LetterQuickGlance';
import AlternateSpellings from './utilities/AlternateSpellings';
import TableFilter from 'react-table-filter';
import SearchRecipientOnPage from './utilities/SearchRecipientOnPage';
import MentionedLetters from './utilities/MentionedLettersTable';


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
    console.log(this.props)
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
      console.log(this.state.lettersList)
      return (
        <div className="details">
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
          <h2>Letters <span dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} /> is Mentioned In:</h2>
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
