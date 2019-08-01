import React, { Component } from "./node_modules/react";

import axios from "./node_modules/axios";

export class People extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      isLoaded: false,
      people: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/people.json`)
      .then(res => {
        const people = res.data.data;
        this.setState({
          isLoaded: true,
          people: people
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
          <p>{this.state.people}</p>
        </div>
      )
    }
  }
}

export default People;