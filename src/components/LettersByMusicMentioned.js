import React, { Component } from "react";
import { Container, Table, Form, Button, Col, Row } from 'react-bootstrap';
import DocMetaBuilder from './utilities/DocMetaBuilder';
import { Link } from 'react-router-dom';
import axios from "axios";
import Pagination from './utilities/Pagination';
import BrowseLetters from './BrowseLetters';
import LoadingSpinner from './utilities/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LettersByMusicMentioned extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      page: '1',
      pagination: [],
      isSearching: false
    };
    this.getData = this.getData.bind(this);
    this.intiateSearch = this.intiateSearch.bind(this);
    this.searchData = this.searchData.bind(this);
    this.resetPage = this.resetPage.bind(this);
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
    event.preventDefault()
    const searchTerms = event.target.elements.query.value;
    this.searchData(searchTerms)
  }

  resetPage(event) {
    event.preventDefault()
    this.refs.form["query"].value = ''
    this.setState({ isSearching: false, isLoaded: false })
    this.getData();
  }

  searchData = (searchTerms) => {
    this.setState({ isSearching: true })
    axios.all([
      axios.get(this.props.apiUrl + '/search-entities?query=' + searchTerms + '&type=music')])
      .then(axios.spread((getAllData) => {
        const data = getAllData.data.data;
        const pagination = getAllData.data.meta.pagination;
        this.setState({ pagination, data, isLoaded: true });
      }))
      .catch((err) => {
        this.setState({ isLoaded: false, error: err.message });
      });
  }

  getData = () => {
    axios.all([
      axios.get(this.props.apiUrl + '/entities?entity_type=music&items=50&page=' + this.state.page)])
      .then(axios.spread((getAllData) => {
        const data = getAllData.data.data;
        const pagination = getAllData.data.meta.pagination;
        this.setState({ pagination, data, isLoaded: true });
      }))
      .catch((err) => {
        this.setState({ isLoaded: false, error: err.message });
      });
  }


  render() {
    var EntityList = this.state.data.map((entity) =>
      <tr key={entity.id}>
        <td>
          <Link to={{ pathname: `/music/${entity.id}`, state: { id: entity.id } }}>
            <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} />
          </Link>
        </td>
        <td><p>{entity.attributes.properties !== null ? entity.attributes.properties.composer : null}</p></td>
      </tr>

    );

    const metaBuild = {
      title: 'Browse by Music',
      description: `Browse all letters by music mentioned`,
    };

    return (
      <Container fluid>
        <DocMetaBuilder {...metaBuild} />
        <BrowseLetters active="by-music" />
        <Row className="no-gutters pt-3">
          <Col md={11} className="no-gutters">
            <Form className="tab-search" onSubmit={this.intiateSearch} ref="form">
              <Form.Group>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <Button aria-label='submit button' variant="primary" type="submit">
                      <FontAwesomeIcon icon="search" />
                    </Button>
                  </div>
                  <Form.Control id="query" name="query" type="query" aria-label='query' placeholder="ex. 'Nearer my God'" />
                </div>
              </Form.Group>
            </Form>
          </Col>
          <Col md={1} className="no-gutters">
            {this.state.isSearching ?
              <Form onSubmit={this.resetPage}><Button variant="secondary" type="submit" className="full-width">Clear</Button></Form>
              : null
            }
          </Col>
        </Row>
        {this.state.isLoaded ? <Pagination action={this.handler} pagination={this.state.pagination} /> : null}
        <Table striped bordered className="browse-by">
          <thead>
            <tr>
              <th>Music Name</th>
              <th>Composer</th>
            </tr>
          </thead>
          <tbody>
            {!this.state.isLoaded ? <LoadingSpinner /> : EntityList}

          </tbody>
        </Table>
      </Container>
    )
  }
}

export default LettersByMusicMentioned;
