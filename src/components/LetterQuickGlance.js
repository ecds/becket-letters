import React, { Component } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import ProfileCard from './ProfileCard';
import RelationshipChecker from './RelationshipChecker';
import axios from "axios";
import Moment from 'react-moment';

export class LetterQuickGlance extends Component {
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
            axios.get('http://ot-api.ecdsdev.org/letters/'+this.props.letterId)])
            .then(axios.spread((getEntityList) => {
                const letter = getEntityList.data.data;
                console.log(getEntityList)
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
        if (!error & isLoaded) {
          return (
            <p>To: {this.state.letter.attributes['recipient-list']}(<Moment format="DD MMM YYYY">{this.state.letter.attributes.date}</Moment>)
              <a href={ '/letters/letterdetails/' + this.state.letter.id }>Explore Letter</a>
            </p>
          )
        }
        else {
          return null
        }
    }
}

export default LetterQuickGlance;
