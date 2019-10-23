import React, { Component } from 'react';
import axios from 'axios';

class QuickGlance extends Component {
  constructor(props) {
      super(props);
      this.state= {
        isLoaded: false,
        error: '',
        entityData: []
      }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios.all([
        axios.get(this.props.apiUrl+'/'+this.props.apiUrlExtender+'/'+this.props.id)])
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
        <a href={'/people/' + this.state.entityData.id + '/'+this.state.entityData.attributes.label} name={this.state.entityData.attributes.label}>{this.state.entityData.attributes.label} </a>
      )
    }
  }
}

export default QuickGlance;