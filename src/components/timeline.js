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
            axios.get('beckett-timeline-year.json')])
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
            let allTimelineEntries = this.state.timelineEntries['1960']
            console.log(allTimelineEntries)
            allTimelineEntries.map(function(year) {
                var timelineEvent = year.map(function(event) {
                    return (
                        <div>Event</div>
                    )
                });
                return (
                    {timelineEvent}
                )
            })
            // const entries = this.state.timelineEntries;
            // let entryArr = []; 
            // Object.keys(entries).forEach(function (key) {
            //     entryArr.push(entries[key])
            // });
            // console.log(entryArr)
            
            
            // const timeline = Object.keys(entry).forEach(function (key) {
            //     entries.push(entry[key])
            //     entry[key].map(function(timelineData) {
            //         console.log('w')
            //         return <Row>{timelineData}</Row>
            //     });
                // old .map()
                // const timeline = entry[key].map(function (timelineData) {
                //     return <Row>{timelineData}</Row>
                // const timelineBlock = entry[key].map(function(timelineData) {
                //     return <Row>{timelineData}</Row>
                // });
                // console.log(entry[key])
                // return "<div>he</div>"
                // timelineBlock()
            // })
            return (
                <div>
                    <Row>
                        <h1>Timeline</h1>
                    </Row>
                    <Row>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium mollitia, laborum blanditiis, natus rerum distinctio architecto rem atque, aut necessitatibus illum eum veritatis. Mollitia qui similique sit corrupti, atque amet?</p>
                    </Row>
                    <Row className='timelineTitleRow'>
                        <Col md={6} >
                            <Row></Row>
                            <h5>Personal events are in <span className="timelineHeaderBlue">blue</span></h5>
                        </Col>
                        <Col md={6} >
                            <h5>Global events are in <span className="timelineHeaderYellow">gold</span></h5>
                        </Col>
                    </Row>
                    
                    <div>hey</div>
                </div>
            )
        }
    }
}

export default Timeline;