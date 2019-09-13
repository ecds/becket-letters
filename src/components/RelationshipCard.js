import React, { Component } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class RelationshipCard extends Component {
    render() {
        return (
            <Row>
                <Col md="auto">
                    <Card className='relationship-card'>
                        <Card.Header><h5>{this.props.cardHeader}</h5></Card.Header>
                        <Card.Body>
                            {this.props.cardText}
                            <Button to={this.props.buttonURL}>
                                Explore
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default RelationshipCard;
