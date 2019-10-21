import React, { Component } from 'react';
import axios from 'axios';
import AlternateSpellings from './utilities/AlternateSpellings';
import LetterQuickGlance from './LetterQuickGlance';

class OrganizationDetails extends Component {


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
          <h1 dangerouslySetInnerHTML={{__html: this.state.entityData.attributes.label}}/>
          <div>{this.state.entityData.attributes.properties['description']}</div>
            <AlternateSpellings spellingList={this.state.entityData.attributes.properties['alternate-spellings']}/>
        </div>
      )
    }
  }
}

export default OrganizationDetails;
