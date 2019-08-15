import React, { Component } from 'react';
import axios from "axios";
import { Col, Row } from 'react-bootstrap';

export class Timeline extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: null,
            isLoaded: false,
            timelineEntries: []
        };
    }

    componentDidMount() {
        axios.all([
            axios.get('beckett-timeline.json')])
            .then(axios.spread((getLetterData) => {
                console.log(getLetterData);
                const timelineEntries = getLetterData.data;
                console.log(timelineEntries);
                this.setState({ timelineEntries });
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
            const timeline = this.state.timelineEntries.map(function (timelineData) {
                if (timelineData.type === "") {
                    return null
                }
                if (timelineData.type === 'personal') {
                    return <Row>
                        <Col md={6} className='leftEvent'>
                            <div className={` ${timelineData.type}`}>
                                <h4>{timelineData.date}</h4>
                                <p>{timelineData.event}</p>
                            </div>
                        </Col>
                    </Row>;
                }
                else {
                    return <Row>
                        <Col md={6} className='offset-md-6 rightEvent'>
                            <div className={` ${timelineData.type}`}>
                                <h4>{timelineData.date}</h4>
                                <p>{timelineData.event}</p>
                            </div>
                        </Col>
                    </Row>;
                };
            })
            return (
                <div>
                    <Row>
                        <h1>Timeline</h1>
                    </Row>
                    <Row>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium mollitia, laborum blanditiis, natus rerum distinctio architecto rem atque, aut necessitatibus illum eum veritatis. Mollitia qui similique sit corrupti, atque amet?</p>
                    </Row>
                    <Row>
                        <Col md={6} >
                            <Row></Row>
                            <h5>Personal events are in <span className="timelineHeaderBlue">blue</span></h5>
                        </Col>
                        <Col md={6} >
                            <h5>Global events are in <span className="timelineHeaderYellow">gold</span></h5>
                        </Col>
                    </Row>
                    {timeline}
                </div>
            )
        }
    }
}

export default Timeline;