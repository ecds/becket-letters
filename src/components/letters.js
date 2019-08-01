import React, { Component } from "react";
import axios from "axios";

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
    axios.all([
      axios.get('letters_json.json')    ])
    .then(axios.spread((getLetters) => {
      const letters = getLetters.data;
      this.setState({ letters });
      console.log(letters)
    }))
    .catch((err) => {
      this.setState({ isLoaded:false });
      this.setState({ error:err.message });
    });
  }

  render() {
    const allLetters = this.state.letters.map((letter) => <li>{letter.ID}, {letter.Additional} </li>)
      return (
        <div>
          <h1>Letters</h1>
          {allLetters}
        </div>
      )
    }
  }

export default Letters;