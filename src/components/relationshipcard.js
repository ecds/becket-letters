import React, { Component } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { nullLiteral } from '@babel/types';

class entitiesRelationship extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: '',
            relationshipData: []
        }
    }

    componentDidMount() {
        axios.all([
            axios.get('http://ot-api.ecdsdev.org/' + this.props.personId)])
            .then(axios.spread((getrelationshipData) => {
                const relationshipData = getrelationshipData.data;
                this.setState({ relationshipData });
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
            let cardText = null;
            if (this.state.relationshipData.data.attributes.properties != null) {
                cardText = <Card.Text>{this.state.relationshipData.data.attributes.properties.description}</Card.Text>
            }
            console.log(this.state.relationshipData.data.type)
            if (this.state.relationshipData.data.type === "repositories") {
                let isPublicRepo;
                if (this.state.relationshipData.data.attributes.public === true) {
                    isPublicRepo = 'yes'
                }
                else (isPublicRepo = 'no')
                let isUSRepo;
                console.log(this.state.relationshipData.data.attributes.american)
                if (this.state.relationshipData.data.attributes.american === true) {
                    isUSRepo = 'yes'
                }
                else (isUSRepo = 'no')
                cardText = <Card.Text>Public: {isPublicRepo}<br />American: {isUSRepo}</Card.Text>
            }


            return (
                <Row>
                    <Col md="auto">
                        <Card className='relationship-card'>
                            <Card.Header><h5>{this.state.relationshipData.data.attributes["label"]}</h5></Card.Header>
                            <Card.Body>
                                {cardText}
                                <Button to={'/people/' + this.state.relationshipData.id}>
                                    Explore
                                    </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
        }
    }
}

export default entitiesRelationship;
