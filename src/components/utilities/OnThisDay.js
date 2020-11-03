import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";
import Moment from 'react-moment';

export class OnThisDay extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: null,
            isLoaded: false,
            letters: []
        };
    }

    componentDidMount() {
        axios.all([
            axios.get('http://ot-api.ecdsdev.org/letters?items=1000')])
            .then(axios.spread((getLettersList) => {
                const letters = getLettersList.data.data;
                this.setState({ letters });
                this.setState({ isLoaded: true })
            }))
            .catch((err) => {
                this.setState({ isLoaded: false });
                this.setState({ error: err.message });
            });

    }

    render() {
        let currentDay = new Date().getDate();
        let currentMonth = new Date().getMonth() + 1;
        let dailyResult = [];
        this.state.letters.forEach(function (element) {
            if (element.attributes.date.includes("0" + currentMonth + "-" + currentDay + "T")) {
                console.log(element.attributes.date)
                console.log(element.attributes['recipient-list'])
                dailyResult.push(element.attributes.date.slice(0, -20) + ' to ' + element.attributes['recipient-list'] + "  |  ")
                console.log(dailyResult)
            }
        });
        console.log(dailyResult)
        if (dailyResult === null) {
            dailyResult = 'No letters on this day'
        }
        else {
            dailyResult = dailyResult
        }
        return (
            <Row>
                <Col>
                    <Row>
                        <h3>On This Day: <Moment local format='DD MMMM' /></h3>
                        <div>{dailyResult}</div>
                        <div><p>Daily Result</p></div>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default OnThisDay;
