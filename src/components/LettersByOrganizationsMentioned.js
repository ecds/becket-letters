import React, { Component } from "react";
import { Container, Table, Form, Button, Col, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from "axios";
import Profile from './Profile.js';
import Pagination from './utilities/Pagination';


class LettersByOrganizationsMentioned extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
          error: null,
          isLoaded: false,
          allPeople: [],
          page: '1',
          pagination: [],
          isSearching: false
      };
      this.getData = this.getData.bind(this);
      this.intiateSearch = this.intiateSearch.bind(this);
      this.searchData = this.searchData.bind(this);
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

  intiateSearch(event) {
    console.log(event.target.elements.query.value)
    event.preventDefault()
    const data = new FormData(event.target);
    const searchTerms = event.target.elements.query.value;
    this.searchData(searchTerms)
  }

  searchData = (searchTerms) => {
    this.setState({ isSearching: true })
    axios.all([
      axios.get('http://ot-api.ecdsdev.org/search-entities?query='+searchTerms+'&type=organization')])
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

  getData = () => {
    axios.all([
        axios.get('http://ot-api.ecdsdev.org/entities?entity_type=organization&items=200&page='+this.state.page)])
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
        <tr key={person.id}>
          <td><Link to={{ pathname: `/organizations/${person.id}`, state: { id: person.id} }}><span dangerouslySetInnerHTML={{__html: person.attributes.label}}/></Link></td>
        </tr>

    );
      return (
        <Container>
        <Form className="tab-search" onSubmit={this.intiateSearch}>
          <Form.Group controlId="formBasicEmail">
            <Row>
                <Form.Label column sm="1">Search</Form.Label>
                <Col md={9}>
                  <Form.Control id="query" name="query" type="query" placeholder="ex. 'Sanatogen'" />
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
                <th>Organization Name</th>
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

export default LettersByOrganizationsMentioned;
