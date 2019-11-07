import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import MentionedLetters from './utilities/MentionedLettersTable';
import React, { Component } from 'react';

let striptags = require('striptags');

class ProductionDetails extends Component {


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
      let strippedDate = striptags(this.state.entityData.attributes.properties.date)
      const meta = {
        title: strippedTitle,
        description: `View details for ${strippedTitle}; ${strippedDate}`,
      };
      return (
        <div className="details">
          <DocumentMeta {...meta} />
          {this.state.entityData.attributes.label ? <h1 dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} /> : <h1>{this.state.entityData.id}</h1>}
          <table className="table table-striped">
            <tbody className='details-table'>
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
                <td dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties.director }} />
              </tr>
              <tr>
                <td>Cast</td>
                <td>{this.state.entityData.attributes.properties.cast}</td>
              </tr>
              <tr>
                <td>Proposal</td>
                <td>{this.state.entityData.attributes.properties.proposal}</td>
              </tr>
              <tr>
                <td>Response / Reason</td>
                <td className="reasonResponse">{this.state.entityData.attributes.properties.response ? <span>{this.state.entityData.attributes.properties.response}</span> : null} {this.state.entityData.attributes.properties.reason ? <span>{this.state.entityData.attributes.properties.reason}</span> : null} </td>
              </tr>
              <tr>
                <td>Theatre</td>
                <td>{this.state.entityData.attributes.properties.theatre}</td>
              </tr>

              <tr>
                <td>Notes</td>
                <td dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties.notes }} />
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

export default ProductionDetails;
