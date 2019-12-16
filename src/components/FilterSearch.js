import DocMetaBuilder from './utilities/DocMetaBuilder';
import LoadingSpinner from './utilities/LoadingSpinner';
import React, { Component } from "react";
import axios from "axios";
import FindLetters from './utilities/FindLetters';
import { Container, Table, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class FilterSearch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            isSearching: false,
            entityType: ''
        };
        // this.getData = this.getData.bind(this);
        // this.intiateSearch = this.intiateSearch.bind(this);
        // this.searchData = this.searchData.bind(this);
        // this.resetPage = this.resetPage.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        this.setState({ isLoaded: false })
        axios.all([
            axios.get('http://ot-api.ecdsdev.org/entities?search=' + "paris")
        ])
            .then(axios.spread((getAllData) => {
                const data = getAllData.data.data;
                this.setState({ data, isLoaded: true });
                console.log(this.state.data)
            }))
            .catch((err) => {
                this.setState({ isLoaded: false, error: err.message });
            });
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
                    <FindLetters entity={entity} />
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
                <Row>
                    <Col md={3} className='filterCol'>FILTERS HERE</Col>
                    <Col md={9}>
                        {!this.state.isLoaded ?
                            <LoadingSpinner />
                            :
                            <Table striped bordered className="browse-by" id='browse-by'>
                                <thead>
                                    <tr>
                                        <th>Label</th>
                                        <th>Type-Label</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {EntityList}
                                </tbody>
                            </Table>
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default FilterSearch;