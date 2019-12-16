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
                                {entity.attributes.label ? <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} /> : <span>{entity.id}</span>}
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
            description: `Search and Filter`,
        };

        return (
            <Container fluid>
                <DocMetaBuilder {...metaBuild} />
                <h1>Filter Search</h1>
            </Container>
        )
    }
}

export default FilterSearch;