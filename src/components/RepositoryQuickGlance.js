import React, { Component } from 'react';
import axios from 'axios';

class RepositoryQuickGlance extends Component {
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

  getData() {
    axios.all([
      axios.get(this.props.apiUrl + '/repositories/' + this.props.id)])
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
      if (this.props.type === 'nolink') {
        return (
          <p className="listLink">
            <span dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} />
          </p>
        )
      }
      else {
        return (
          <a href={'/repositories/' + this.state.entityData.id} className="listLink">{this.state.entityData.attributes.label} </a>
        )
      }
    }
  }
}

export default RepositoryQuickGlance;
