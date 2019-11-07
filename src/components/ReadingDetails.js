import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import axios from 'axios';
import MentionedLetters from './utilities/MentionedLettersTable';


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
      const meta = {
        title: strippedTitle,
        description: `View details for ${strippedTitle}`,
      };
      return (
        <div className="details">
          <DocumentMeta {...meta} />
          {this.state.entityData.attributes.label ? <h1 dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} /> : <h1>{this.state.entityData.id}</h1>}
          <table className="table table-striped">
            <tbody className='details-table'>
              <tr>
                <td>Authors</td>
                <td>{this.state.entityData.attributes.properties.authors}</td>
              </tr>
              <tr>
                <td>Publication</td>
                <td dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties.publication }} />
              </tr>
            </tbody>
          </table>
          <h2>Mentioned In:</h2>
          <MentionedLetters letters={this.state.entityData.attributes['public-letters-hash']} />
        </div >
      )
    }
  }
}

export default PublicationDetails;
