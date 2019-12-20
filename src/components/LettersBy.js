import BrowseLetters from './BrowseLetters';
import DocMetaBuilder from './utilities/DocMetaBuilder';
import LoadingSpinner from './utilities/LoadingSpinner';
import Pagination from './utilities/Pagination';
import React, { Component } from "react";
import axios from "axios";
import { Container, Table, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class LettersBy extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            page: '1',
            pagination: [],
            isSearching: false,
            entityType: ''
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

    entityChange = (entityType) => {
        const page = 1
        this.setState({ entityType, page: 1 }, () => {
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
        if (this.props.entityType === 'repositories') {
            // Declare variables
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("query");
            filter = input.value.toUpperCase();
            table = document.getElementById("browse-by");
            tr = table.getElementsByTagName("tr");
            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        table.classList.remove('table-striped')
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
        else {
            this.setState({ isSearching: true })
            axios.all([
                axios.get(this.props.apiUrl + '/search-entities?query=' + searchTerms + '&type=' + this.props.entityType)])
                .then(axios.spread((getAllData) => {
                    const data = getAllData.data.data;
                    const pagination = getAllData.data.meta.pagination;
                    this.setState({ pagination, data, isLoaded: true });
                }))
                .catch((err) => {
                    this.setState({ isLoaded: false, error: err.message });
                });
        }
    }

    getData = () => {
        this.setState({ isLoaded: false })
        console.log(this.props.entityType)
        if (this.props.entityType === 'repositories') {
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
        else {
            axios.all([
                axios.get(this.props.apiUrl + '/entities?entity_type=' + this.props.entityType + '&items=50&page=' + this.state.page)
            ])
                .then(axios.spread((getAllData) => {
                    const data = getAllData.data.data;
                    const pagination = getAllData.data.meta.pagination;
                    this.setState({ pagination, data, isLoaded: true });

                    console.log(data)
                }))
                .catch((err) => {
                    this.setState({ isLoaded: false, error: err.message });
                });
        }
    }



    render() {
        var EntityList = this.state.data.map((entity) => {
            if (entity.attributes.label !== null) {
                return <tr key={entity.id}>
                    <td>
                        {this.props.entityType === 'person' ?
                            <Link
                                to={{
                                    pathname: `/people/${entity.id}`,
                                    state: {
                                        id: entity.id,
                                        name: entity.attributes.label
                                    }
                                }}>
                                <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} />
                                {entity.attributes.properties && entity.attributes.properties['life-dates'] ? ' (' + entity.attributes.properties['life-dates'] + ')' : null}
                            </Link>
                            :
                            <Link
                                to={{
                                    pathname: `/${this.props.entityType}s/${entity.id}`,
                                    state: {
                                        id: entity.id
                                    }
                                }}>
                                {entity.attributes.label ? entity.attributes['type-label'] === 'Publication' && entity.attributes.properties && entity.attributes.properties.author ? <span dangerouslySetInnerHTML={{ __html: entity.attributes.label + " by " + entity.attributes.properties.author }} /> : <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} /> : <span>{entity.id}</span>}
                            </Link>
                        }
                    </td>
                    {this.props.entityType === 'music' ? <td><p>{entity.attributes.properties !== null ? entity.attributes.properties.composer : null}</p></td> : null}
                </tr>
            }
            else {
                return null
            }
        }
        );

        const metaBuild = {
            title: this.props.metaTitle,
            description: `Browse all letters on this page`,
        };

        return (
            <Container fluid>
                <DocMetaBuilder {...metaBuild} />
                <BrowseLetters active={'by-' + this.props.entityType} action={this.entityChange} />
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
                                    <Form.Control id="query" name="query" type="query" aria-label='query' placeholder={this.props.placeholder} />
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
                {this.state.isLoaded && this.props.entityType !== 'repositories' ? <Pagination action={this.handler} pagination={this.state.pagination} /> : null}
                <Table striped bordered className="browse-by" id='browse-by' >
                    <thead>
                        <tr>
                            <th>{this.props.tableHeader}</th>
                            {this.props.entityType === 'music' && this.state.isLoaded ? <th>Composer</th> : null}
                        </tr>
                    </thead>
                    {!this.state.isLoaded ? <LoadingSpinner /> : <tbody>
                        {EntityList}
                    </tbody>}
                </Table>
            </Container>
        )
    }
}

export default LettersBy;
