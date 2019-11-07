import axios from 'axios';
import DocMetaBuilder from './utilities/DocMetaBuilder';
import MentionedLetters from './utilities/MentionedLettersTable';
import React, { Component } from 'react';

class AttendanceDetails extends Component {
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
      let metaBuild = {
        title: this.state.entityData.attributes.label,
        description: `${this.state.entityData.attributes.label} ${this.state.entityData.attributes.properties['place-date']}`,
        id: this.state.entityData.id
      }
      return (
        <div className="details">
          <DocMetaBuilder {...metaBuild} />
          {this.state.entityData.attributes.label ? <h1 dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} /> : <h1>{this.state.entityData.id}</h1>}
          <table className="table table-striped">
            <tbody className='details-table'>
              <tr>
                <td>Event Type</td>
                <td>{this.state.entityData.attributes.properties['event-type']}</td>
              </tr>
              <tr>
                <td>Place and Date</td>
                <td>{this.state.entityData.attributes.properties['place-date']}</td>
              </tr>
              <tr>
                <td>Performed By</td>
                <td>{this.state.entityData.attributes.properties && this.state.entityData.attributes.properties['performed-by'] ? <ul className="noBullets">{this.state.entityData.attributes.properties['performed-by'].map((entity, key) => <li key={key}>{entity}</li>)}</ul> : null}</td>
              </tr>
              <tr>
                <td>Attended With</td>
                <td>{this.state.entityData.attributes.properties['attended-with']}</td>
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

export default AttendanceDetails;
