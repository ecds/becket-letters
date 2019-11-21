import axios from 'axios';
import DocMetaBuilder from './utilities/DocMetaBuilder';
import HeaderBuilder from './utilities/HeaderBuilder';
import MentionedLetters from './utilities/MentionedLettersTable';
import React, { Component } from 'react';

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
        description: `${this.state.entityData.attributes.label} ${this.state.entityData.attributes.properties.date}`,
        id: this.state.entityData.id
      };

      return (
        <div className="details">
          <DocMetaBuilder {...metaBuild} />
          {/* <HeaderBuilder header={this.state.entityData.attributes.label} id={this.state.entityData.id} /> */}
          <h1>
            <span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.label}} className="label"/>
            {this.state.entityData.attributes.properties['proposal'] && this.state.entityData.attributes.properties['response'] === 'no' ?
              <span>
                {this.state.entityData.attributes.properties['proposal'] ? <span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.properties['proposal']}} className="proposed-by"/> : null}
                {this.state.entityData.attributes.properties.response ? <span className="comma">{this.state.entityData.attributes.properties.response}</span> : null}
                {this.state.entityData.attributes.properties.reason ? <span className="comma">{this.state.entityData.attributes.properties.reason}</span> : null }
                {this.state.entityData.attributes.properties['notes'] ? <span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.properties['notes']}} className="notes"/> : null}
              </span>
            : <span>
                <span className="detailGroup">
                  {this.state.entityData.attributes.properties.director ? <span dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties.director }}  className="comma director"/> : null}
                  {this.state.entityData.attributes.properties.theatre ? <span dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties.theatre }}  className="comma"/> : null}
                  {this.state.entityData.attributes.properties.city ? <span dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties.city }}  className="comma"/> : null }
                  {this.state.entityData.attributes.properties.date ? <span dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties.date }}  className="comma"/> : null}
                </span>
                {this.state.entityData.attributes.properties['cast'] ? <span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.properties['cast']}} className="cast"/> : null}
                {this.state.entityData.attributes.properties['notes'] ? <span dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.properties['notes']}} className="notes"/> : null}
                <br />
                {this.state.entityData.attributes.properties['staging-beckett'] ? <a href={this.state.entityData.attributes.properties['staging-beckett']} className="btn btn-primary" target="_new">Staging Beckett</a> : null }
              </span> }
          </h1>
          {/* <table className="table table-striped">
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
           */}
          <h2>Mentioned In:</h2>
            <MentionedLetters letters={this.state.entityData.attributes['public-letters-hash']} />
        </div >
      )
    }
  }
}

export default ProductionDetails;
