import React, { Component } from 'react';
import axios from 'axios';
import LetterQuickGlance from './LetterQuickGlance';
import SearchRecipientOnPage from './utilities/SearchRecipientOnPage';

class RepositoryDetails extends Component {


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
      axios.get(this.props.apiUrl +'/repositories/'+this.props.match.params.id)])
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
          <h1 dangerouslySetInnerHTML={{__html: 'Repository Name: ' + this.state.entityData.attributes.label}}/>
          <table className='table table-bordered'>
            <tr>
              <td>American</td>
              <td>{this.state.entityData.attributes.american ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Letter Count</td>
              <td>{this.state.entityData.attributes['letter-count']}</td>
            </tr>
          </table>
          <SearchRecipientOnPage tableId='repositoryLetters' placeHolder='by recipient'/>
          <table className='table table-bordered' id='repositoryLetters'>
          <thead>
            <tr>
              <th>Recipient(s)</th>
              <th colSpan="2">Date</th>
            </tr>
          </thead>
          {this.state.entityData.attributes['public-letters-hash'].map((letter, index) =>
            <tr>
              <td>{letter['recipients'].map((this_recipient) => <a href={'/people/'+this_recipient.id+'/'+this_recipient.name}>{this_recipient.name}</a>)}</td>
              <td>{letter['date']}</td>
              <td className="actions"><a href={'/letters/letterdetails/'+letter.id}>Explore Letter</a></td>
            </tr>
          )}
          </table>
        </div>
      )
    }
  }
}

export default RepositoryDetails;
