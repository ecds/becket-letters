import React, { Component } from "react";
import { Container, Table } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from "axios";
import Profile from './Profile.js';
import Pagination from '../utilities/Pagination';


class LettersByPeopleMentioned extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
          error: null,
          isLoaded: false,
          allPeople: [],
          page: '1',
          pagination: []
      };
      this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handler = (pageValue) => {
    const page = pageValue
    this.setState({ page }, () => {
      this.getData();
    });
  }

  getData = () => {
    axios.all([
        axios.get('http://ot-api.ecdsdev.org/entities?entity_type=person&items=200&page='+this.state.page)])
        .then(axios.spread((getAllPeople) => {
            const allPeople = getAllPeople.data.data;
            const pagination = getAllPeople.data.meta.pagination;
            this.setState({ pagination });
            this.setState({ allPeople });
            this.setState({ isLoaded: true })
        }))
        .catch((err) => {
            this.setState({ isLoaded: false });
            this.setState({ error: err.message });
        });
  }


  render() {
    var PeopleList = this.state.allPeople.map((person) =>
      person.attributes['letters-list'].length > 0 ?
        <tr key={person.id}>
          <td>{person.attributes['letters-list'].length}</td>
          <td><Link to={{ pathname: `/search-letters?people=${person.attributes.label}`, state: { id: person.id} }}>{person.attributes.label}</Link></td>
        </tr>
      :
      null
    );
      return (
        <Container>
          <Table striped bordered className="browse-by">
            <thead>
              <tr>
                <th>Number of Letters</th>
                <th>Person Name</th>
              </tr>
            </thead>
            <tbody>
            {PeopleList}
            </tbody>
          </Table>
          {this.state.isLoaded ? <Pagination action={this.handler} pagination={this.state.pagination} /> : null}
        </Container>
      )
    }
  }

export default LettersByPeopleMentioned;
