import React, { Component } from "react";
import { Container, Table } from 'react-bootstrap';
import DocMetaBuilder from './utilities/DocMetaBuilder';
import { Link } from 'react-router-dom';
import axios from "axios";
import BrowseLetters from './BrowseLetters';
import LoadingSpinner from './utilities/LoadingSpinner';

class LettersByRepository extends Component {
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
      axios.get(this.props.apiUrl + '/search-entities?query=' + searchTerms + '&type=reading')])
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
      axios.get(this.props.apiUrl + '/repositories')])
      .then(axios.spread((getAllData) => {
        const data = getAllData.data.data;
        console.log(data)
        this.setState({ data, isLoaded: true });
      }))
      .catch((err) => {
        this.setState({ isLoaded: false, error: err.message });
      });
  }


  render() {
    var EntityList = this.state.data.map((entity) =>
      <tr key={entity.id}>
        <td>
          <Link to={{ pathname: `/repositories/${entity.id}`, state: { id: entity.id } }}>
            {entity.attributes.label ? <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} /> : <span>{entity.id}</span>}
          </Link>
        </td>
      </tr>

    );

    const metaBuild = {
      title: 'Browse by Repository',
      description: `Browse all letters by reading mentioned`,
    };

    return (
      <Container fluid>
        <DocMetaBuilder {...metaBuild} />
        <BrowseLetters active="by-repository" />
        <Table striped bordered className="browse-by">
          <thead>
            <tr>
              <th>Repository Name</th>
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

export default LettersByRepository;
