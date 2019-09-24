import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RelationshipCard from './RelationshipCard';
import { Button, Col, Row, Card } from 'react-bootstrap';

class EntitiesMentioned extends Component {
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
            axios.get('http://ot-api.ecdsdev.org/entities/' + this.props.id)])
            .then(axios.spread((getrelationshipData) => {
                const relationshipData = getrelationshipData.data.data;
                console.log(getrelationshipData);
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
          return (
            <RelationshipCard data={this.state.relationshipData} />
          )



        }
    }
}

export default EntitiesMentioned;
