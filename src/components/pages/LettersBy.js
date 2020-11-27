import BrowseLettersTabs from '../utilities/BrowseLettersTabs';
import DocMetaBuilder from '../utilities/DocMetaBuilder';
import LoadingSpinner from '../utilities/LoadingSpinner';
import Pagination from '../utilities/Pagination';
import React, { Component } from "react";
import axios from "axios";
import { Container, Table, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { setAttendanceLabel, setMusicLabel, setOrganizationLabel, setPersonLabel, setPlaceLabel, setProductionLabel, setEventLabel, setPublicationLabel, setReadingLabel, setRepositoryLabel, setTranslatingLabel, setWorkOfArtLabel, setWritingLabel } from '../utilities/EntityStringBuilder.js';


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
        if (this.props.entityType === 'repositories') {
            axios.all([
                axios.get(this.props.apiUrl + '/repositories')])
                .then(axios.spread((getAllData) => {
                    const data = getAllData.data.data;
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
                }))
                .catch((err) => {
                    this.setState({ isLoaded: false, error: err.message });
                });
        }
    }



    render() {
        var EntityList = this.state.data.map((entity) => {
            if (entity.attributes.label !== null) {
                let entityLabel
                if (entity.attributes['type-label'] === 'Person') {
                    return (
                        <tr key={entity.id}>
                            <td>
                                <Link
                                    to={{
                                        pathname: `/people/${entity.id}`,
                                        state: {
                                            id: entity.id
                                        }
                                    }}>
                                    {setPersonLabel(entity)}
                                </Link>
                            </td>
                        </tr>
                    )
                }
                else if (entity.attributes['type-label'] !== 'Person') {
                    if (entity.attributes['type-label'] === 'Attendance') {
                        entityLabel = setAttendanceLabel(entity);
                    }
                    else if (entity.attributes['type-label'] === 'Music') {
                        entityLabel = setMusicLabel(entity);
                    }
                    else if (entity.attributes['type-label'] === 'Organization') {
                        entityLabel = setOrganizationLabel(entity);
                    }
                    else if (entity.attributes['type-label'] === 'Place') {
                        entityLabel = setPlaceLabel(entity);
                    }
                    else if (entity.attributes['type-label'] === 'Production') {
                        entityLabel = setProductionLabel(entity);
                    }
                    else if (entity.attributes['type-label'] === 'Public Event') {
                        entityLabel = setEventLabel(entity);
                    }
                    else if (entity.attributes['type-label'] === 'Publication') {
                        entityLabel = setPublicationLabel(entity);
                    }
                    else if (entity.attributes['type-label'] === 'Reading') {
                        entityLabel = setReadingLabel(entity);
                    }
                    else if (entity.type === 'repositories') {
                        entityLabel = setRepositoryLabel(entity);
                    }
                    else if (entity.attributes['type-label'] === 'Translating') {
                        entityLabel = setTranslatingLabel(entity);
                    }
                    else if (entity.attributes['type-label'] === 'Work Of Art') {
                        entityLabel = setWorkOfArtLabel(entity);
                    }
                    else if (entity.attributes['type-label'] === 'Writing') {
                        entityLabel = setWritingLabel(entity);
                    }
                    return (
                        <tr key={entity.id}>
                            <td>
                                <Link
                                    to={{
                                        pathname: `/${this.props.entityType}/${entity.id}`,
                                        state: {
                                            id: entity.id
                                        }
                                    }}>
                                    {entityLabel}
                                </Link>
                            </td>
                        </tr>
                    )
                }
                else {
                    return (
                        null
                    )
                }
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
                <BrowseLettersTabs active={'by-' + this.props.entityType} action={this.entityChange} />
                <Row className="no-gutters pt-3">
                    <Col className="no-gutters">
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
                    {this.state.isSearching ? <Col md={1} className="no-gutters">
                        <Form onSubmit={this.resetPage}><Button variant="secondary" type="submit" className="full-width">Clear</Button></Form>
                    </Col> : null}
                </Row>
                {this.state.isLoaded && this.props.entityType !== 'repositories' ? <Pagination action={this.handler} pagination={this.state.pagination} /> : null}
                <Table striped bordered className="browse-by" id='browse-by' >
                    <thead>
                        <tr>
                            <th>{this.props.tableHeader}</th>
                        </tr>
                    </thead>
                    {!this.state.isLoaded ? <tbody><tr><td><LoadingSpinner /></td></tr></tbody> : <tbody>
                        {EntityList}
                    </tbody>}
                </Table>
            </Container>
        )
    }
}

export default LettersBy;
