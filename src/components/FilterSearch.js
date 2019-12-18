import DocMetaBuilder from './utilities/DocMetaBuilder';
import LoadingSpinner from './utilities/LoadingSpinner';
import React, { Component } from "react";
import axios from "axios";
import { Container, Table, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import FilterSearchCheckbox from './utilities/FilterSearchCheckbox';
import HeaderBuilder from './utilities/HeaderBuilder';

class FilterSearch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: null,
            isLoaded: true,
            data: [],
            isSearching: false,
            firstSearched: false,
            entityType: '',
            checkbox: true,
            areAttendancesHidden: false,
            areLettersHidden: false,
            areMusicsHidden: false,
            areOrganizationsHidden: false,
            arePeopleHidden: false,
            arePlacesHidden: false,
            areProductionsHidden: false,
            areEventsHidden: false,
            arePublicationsHidden: false,
            areReadingsHidden: false,
            areTranslatingsHidden: false,
            areWorkOfArtsHidden: false,
            areWritingsHidden: false,
            hideAll: true,
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

    filterRowsByType = (stateType) => {
        this.setState({ [`${stateType}`]: !this.state[`${stateType}`] })
    }

    flipAllFilters = () => {
        let direction = !this.state.hideAll;
        this.setState({
            checkbox: direction ? true : false,
            areAttendancesHidden: direction ? false : true,
            areLettersHidden: direction ? false : true,
            areMusicsHidden: direction ? false : true,
            areOrganizationsHidden: direction ? false : true,
            arePeopleHidden: direction ? false : true,
            arePlacesHidden: direction ? false : true,
            areProductionsHidden: direction ? false : true,
            areEventsHidden: direction ? false : true,
            arePublicationsHidden: direction ? false : true,
            areReadingsHidden: direction ? false : true,
            areTranslatingsHidden: direction ? false : true,
            areWorkOfArtsHidden: direction ? false : true,
            areWritingsHidden: direction ? false : true,
            hideAll: direction ? true : false,
        }
        )
    }

    render() {
        var EntityList = this.state.data.map((entity) => {
            if (entity.attributes.label !== null) {
                return <React.Fragment>
                    {/* create row for each search result */}
                    {entity.attributes['type-label'] === 'Person' ?
                        this.state.arePeopleHidden ? null : <tr key={entity.id} >
                            <td>
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
                            </td>
                            <td>Person</td>
                        </tr>
                        :
                        entity.attributes['type-label'] === 'Public Event' ?
                            this.state.areEventsHidden ? null : <tr>
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/public-events/${entity.id}`,
                                            state: {
                                                id: entity.id
                                            }
                                        }}>
                                        {entity.attributes.label ? <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} /> : <span>{entity.id}</span>}
                                    </Link>
                                </td>
                                <td>Public Event</td>
                            </tr>
                            :
                            entity.attributes['type-label'] === "Work Of Art" ?
                                this.state.areWorkOfArtsHidden ? null : <tr>
                                    <td>
                                        <Link
                                            to={{
                                                pathname: `/work-of-arts/${entity.id}`,
                                                state: {
                                                    id: entity.id
                                                }
                                            }}>
                                            {entity.attributes.label ? <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} /> : <span>{entity.id}</span>}
                                        </Link>
                                    </td>
                                    <td>Work of Art</td>
                                </tr>
                                :
                                this.state[`are${entity.attributes["type-label"]}sHidden`] ? null : <tr>
                                    <td>
                                        {entity.attributes['type-label'] === 'Translating' ? <Link
                                            to={{
                                                pathname: `/translations/${entity.id}`,
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
                    }
                    {/* create row for each public letter of search result */}
                    {entity.attributes['public-letters-hash'].map((letter) => {
                        if (letter === null) {
                            return null
                        }
                        else {
                            return this.state.areLettersHidden ? null : <tr>
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/letters/letterdetails/${letter.id}`,
                                            state: {
                                                id: letter.recipients[0].id,
                                                name: letter.recipients[0].name
                                            }
                                        }}>
                                        <span dangerouslySetInnerHTML={{ __html: "Letter to " + letter.recipients[0].name + " on " + letter.date }} />
                                    </Link>
                                </td>
                                <td>
                                    Letter
                                </td>
                            </tr>
                        }
                    }
                    )
                    }
                </React.Fragment >
            }
            else {
                return null
            }
        }
        );

        const metaBuild = {
            title: 'Search and Filter',
            description: `Search and filter entities and letters`,
        };

        return (
            <Container >
                <DocMetaBuilder {...metaBuild} />
                <HeaderBuilder header='Filter Search' type='string' />
                <Row className="no-gutters pt-3">
                    <Col md={12} className="no-gutters">
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
                <Row>
                    <Col md={3} className='filterCol'>
                        <form className='filterByType' >
                            <ul>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) => this.filterRowsByType('areAttendancesHidden', e)}
                                            checked={this.state.checkbox}

                                        />
                                        Attendances
                            </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) => this.filterRowsByType('areLettersHidden', e)}
                                            checked={this.state.checkbox}
                                        />
                                        Letters
                            </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) => this.filterRowsByType('areMusicsHidden', e)}
                                            checked={this.state.checkbox}

                                        />
                                        Music
                            </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) => this.filterRowsByType('areOrganizationsHidden', e)}
                                            checked={this.state.checkbox}

                                        />
                                        Organizations
                            </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) => this.filterRowsByType('arePeopleHidden', e)}
                                            checked={this.state.checkbox}

                                        />
                                        People
                            </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) => this.filterRowsByType('arePlacesHidden', e)}
                                            checked={this.state.checkbox}

                                        />
                                        Places
                            </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) => this.filterRowsByType('areProductionsHidden', e)}
                                            checked={this.state.checkbox}

                                        />
                                        Productions
                            </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) => this.filterRowsByType('areEventsHidden', e)}
                                            checked={this.state.checkbox}

                                        />
                                        Public Events
                            </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) => this.filterRowsByType('arePublicationsHidden', e)}
                                            checked={this.state.checkbox}

                                        />
                                        Publications
                            </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) => this.filterRowsByType('areReadingsHidden', e)}
                                            checked={this.state.checkbox}

                                        />
                                        Readings
                            </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) => this.filterRowsByType('areTranslatingsHidden', e)}
                                            checked={this.state.checkbox}

                                        />
                                        Translations
                            </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) => this.filterRowsByType('areWorkOfArtsHidden', e)}
                                            checked={this.state.checkbox}

                                        />
                                        Works of Art
                            </label>
                                </li>
                                <li>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={(e) => this.filterRowsByType('areWritingsHidden', e)}
                                            checked={this.state.checkbox}

                                        />
                                        Writings
                            </label>
                                </li>
                                <li>
                                    <button type="button" className="button btn btn-primary" onClick={(e) => this.flipAllFilters(e)}>{this.state.hideAll ? "Hide All" : "Show All"}</button>
                                </li>
                            </ul>
                        </form>

                    </Col>
                    {!this.state.firstSearched ? null : <Col md={9}>
                        {!this.state.isLoaded ?
                            <LoadingSpinner className='centerIcon' />
                            :
                            <Table striped bordered className="browse-by" id='browse-by'>
                                <thead>
                                    <tr>
                                        <th>Result</th>
                                        <th id='typeColumn'>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {EntityList}
                                </tbody>
                            </Table>
                        }
                    </Col>
                    }
                </Row>
            </Container >
        )
    }
}

export default FilterSearch;