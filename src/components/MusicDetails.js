import axios from 'axios';
import DocMetaBuilder from './utilities/DocMetaBuilder';
import HeaderBuilder from './utilities/HeaderBuilder';
import MentionedLetters from './utilities/MentionedLettersTable';
import React, { Component } from 'react';

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
      axios.get(this.props.apiUrl + '/entities/' + this.props.match.params.id)])
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
        description: `${this.state.entityData.attributes.label} ${this.state.entityData.attributes.properties.description}`,
        id: this.state.entityData.id
      };
      return (
        <div className="details">
          <DocMetaBuilder {...metaBuild} />
          {/* <HeaderBuilder header={this.state.entityData.attributes.label} id={this.state.entityData.id} />*/}
          <h1>
            <span>{this.state.entityData.attributes.properties !== null ? this.state.entityData.attributes.properties.composer : null}</span>
            <span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.label}} className="comma"/>
            {this.state.entityData.attributes.properties['alternative-titles'].length > 0 ? <span className='spellings'>{this.state.entityData.attributes.properties['alternative-titles'].map((entity, key) => <span key={key}  dangerouslySetInnerHTML={{__html: entity}} className="list-span"></span>)} </span> : ', '}
            {this.state.entityData.attributes.properties['description'] ? <span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.properties['description']}} className="notes"/> : null}
]            {this.state.entityData.attributes.properties['performed-by'] ? <p><span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.properties['performed-by']}} className="new-line performed-by"/></p> : null}
            {this.state.entityData.attributes.properties['notes'] ? <p><span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.properties['notes']}} className="notes"/></p> : null}
          </h1>
          {/* <table className="table table-striped">
            <tbody className='details-table'>
              <tr>
                <td>Composer</td>
                <td>{this.state.entityData.attributes.properties !== null ? this.state.entityData.attributes.properties.composer : null}</td>
              </tr>
              <tr>
                <td>Alternative Title</td>
                {this.state.entityData.attributes.properties !== null ? <td dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties['alternative-titles'] }} /> : <td></td>}
              </tr>
              <tr>
                <td>Description</td>
                {this.state.entityData.attributes.properties !== null ? <td dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties['description'] }} /> : <td></td>}
              </tr>
              <tr>
                <td>Performed by</td>
                {this.state.entityData.attributes.properties !== null ? <td dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties['performed-by'] }} /> : <td></td>}
              </tr>
            </tbody>
          </table>*/}
          <h2>Mentioned In:</h2>
          <MentionedLetters letters={this.state.entityData.attributes['public-letters-hash']} />
        </div >
      )
    }
  }
}

export default MusicDetails;
