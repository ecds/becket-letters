import React, { Component } from 'react';
import axios from 'axios';
import SearchRecipientOnPage from '../utilities/SearchRecipientOnPage';
import DocMetaBuilder from '../utilities/DocMetaBuilder';
import HeaderBuilder from '../utilities/HeaderBuilder';

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
      axios.get(this.props.apiUrl + '/repositories/' + this.props.match.params.id)])
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
      const metaBuild = {
        title: this.state.entityData.attributes.label,
        description: `${this.state.entityData.attributes.label} ${this.state.entityData.attributes['letter-count']} letters`,
        id: this.state.entityData.id
      };
      return (
        <div className="details">
          <DocMetaBuilder {...metaBuild} />
          <HeaderBuilder header={this.state.entityData} id={this.state.entityData.id} />
          <table className='table table-striped'>
            <tbody className='details-table'>
            <tr>
              <td>Letter Count</td>
              <td>{this.state.entityData.attributes['letter-count']}</td>
            </tr>
            </tbody>
          </table>
          <SearchRecipientOnPage tableId='repositoryLetters' placeHolder='by recipient' />
          <table className='table table-bordered' id='repositoryLetters'>
            <thead>
              <tr>
                <th>Recipient</th>
                <th colSpan="2">Date</th>
              </tr>
            </thead>
            {this.state.entityData.attributes['public-letters-hash'].map((letter, index) =>
              <tr>
                <td>{letter['recipients'].map((this_recipient, i) => [
                                        i > 0 && ", ",
                                        <a href={'/people/' + this_recipient.id + '/'} key={i} tag={this_recipient}>{this_recipient.name}</a>
                                    ])}</td>
                <td>{letter['date']}</td>
                <td className="actions"><a href={'/letters/letterdetails/' + letter.id}>Explore Letter</a></td>
              </tr>
            )}
            {this.state.entityData.attributes['public-letters-hash'].length === 0 ? <tr><td colSpan='2'>No Letters</td></tr>:null}
          </table>
        </div>
      )
    }
  }
}

export default RepositoryDetails;
