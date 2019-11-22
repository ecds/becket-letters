import React, { Component } from 'react';
import axios from 'axios';
import DocMetaBuilder from './utilities/DocMetaBuilder';
import MentionedLetters from './utilities/MentionedLettersTable';
import HeaderBuilder from './utilities/HeaderBuilder';

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
          <HeaderBuilder entityData={this.state.entityData.attributes.label} id={this.state.entityData.id} />
          
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
