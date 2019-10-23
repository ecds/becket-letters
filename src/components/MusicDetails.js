import React, { Component } from 'react';
import axios from 'axios';
import LetterQuickGlance from './LetterQuickGlance';
import AlternateSpellings from './utilities/AlternateSpellings';
import SearchRecipientOnPage from './utilities/SearchRecipientOnPage';
import MentionedLetters from './utilities/MentionedLettersTable';

class MusicDetails extends Component {


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
      axios.get(this.props.apiUrl+'/entities/'+this.props.match.params.id)])
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
      return (
        <div className="details">
          <h1 dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} />
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>Composer</td>
                <td>{this.state.entityData.attributes.properties.composer}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{this.state.entityData.attributes.properties.description}</td>
              </tr>
              <tr>
                <td>Performed by</td>
                <td>{this.state.entityData.attributes.properties['performed-by']}</td>
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
        </div >
      )
    }
  }
}

export default MusicDetails;
