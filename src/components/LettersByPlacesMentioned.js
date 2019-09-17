import React, { Component } from "react";
import { Container, Table } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from "axios";
import BrowseLettersByIndexTabs from './BrowseLettersByIndexTabs';
import Profile from './Profile.js';
import Pagination from './Pagination';


class LettersByPlacesMentioned extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
          error: null,
          isLoaded: false,
          allPeople: [],
          page: '1',
          pagination: []
      };
      this.getPeople = this.getPeople.bind(this);
  }

  componentDidMount() {
    this.getPeople();
  }

  getPeople = () => {
    axios.all([
        axios.get('http://ot-api.ecdsdev.org/entities?entity_type=place&items=100')])
        .then(axios.spread((getAllPeople) => {
            const allPeople = getAllPeople.data.data;
            const pagination = getAllPeople.data.meta.pagination;
            console.log(pagination)
            this.setState({ pagination });
            this.setState({ allPeople });
            this.setState({ isLoaded: true })
        }))
        .catch((err) => {
            this.setState({ isLoaded: false });
            this.setState({ error: err.message });
        });
  }

  getNextList = () => {

  }


  render() {
    var PlaceList = this.state.allPeople.map((place) =>
      place.attributes['letters-list'].length > 0 ?
        <tr key={place.id}>
          <td>{place.attributes['letters-list'].length}</td>
          <td><Link to={{ pathname: `/places/${place.attributes.label}`, state: { id: place.id} }}>{place.attributes.label}</Link></td>
        </tr>
      :
      null
    );
      return (
        <Container>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Number of Letters</th>
                <th>Recipient</th>
              </tr>
            </thead>
            <tbody>
            {PlaceList}
            </tbody>
          </Table>

          <h1>Recipients</h1>
          <div>get all people. get length of letter list from all people</div>
          <div>Link to search results with URL: /letters?recipients=person_label</div>
          {this.state.isLoaded ? <Pagination pagination={this.state.pagination} /> : null}
        </Container>
      )
    }
  }

export default LettersByPlacesMentioned;
