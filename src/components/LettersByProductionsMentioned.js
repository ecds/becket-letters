import React, { Component } from "react";
import { Container, Table, Form, Button, Col, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from "axios";
import Profile from './Profile.js';
import Pagination from '../utilities/Pagination';
import {multiply} from '../utilities/helpers';


class LettersByProductionsMentioned extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
          error: null,
          isLoaded: false,
          allPeople: [],
          page: '1',
          pagination: [],
          messageShown: false,
          isSearching: false
      };
      this.getData = this.getData.bind(this);
      this.searchData = this.searchData.bind(this);
      this.handler = this.handler.bind(this);
      this.intiateSearch = this.intiateSearch.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
    this.getData();
  }


  handler = (pageValue) => {
    const page = pageValue
    this.setState({ page }, () => {
      if (this.state.isSearching) {
        this.searchData();
      }
      else {
        this.getData();
      }
    });
  }

  intiateSearch(event) {
    event.preventDefault()
    const data = new FormData(event.target);
    const searchTerms = event.target.elements.query.value;
    this.searchData(searchTerms)
  }

  searchData = (searchTerms) => {
    this.setState({ isSearching: true })
    axios.all([
        axios.get('http://ot-api.ecdsdev.org/search-entities?query='+searchTerms+'&type=production')])
        .then(axios.spread((searchProductions) => {
            const allPeople = searchProductions.data.data;
            const pagination = searchProductions.data.meta.pagination;
            this.setState({ pagination });
            this.setState({ allPeople });
            this.setState({ isLoaded: true })
        }))
        .catch((err) => {
            this.setState({ isLoaded: false });
            this.setState({ error: err.message });
        });
  }

  getData = () => {
    axios.all([
        axios.get('http://ot-api.ecdsdev.org/entities?entity_type=production&items=100&page='+this.state.page)])
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
    var PlaceList = this.state.allPeople.map((place) =>
      place.attributes['letters-list'].length > 0 ?
        <tr key={place.id}>
          <td>{place.attributes['letters-list'].length}</td>
          <td><Link to={{ pathname: `/place/${place.id}`, state: { id: place.id} }}><span dangerouslySetInnerHTML={{__html: place.attributes.label}}/></Link></td>
        </tr>
      :
      null
    );
      return (
        <Container>
          <Form className="tab-search" onSubmit={this.intiateSearch}>
            <Form.Group controlId="formBasicEmail">
              <Row>
                  <Form.Label column sm="1">Search</Form.Label>
                  <Col md={9}>
                    <Form.Control id="query" name="query" type="query" placeholder="ex. 'Godot'" />
                  </Col>
                  <Col md={2}>
                    <Button  variant="primary" type="submit">
                      Search
                    </Button>
                  </Col>
              </Row>
            </Form.Group>
          </Form>
          <Table striped bordered className="browse-by">
            <thead>
              <tr>
                <th>Number of Letters</th>
                <th>Production</th>
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

export default LettersByProductionsMentioned;
