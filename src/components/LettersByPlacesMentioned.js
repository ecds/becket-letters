import React, { Component } from "react";
import { Container, Table } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from "axios";
import BrowseLettersByIndexTabs from './BrowseLettersByIndexTabs';
import Profile from './Profile.js';
import Pagination from '../utilities/Pagination';


class LettersByPlacesMentioned extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
          error: null,
          isLoaded: false,
          allPeople: [],
          page: '1',
          pagination: [],
          messageShown: false
      };
      this.getData = this.getData.bind(this);
      this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
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
        axios.get('http://ot-api.ecdsdev.org/entities?entity_type=place&items=100&page='+this.state.page)])
        .then(axios.spread((getAllPeople) => {
            const allPeople = getAllPeople.data.data;
            const pagination = getAllPeople.data.meta.pagination;
            console.log(getAllPeople)
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
          <Table striped bordered className="browse-by">
            <thead>
              <tr>
                <th>Number of Letters</th>
                <th>Place</th>
              </tr>
            </thead>
            <tbody>
            {PlaceList}
            </tbody>
          </Table>
          {this.state.isLoaded ? <Pagination action={this.handler} pagination={this.state.pagination} /> : null}
        </Container>
      )
    }
  }

export default LettersByPlacesMentioned;
