import React, { Component } from 'react';
import axios from "axios";
import { Col, Row } from 'react-bootstrap';
import TimelineYear from './TimelineYear';

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
                const timelineEntries = getLetterData.data.events;
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
            let allTimelineEntries = this.state.timelineEntries
          return (
            <div className="timeline-container">
              <Row>
                <h1>Timeline</h1>
              </Row>
              <Row>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium mollitia, laborum blanditiis, natus rerum distinctio architecto rem atque, aut necessitatibus illum eum veritatis. Mollitia qui similique sit corrupti, atque amet?</p>
              </Row>
              <Row className='timelineTitleRow'>
                  <Col md={6} >
                    <h5>Personal events are in <span className="timelineHeaderBlue">blue</span></h5>
                  </Col>
                  <Col md={6} >
                    <h5>Global events are in <span className="timelineHeaderYellow">gold</span></h5>
                  </Col>
              </Row>
              {
                 Object.keys(allTimelineEntries).map(keyOuter => {
                   return (
                     <TimelineYear year={keyOuter} events={allTimelineEntries[keyOuter]}/>
                   )
                 })
              }
            </div>
          )
        }
    }
}

export default Timeline;
