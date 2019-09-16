import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import axios from "axios";

class BrowseLetters extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
          error: null,
          isLoaded: false,
          allPeople: []
      };
      this.getPeople = this.getPeople.bind(this);
  }

  componentDidMount() {
    this.getPeople();
  }

  getPeople = () => {
    axios.all([
        axios.get('http://ot-api.ecdsdev.org/entities?entity_type=person&items=10')])
        .then(axios.spread((getAllPeople) => {
            const allPeople = getAllPeople.data.data;
            console.log(allPeople)
            this.setState({ allPeople });
            this.setState({ isLoaded: true })
        }))
        .catch((err) => {
            this.setState({ isLoaded: false });
            this.setState({ error: err.message });
        });
  }

  render() {


    return (
      <Container>
        <div> TABS HERE for browse by * mentioned</div>
        <h1>Recipients</h1>
        <div>get all people. get length of letter list from all people</div>
        <div>Link to search results with URL: /letters?recipients=person_label</div>
      </Container>
    )
  }
}

export default BrowseLetters;
