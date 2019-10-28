import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import MentionedLetters from './utilities/MentionedLettersTable';
import React, { Component } from 'react';
import SearchRecipientOnPage from './utilities/SearchRecipientOnPage';

let striptags = require('striptags');

class PublicEventDetails extends Component {


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
      let strippedTitle = striptags(this.state.entityData.attributes.label)
      let strippedDate = striptags(this.state.entityData.attributes.properties.date)
      const meta = {
        title: strippedTitle,
        description: `View details for ${strippedTitle}; ${strippedDate}`,
      };
      return (
        <div className="details">
        <DocumentMeta {...meta} />
          <h1 dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} />
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>Date</td>
                <td>{this.state.entityData.attributes.properties.date}</td>
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

export default PublicEventDetails;
