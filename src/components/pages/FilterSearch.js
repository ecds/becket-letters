import DocMetaBuilder from '../utilities/DocMetaBuilder';
import LoadingSpinner from '../utilities/LoadingSpinner';
import React, { Component } from "react";
import axios from "axios";
import { Button, Col, Container, Form, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import HeaderBuilder from '../utilities/HeaderBuilder';
import DatePicker from 'react-date-picker';
import { setAttendanceLabel, setMusicLabel, setOrganizationLabel, setPersonLabel, setPlaceLabel, setProductionLabel, setEventLabel, setPublicationLabel, setReadingLabel, setRepositoryLabel, setTranslatingLabel, setWorkOfArtLabel, setWritingLabel } from '../utilities/EntityStringBuilder.js';



const renderSearchTooltip = (props) => (
    <Tooltip id="search-tooltip" {...props}>
        "Endgame" : results exact match<br />
        Waiting +Godot : results with Waiting AND Godot<br />
        Waiting -Godot : results with Waiting but NOT Godot<br />
        pat* : wildcard does work but with a caveat I’ll explain<br />
        label:pat* : only searches the label attribute
    </Tooltip>
);

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
            startDate: "January 1, 1000",
            endDate: "December 31, 2000",
        };
    }

    search(searchTerms) {
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
        this.setState({
            [`${stateType}`]: !this.state[`${stateType}`],
        })
    }

    flipAllFilters = () => {
        let direction = !this.state.hideAll;
        this.setState({
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
        let attendancesCount = 0
        let lettersCount = 0
        let musicCount = 0
        let organizationsCount = 0
        let peopleCount = 0
        let placesCount = 0
        let productionsCount = 0
        let publicEventsCount = 0
        let publicationsCount = 0
        let readingsCount = 0
        let translatingsCount = 0
        let worksOfArtCount = 0
        let writingsCount = 0
        var EntityList = this.state.data.map((entity) => {
            if (entity.attributes['type-label'] !== null) {
                let entityLabel
                if (entity.attributes['type-label'] === 'Person') {
                    peopleCount++
                    entityLabel = setPersonLabel(entity)
                    if (this.state.arePeopleHidden) {
                        return null
                    }
                    else {
                        return (
                            <tr key={entity.id} >
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/people/${entity.id}`,
                                            state: {
                                                id: entity.id,
                                                name: entity.attributes.label
                                            }
                                        }}>
                                        {entityLabel}
                                    </Link>
                                </td>
                                <td>Person</td>
                            </tr>
                        )
                    }

                }
                if (entity.attributes['type-label'] === 'Attendance') {
                    attendancesCount++
                    entityLabel = setAttendanceLabel(entity)
                    if (this.state.areAttendancesHidden) {
                        return null
                    }
                    else {
                        return (
                            <tr key={entity.id} >
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/Attendance/${entity.id}`,
                                            state: {
                                                id: entity.id,
                                                name: entity.attributes.label
                                            }
                                        }}>
                                        {entityLabel}
                                    </Link>
                                </td>
                                <td>Attendance</td>
                            </tr>
                        )
                    }
                }
                if (entity.attributes['type-label'] === 'Music') {
                    musicCount++
                    entityLabel = setMusicLabel(entity)
                    if (this.state.areMusicsHidden) {
                        return null
                    }
                    else {
                        return (
                            <tr key={entity.id} >
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/music/${entity.id}`,
                                            state: {
                                                id: entity.id,
                                                name: entity.attributes.label
                                            }
                                        }}>
                                        {entityLabel}
                                    </Link>
                                </td>
                                <td>Music</td>
                            </tr>
                        )
                    }
                }
                if (entity.attributes['type-label'] === 'Organization') {
                    organizationsCount++
                    entityLabel = setOrganizationLabel(entity)
                    if (this.state.areOrganizationsHidden) {
                        return null
                    }
                    else {
                        return (
                            <tr key={entity.id} >
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/organization/${entity.id}`,
                                            state: {
                                                id: entity.id,
                                                name: entity.attributes.label
                                            }
                                        }}>
                                        {entityLabel}
                                    </Link>
                                </td>
                                <td>Organization</td>
                            </tr>
                        )
                    }
                }
                if (entity.attributes['type-label'] === 'Place') {
                    placesCount++
                    entityLabel = setPlaceLabel(entity)
                    if (this.state.arePlacesHidden) {
                        return null
                    }
                    else {
                        return (
                            <tr key={entity.id} >
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/place/${entity.id}`,
                                            state: {
                                                id: entity.id,
                                                name: entity.attributes.label
                                            }
                                        }}>
                                        {entityLabel}
                                    </Link>
                                </td>
                                <td>Place</td>
                            </tr>
                        )
                    }
                }
                if (entity.attributes['type-label'] === 'Production') {
                    productionsCount++
                    entityLabel = setProductionLabel(entity)
                    if (this.state.areProductionsHidden) {
                        return null
                    }
                    else {
                        return (
                            <tr key={entity.id} >
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/production/${entity.id}`,
                                            state: {
                                                id: entity.id,
                                                name: entity.attributes.label
                                            }
                                        }}>
                                        {entityLabel}
                                    </Link>
                                </td>
                                <td>Production</td>
                            </tr>
                        )
                    }
                }
                if (entity.attributes['type-label'] === 'Public Event') {
                    publicEventsCount++
                    entityLabel = setEventLabel(entity)
                    if (this.state.areEventsHidden) {
                        return null
                    }
                    else {
                        return (
                            <tr key={entity.id} >
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/public-event/${entity.id}`,
                                            state: {
                                                id: entity.id,
                                                name: entity.attributes.label
                                            }
                                        }}>
                                        {entityLabel}
                                    </Link>
                                </td>
                                <td>Event</td>
                            </tr>
                        )
                    }
                }
                if (entity.attributes['type-label'] === 'Publication') {
                    publicationsCount++
                    entityLabel = setPublicationLabel(entity)
                    if (this.state.arePublicationsHidden) {
                        return null
                    }
                    else {
                        return (
                            <tr key={entity.id} >
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/publication/${entity.id}`,
                                            state: {
                                                id: entity.id,
                                                name: entity.attributes.label
                                            }
                                        }}>
                                        {entityLabel}
                                    </Link>
                                </td>
                                <td>Publication</td>
                            </tr>
                        )
                    }
                }
                if (entity.attributes['type-label'] === 'Reading') {
                    readingsCount++
                    entityLabel = setReadingLabel(entity)
                    if (this.state.areReadingsHidden) {
                        return null
                    }
                    else {
                        return (
                            <tr key={entity.id} >
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/reading/${entity.id}`,
                                            state: {
                                                id: entity.id,
                                                name: entity.attributes.label
                                            }
                                        }}>
                                        {entityLabel}
                                    </Link>
                                </td>
                                <td>Reading</td>
                            </tr>
                        )
                    }
                }
                if (entity.attributes['type-label'] === 'Translating') {
                    translatingsCount++
                    entityLabel = setTranslatingLabel(entity)
                    if (this.state.areTranslatingsHidden) {
                        return null
                    }
                    else {
                        return (
                            <tr key={entity.id} >
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/translating/${entity.id}`,
                                            state: {
                                                id: entity.id,
                                                name: entity.attributes.label
                                            }
                                        }}>
                                        {entityLabel}
                                    </Link>
                                </td>
                                <td>Translating</td>
                            </tr>
                        )
                    }
                }
                if (entity.attributes['type-label'] === 'Work Of Art') {
                    worksOfArtCount++
                    entityLabel = setWorkOfArtLabel(entity)
                    if (this.state.areWorksOfArtHidden) {
                        return null
                    }
                    else {
                        return (
                            <tr key={entity.id} >
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/work-of-art/${entity.id}`,
                                            state: {
                                                id: entity.id,
                                                name: entity.attributes.label
                                            }
                                        }}>
                                        {entityLabel}
                                    </Link>
                                </td>
                                <td>Work of Art</td>
                            </tr>
                        )
                    }
                }
                if (entity.attributes['type-label'] === 'Writing') {
                    writingsCount++
                    entityLabel = setWritingLabel(entity)
                    if (this.state.areWritingsHidden) {
                        return null
                    }
                    else {
                        return (
                            <tr key={entity.id} >
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/writing/${entity.id}`,
                                            state: {
                                                id: entity.id,
                                                name: entity.attributes.label
                                            }
                                        }}>
                                        {entityLabel}
                                    </Link>
                                </td>
                                <td>Writing</td>
                            </tr>
                        )
                    }
                }
            }
            else {
                return 'uh oh'
            }
        })
        
        const metaBuild = {
            title: 'Search and Filter',
            description: `Search and filter entities and letters`,
        };

        return (
            <Container >
                <DocMetaBuilder {...metaBuild} />
                <div className='pt-3'>
                    <HeaderBuilder header='Filter Search' type='string' />
                    <Row className="no-gutters pt-3">
                        <Col md={12} className="no-gutters">
                            {/* work on search function */}
                            <Form className="tab-search" onSubmit={this.intiateSearch} ref="form">
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 150, hide: 1000 }}
                                    overlay={renderSearchTooltip}
                                >
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
                                </OverlayTrigger>
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
                            <form className='filterBox filterByType' >
                                <h2>Refine by Field</h2>
                                <ul>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => this.filterRowsByType('areAttendancesHidden', e)}
                                                checked={!this.state.areAttendancesHidden}
                                            />
                                            Attendance {attendancesCount !== 0 ? <span className='entityCountDisplay'>{attendancesCount}</span> : null}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => this.filterRowsByType('areLettersHidden', e)}
                                                checked={!this.state.areLettersHidden}
                                            />
                                            Letters {lettersCount !== 0 ? <span className='entityCountDisplay'>{lettersCount}</span> : null}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => this.filterRowsByType('areMusicsHidden', e)}
                                                checked={!this.state.areMusicsHidden}

                                            />
                                            Music {musicCount !== 0 ? <span className='entityCountDisplay'>{musicCount}</span> : null}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => this.filterRowsByType('areOrganizationsHidden', e)}
                                                checked={!this.state.areOrganizationsHidden}

                                            />
                                            Organizations {organizationsCount !== 0 ? <span className='entityCountDisplay'>{organizationsCount}</span> : null}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => this.filterRowsByType('arePeopleHidden', e)}
                                                checked={!this.state.arePeopleHidden}

                                            />
                                            People {peopleCount !== 0 ? <span className='entityCountDisplay'>{peopleCount}</span> : null}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => this.filterRowsByType('arePlacesHidden', e)}
                                                checked={!this.state.arePlacesHidden}

                                            />
                                            Places {placesCount !== 0 ? <span className='entityCountDisplay'>{placesCount}</span> : null}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => this.filterRowsByType('areProductionsHidden', e)}
                                                checked={!this.state.areProductionsHidden}

                                            />
                                            Productions {productionsCount !== 0 ? <span className='entityCountDisplay'>{productionsCount}</span> : null}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => this.filterRowsByType('areEventsHidden', e)}
                                                checked={!this.state.areEventsHidden}

                                            />
                                            Public Events {publicEventsCount !== 0 ? <span className='entityCountDisplay'>{publicEventsCount}</span> : null}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => this.filterRowsByType('arePublicationsHidden', e)}
                                                checked={!this.state.arePublicationsHidden}

                                            />
                                            Publications {publicationsCount !== 0 ? <span className='entityCountDisplay'>{publicationsCount}</span> : null}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => this.filterRowsByType('areReadingsHidden', e)}
                                                checked={!this.state.areReadingsHidden}

                                            />
                                            Readings {readingsCount !== 0 ? <span className='entityCountDisplay'>{readingsCount}</span> : null}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => this.filterRowsByType('areTranslatingsHidden', e)}
                                                checked={!this.state.areTranslatingsHidden}

                                            />
                                            Translatings {translatingsCount !== 0 ? <span className='entityCountDisplay'>{translatingsCount}</span> : null}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => this.filterRowsByType('areWorkOfArtsHidden', e)}
                                                checked={!this.state.areWorkOfArtsHidden}

                                            />
                                            Works of Art {worksOfArtCount !== 0 ? <span className='entityCountDisplay'>{worksOfArtCount}</span> : null}
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                onChange={(e) => this.filterRowsByType('areWritingsHidden', e)}
                                                checked={!this.state.areWritingsHidden}

                                            />
                                            Writings {writingsCount !== 0 ? <span className='entityCountDisplay'>{writingsCount}</span> : null}
                                        </label>
                                    </li>
                                    <li>
                                        <button type="button" className="button btn btn-primary" onClick={(e) => this.flipAllFilters(e)}>{this.state.hideAll ? "Hide All" : "Show All"}</button>
                                    </li>
                                </ul>
                            </form>
                            <form className='filterBox'>
                                <h2>Refine by Date</h2>
                                <ul>
                                    <li>
                                        <h3>Start</h3>
                                        <DatePicker format='dd/MMM/y' disableCalendar={true} minDate={new Date('January 1957')} maxDate={new Date('December 1969')} value={this.state.date} onChange={(date) => this.setState({ startDate: date })} />
                                    </li>
                                    <li>
                                        <h3>End</h3>
                                        <DatePicker format='dd/MMM/y' disableCalendar={true} minDate={new Date('January 1957')} maxDate={new Date('December 1969')} value={this.state.date} onChange={(date) => this.setState({ endDate: date })} />
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
                </div>
            </Container >
        )
    }
}

export default FilterSearch;