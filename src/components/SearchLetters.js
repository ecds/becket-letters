import React, { Component } from "react";
import axios from "axios";
import { Container } from 'react-bootstrap';

export class SearchLetters extends Component {

  constructor(props, context) {
      super(props, context);
      this.state = {
          error: null,
          isLoaded: false,
          searchResults: [],
          paginationResults: [],
          page: 1
      };
      this.refreshData = this.refreshData.bind(this);
      this.performSearch = this.performSearch.bind(this);
  }

  refreshData = (e) => {
    const page = e
    this.setState({ page })
    this.setState({ page }, () => {
      this.performSearch();
    });
  }

  createPagination = () => {
      let table = []
      for (let i = 0; i < this.state.paginationResults['total-pages']; i++) {
        table.push(<a key={i} onClick={() => this.refreshData(i+1)} className='btn btn-pagination' href="#">{i+1}</a>)
      }
      return table
    }

  performSearch = () => {
    console.log(this.props)
    axios.all([
        axios.get('http://ot-api.ecdsdev.org/letters'+this.props.history.location.search+'&page='+this.state.page)])
        .then(axios.spread((getAllSearchResults) => {
            const searchResults = getAllSearchResults.data.data;
            const paginationResults = getAllSearchResults.data.meta.pagination;
            this.setState({paginationResults});
            this.setState({ searchResults });
            this.setState({ isLoaded: true })
        }))
        .catch((err) => {
            this.setState({ isLoaded: false });
            this.setState({ error: err.message });
        });
  }

  componentDidMount() {
    this.performSearch();
  }

    render() {

        return (
            <Container>
            </Container>
        )
    }
}

export default SearchLetters;
