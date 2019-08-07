import React, { Component } from "react";

import axios from "axios";

export class Places extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      isLoaded: false,
      places: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/places.json`)
      .then(res => {
        const places = res.data.data;
        this.setState({
          isLoaded: true,
          places: places
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message
        });
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
        <div>
          <p>{this.state.places}</p>
          Places
        </div>
      )
    }
  }
}

export default Places;
