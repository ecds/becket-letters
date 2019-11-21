import axios from 'axios';
import DocMetaBuilder from './utilities/DocMetaBuilder';
import HeaderBuilder from './utilities/HeaderBuilder';
import MentionedLetters from './utilities/MentionedLettersTable';
import React, { Component } from 'react';

class WorksOfArtDetails extends Component {


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
      const metaBuild = {
        title: this.state.entityData.attributes.label,
        description: `${this.state.entityData.attributes.label} ${this.state.entityData.attributes.properties.artist}`,
        id: this.state.entityData.id
      };
      return (
        <div className="details">
          <DocMetaBuilder {...metaBuild} />
          {/*<HeaderBuilder header={this.state.entityData.attributes.label} id={this.state.entityData.id} />  */}
          <h1>
            {this.state.entityData.attributes.properties.artist ? <span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.properties.artist}} /> : null}
            {this.state.entityData.attributes.label ? <span className="comma" dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.label}} /> : null}
            {this.state.entityData.attributes.properties['alternative-spellings'].length > 0 ? <span className='spellings'>{this.state.entityData.attributes.properties['alternative-spellings'].map((entity, key) => <span key={key}  dangerouslySetInnerHTML={{__html: entity}} className="list-span"></span>)} </span> : ', '}
          </h1>
          {this.state.entityData.attributes.properties.description ? <h3><span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.properties.description}} /></h3> : null}

          {this.state.entityData.attributes.properties['owner-location-accession-number-contemporaneous'] ?
          <h3>
            <p><i>Contemporaneous:  </i> {this.state.entityData.attributes.properties['owner-location-accession-number-contemporaneous']}</p>
          </h3>
          : null }
          <h3>
            <p><i>Current: </i> {this.state.entityData.attributes.properties['owner-location-accession-number-current'] ? <span>{this.state.entityData.attributes.properties['owner-location-accession-number-current']}</span> : 'Unknown'}</p>
          </h3>

          {/*<table className="table table-striped">
            <tbody className='details-table'>
              <tr>
                <td>Artist</td>
                <td>{this.state.entityData.attributes.properties.artist}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{this.state.entityData.attributes.properties.location}</td>
              </tr>
              <tr>
                <td>Owner</td>
                <td>{this.state.entityData.attributes.properties.owner}</td>
              </tr>
            </tbody>
          </table> */}
          <h2>Mentioned In:</h2>
          <MentionedLetters letters={this.state.entityData.attributes['public-letters-hash']} />
        </div >
      )
    }
  }
}

export default WorksOfArtDetails;
