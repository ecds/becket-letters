import React, { Component } from "./node_modules/react";

import axios from "./node_modules/axios";

export class Letters extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      isLoaded: false,
      letters: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/letters.json`)
      .then(res => {
        const letters = res.data.data;
        this.setState({
          isLoaded: true,
          letters: letters
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
          <p>{this.state.letters}</p>
        </div>
      )
    }
  }
}

export default Letters;