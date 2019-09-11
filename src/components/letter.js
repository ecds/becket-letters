import React, { Component } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import ProfileLite from './ProfileLite';
import EntitiesRelationship from './EntitiesRelationship';
import RepositoriesRelationship from './RepositoriesRelationship';
import axios from "axios";
import { list } from "postcss";
import Moment from 'react-moment';

export class LetterPg extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: null,
            isLoaded: false,
            letter: []
        };
    }

    componentDidMount() {
        axios.all([
            axios.get('http://ot-api.ecdsdev.org/letters/d65b906a-8483-492d-8d25-2035c4006bcf')])
            .then(axios.spread((getEntityList) => {
                const letter = getEntityList.data.data;
                this.setState({ letter });
                this.setState({ isLoaded: true })
            }))
            .catch((err) => {
                this.setState({ isLoaded: false });
                this.setState({ error: err.message });
            });
    }

    render() {
        const { error, isLoaded } = this.state;
        // if there is an error
        if (error) {
            return <div>Error: {error.message}</div>;
            // if not loaded show loading
        } else if (!isLoaded) {
            return <div>Loading...</div>;
            // return now that component has value
        } else {
            // create array of recipient IDs
            let recipientsList = this.state.letter.attributes.recipients;
            let recipientsListIDs = [];
            Object.keys(recipientsList).forEach(function (key) {
                recipientsListIDs.push(recipientsList[key].id)
            })

            // create list of each relationship type IDs
            let relationshipsList = this.state.letter.relationships;
            console.log(relationshipsList)
            // Entities:
            let relEntitiesIDs = [];
            if (relationshipsList.entities.data != null) {
                Object.keys(relationshipsList.entities.data).forEach(function (key) {
                    console.log(relationshipsList.entities.data[key].id)
                    relEntitiesIDs.push(relationshipsList.entities.data[key].id)
                })
            }
            console.log(relEntitiesIDs)

            // Recipients
            let relRecipientsIDs = [];
            if (relationshipsList.recipients.data != null) {
                Object.keys(relationshipsList.recipients.data).forEach(function (key) {
                    console.log(relationshipsList.recipients.data[key].id)
                    relRecipientsIDs.push(relationshipsList.recipients.data[key].id)
                })
            }
            console.log(relRecipientsIDs)

            // Repositories
            let relRepositoriesIDs = [];
            if (relationshipsList.repositories.data != null) {
                Object.keys(relationshipsList.repositories.data).forEach(function (key) {
                    console.log(relationshipsList.repositories.data[key].id)
                    relRepositoriesIDs.push(relationshipsList.repositories.data[key].id)
                })
            }
            console.log(relRepositoriesIDs)

            // Places-Written
            let relPlacesWrittenIDs = [];
            if (relationshipsList["places-written"].data != null) {
                Object.keys(relationshipsList["places-written"].data).forEach(function (key) {
                    console.log(relationshipsList["places-written"].data[key].id)
                    relPlacesWrittenIDs.push(relationshipsList["places-written"].data[key].id)
                })
            }
            console.log(relPlacesWrittenIDs)

            // Letter-Owner
            let relLetterOwnerIDs = [];
            if (relationshipsList["letter-owner"].data != null) {
                Object.keys(relationshipsList["letter-owner"].data).forEach(function (key) {
                    console.log(relationshipsList["letter-owner"].data[key].id)
                    relLetterOwnerIDs.push(relationshipsList["letter-owner"].data[key].id)
                })
            }
            console.log(relLetterOwnerIDs)

            // Letter-Publisher
            let relLetterPubIDs = [];
            if (relationshipsList["letter-publisher"].data != null) {
                Object.keys(relationshipsList["letter-publisher"].data).forEach(function (key) {
                    console.log(relationshipsList["letter-publisher"].data[key].id)
                    relLetterPubIDs.push(relationshipsList["letter-publisher"].data[key].id)
                })
            }
            console.log(relLetterPubIDs)


            let format;
            if (this.state.letter.attributes.typed === false && this.state.letter.attributes.signed === true) {
                format = 'signed';
            }
            else format = 'typed';

            return (
                <Container>
                    <Row>
                        <h2>Letter from Samuel Beckett to {this.state.letter.attributes['addressed-to']} on <Moment format="DD MMM YYYY">{this.state.letter.attributes.date}</Moment></h2>
                    </Row>
                    <Row>
                        {recipientsListIDs.map((id) => {
                            return (<ProfileLite personId={id} />)
                        })}
                    </Row>
                    <Row>
                        <Col md='auto' className='letterPgDetails'>
                            <div className='letterInfo'>
                                <h4>Information about this letter:</h4>
                                <h5>This letter was addressed from:</h5>
                                <p>{this.state.letter.attributes['addressed-from']}</p>
                                <h5>And addressed to:</h5>
                                <p>{this.state.letter.attributes['addressed-to']}</p>
                                <h5>Destination:</h5>
                                <p>{this.state.letter.attributes.destination}</p>
                                <h5>Recpient:</h5>
                                <p>{this.state.letter.attributes["recipient-list"]}</p>
                                <h5>Physical description:</h5>
                                <p>Physical-desc: {this.state.letter.attributes['physical-desc']}</p>
                                <p>This letter was {format}.</p>
                                <p>Physical detail: {this.state.letter.attributes['physical-detail']}</p>
                                <p>Physical notes: {this.state.letter.attributes['physical-notes']}</p>
                                <p>{this.state.letter.attributes.leaves} leave(s)</p>
                                <p>{this.state.letter.attributes.sides} side(s)</p>
                                <h5>Notes:</h5>
                                <p>{this.state.letter.attributes.notes}</p>
                                <p>Postmark: {this.state.letter.attributes.postmark}</p>
                                <p>Verified: {this.state.letter.attributes.verified}</p>
                                <p>Envelope: {this.state.letter.attributes.envelope}</p>
                            </div>
                            <h5>Repository Information:</h5>
                            <p>{this.state.letter.attributes['repository-info']}</p>
                            <h5>Entity Count:</h5>
                            <p>{this.state.letter.attributes['entity-count']}</p>
                        </Col>
                        <Col md='auto'>
                            <h4>Relationships:</h4>
                            <h5>Entities:</h5>
                            {relEntitiesIDs.map((id) => {
                                return (<EntitiesRelationship personId={id} />)
                            })}
                            <h5>Recipients:</h5>
                            {relRecipientsIDs.map((id) => {
                                return (<EntitiesRelationship personId={id} />)
                            })}
                            <h5>Repositories:</h5>
                            {relRepositoriesIDs.map((id) => {
                                return (<RepositoriesRelationship personId={id} />)
                            })}
                            <h5>Places Written:</h5>
                            {relPlacesWrittenIDs.map((id) => {
                                return (<EntitiesRelationship personId={id} />)
                            })}
                            <h5>Letter Owner:</h5>
                            {relLetterOwnerIDs.map((id) => {
                                return (<EntitiesRelationship personId={id} />)
                            })}
                            <h5>Letter Publisher:</h5>
                            {relPlacesWrittenIDs.map((id) => {
                                return (<EntitiesRelationship personId={id} />)
                            })}
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default LetterPg;