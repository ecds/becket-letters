import axios from 'axios';
import DocMetaBuilder from './utilities/DocMetaBuilder';
import HeaderBuilder from './utilities/HeaderBuilder';
import MentionedLetters from './utilities/MentionedLettersTable';
import React, { Component } from 'react';

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
        description: `${this.state.entityData.attributes.label} ${this.state.entityData.attributes.properties['publication-information']}`,
        id: this.state.entityData.id
      };
      return (
        <div className="details">
          <DocMetaBuilder {...metaBuild} />
          {/* <HeaderBuilder header={this.state.entityData.attributes.label} id={this.state.entityData.id} /> */}
          <h1>
           <span dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label}}/>
           {this.state.entityData.attributes.properties.author ? <span className="comma">{this.state.entityData.attributes.properties.author}</span> : null}
           {this.state.entityData.attributes.properties.translator ? <span className="comma">{this.state.entityData.attributes.properties.translator}</span> : null}
           {this.state.entityData.attributes.properties['publication-information'] ? <span className="comma" dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties['publication-information'] }} /> : null}
           {this.state.entityData.attributes.properties['notes'] ? <span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.properties['notes']}} className="notes"/> : null}
          </h1>
          {/*
          <table className="table table-striped">
            <tbody className='details-table'>
              <tr>
                <td>Author</td>
                <td>{this.state.entityData.attributes.properties.author}</td>
              </tr>
              <tr>
                <td>Translator</td>
                <td>{this.state.entityData.attributes.properties.translator}</td>
              </tr>
              <tr>
                <td>Publication Information</td>
                <td  />
              </tr>
              <tr>
                <td>Notes</td>
                <td dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties['notes'] }} />
              </tr>
            </tbody>
          </table>
          */}
          <h2>Mentioned In:</h2>
          <MentionedLetters letters={this.state.entityData.attributes['public-letters-hash']} />
        </div >
      )
    }
  }
}

export default PublicationDetails;
