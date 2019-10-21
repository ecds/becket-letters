import React, { Component } from 'react';
import axios from 'axios';
import LetterQuickGlance from './LetterQuickGlance';
import AlternateSpellings from './utilities/AlternateSpellings';
import TableFilter from 'react-table-filter';


class TranslatingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: '',
      entityData: [],
      lettersList: []
    }
  }


  componentDidMount() {
    console.log(this.props)
    this.getData()
  }


  getData = () => {
    axios.all([
      axios.get(this.props.apiUrl+'/entities/'+this.props.match.params.id)])
      .then(axios.spread((getData) => {
        const entityData = getData.data.data;
        this.getLetters(entityData.attributes['letters-list']);
        this.setState({ entityData });
        this.setState({ isLoaded: true })
      }))
      .catch((err) => {
        this.setState({ isLoaded: false });
        this.setState({ error: err.message });
      });
  }

  getLetters(letters) {
    var theseLetters = []
    letters.forEach((letter) => {
      axios.all([
        axios.get(this.props.apiUrl+'/letters/'+letter)])
        .then(axios.spread((letterData) => {
          const letterAttributes = letterData.data.data.attributes;
          console.log(letterAttributes)
          theseLetters.push({recipient: letterAttributes['recipient-list'], date: letterAttributes['formatted-date']})
        }))

    })
    this.setState({lettersList: theseLetters})
    console.log(theseLetters)
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
          <h1 dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.label}}/>
          {this.state.entityData.attributes.properties != null ?
            <AlternateSpellings spellingList={this.state.entityData.attributes.properties['alternate-spellings']}/>
          : null }
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>Author</td>
                <td>{this.state.entityData.attributes.properties.author}</td>
              </tr>
              <tr>
                <td>Comments</td>
                <td>{this.state.entityData.attributes.properties.comments}</td>
              </tr>
              <tr>
                <td>Translated Into</td>
                <td>{this.state.entityData.attributes.properties['translated-into']}</td>
              </tr>
              <tr>
                <td>Translated Title</td>
                <td>{this.state.entityData.attributes.properties['translated-title']}</td>
              </tr>
              <tr>
                <td>Translator</td>
                <td>{this.state.entityData.attributes.properties.translator}</td>
              </tr>
            </tbody>
          </table>
          <AlternateSpellings spellingList={this.state.entityData.attributes['alternate-spelling-list']}/>
          {this.state.lettersList.map((letter) => <div>hey</div>)}
          <TableFilter
          rows={this.state.lettersList}
          onFilterUpdate={this._filterUpdated}>
          <th filterkey="recipient">
            Name
          </th>
        </TableFilter>
        </div>
      )
    }
  }
}

export default TranslatingDetails;
