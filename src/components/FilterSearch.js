import DocMetaBuilder from './utilities/DocMetaBuilder';
import LoadingSpinner from './utilities/LoadingSpinner';
import React, { Component } from "react";
import axios from "axios";
import { Container, Table, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class FilterSearch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: null,
            isLoaded: true,
            data: [],
            isSearching: false,
            firstSearched: false,
            entityType: ''
        };
    }

    search(searchTerms) {
        console.log(this)
        this.setState({ isLoaded: false })
        axios.all([
            axios.get('http://ot-api.ecdsdev.org/entities?search=' + searchTerms)
        ])
            .then(axios.spread((getAllData) => {
                const data = getAllData.data.data;
                this.setState({ data, isLoaded: true });
            }))
            .catch((err) => {
                this.setState({ isLoaded: false, error: err.message });
            });
    }

    intiateSearch = (event) => {
        this.setState({ firstSearched: true })
        event.preventDefault()
        const searchTerms = event.target.elements.query.value;
        this.search(searchTerms)
    }

    render() {
        var EntityList = this.state.data.map((entity) => {
            if (entity.attributes.label !== null) {
                return <React.Fragment>
                    <tr key={entity.id}>
                        <td>
                            {entity.attributes['type-label'] === 'Person' ?
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
                                entity.attributes['type-label'] === 'Public Event' ?
                                    <Link
                                        to={{
                                            pathname: `/public-events/${entity.id}`,
                                            state: {
                                                id: entity.id
                                            }
                                        }}>
                                        {entity.attributes.label ? <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} /> : <span>{entity.id}</span>}
                                    </Link>
                                    :
                                    <Link
                                        to={{
                                            pathname: `/${entity.attributes["type-label"] + "s"}/${entity.id}`,
                                            state: {
                                                id: entity.id
                                            }
                                        }}>
                                        {entity.attributes.label ? <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} /> : <span>{entity.id}</span>}
                                    </Link>
                            }
                        </td>
                        <td>{entity.attributes['type-label']}</td>
                    </tr>
                    {entity.attributes['public-letters-hash'].map((letter) => {
                        if (letter === null) {
                            return null
                        }
                        else {
                            return <tr>
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/letters/letterdetails/${letter.id}`,
                                            state: {
                                                id: letter.recipients[0].id,
                                                name: letter.recipients[0].name
                                            }
                                        }}>
                                        <span dangerouslySetInnerHTML={{ __html: "Letter to " + letter.recipients[0].name }} />
                                    </Link>
                                </td>
                                <td>
                                    {letter.date}
                                </td>
                            </tr>
                        }
                    }
                    )}
                </React.Fragment>
            }
            else {
                return null
            }
        }
        );

        const metaBuild = {
            title: this.props.metaTitle,
            description: `Search and Filter`,
        };

        return (
            <Container fluid >
                <DocMetaBuilder {...metaBuild} />
                <Row><h1>Filter Search</h1></Row>
                <Row className="no-gutters pt-3">
                    <Col md={11} className="no-gutters">
                        {/* work on search function */}
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
                {!this.state.firstSearched ? null : <Row>
                    <Col md={3} className='filterCol'>FILTERS HERE</Col>
                    <Col md={9}>
                        {!this.state.isLoaded ?
                            <LoadingSpinner />
                            :
                            <Table striped bordered className="browse-by" id='browse-by'>
                                <thead>
                                    <tr>
                                        <th>Label or Recipient</th>
                                        <th>Type-Label or Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {EntityList}
                                </tbody>
                            </Table>
                        }
                    </Col>
                </Row>
    }
            </Container >
        )
    }
}

export default FilterSearch;