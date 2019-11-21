import React, { Component } from 'react';
import axios from 'axios';
import DocMetaBuilder from './utilities/DocMetaBuilder';
import MentionedLetters from './utilities/MentionedLettersTable';

class Place extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      isLoaded: false,
      entityData: []
    };

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
        description: `${this.state.entityData.attributes.label}`,
        id: this.state.entityData.id
      };
      return (
        <div className="details">
          <DocMetaBuilder {...metaBuild} />
          {/*<HeaderBuilder header={this.state.entityData.attributes.label} id={this.state.entityData.id} />*/}
          <h1>
            <span dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label}}/>
            {this.state.entityData.attributes.properties ?
            <span>{this.state.entityData.attributes.properties['alternate-spellings'].length > 0 ? <span className='spellings'>{this.state.entityData.attributes.properties['alternate-spellings'].map((entity, key) => <span key={key}  dangerouslySetInnerHTML={{__html: entity}} className="list-span"></span>)} </span> : null}
            {this.state.entityData.attributes.properties.description && this.state.entityData.attributes.properties.description != "" ? <span className="comma" dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.properties.description}} /> : null}
            {this.state.entityData.attributes.properties['links'].length > 0 ? <span className='comma'>{this.state.entityData.attributes.properties['links'].map((entity, key) => <a target="_new" key={key} href={entity}>{entity}</a>)} </span> : null}
            </span>
            : null}
          </h1>
          {/*
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
          </table>*/}
          <h2>Mentioned In:</h2>
          <MentionedLetters letters={this.state.entityData.attributes['public-letters-hash']} />
        </div >
      )
    }
  }
}

export default Place;
