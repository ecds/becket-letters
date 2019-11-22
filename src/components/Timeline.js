import React, { Component } from 'react';
import axios from "axios";
import TimelineYear from './TimelineYear';
import DocumentMeta from 'react-document-meta';
import { HashLink as Link } from 'react-router-hash-link';

export class Timeline extends Component {
  constructor(props, context) {
    super(props, context);
    this.myRef = React.createRef();
    this.state = {
      error: null,
      isLoaded: false,
      timelineEntries: []
    };
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  scrollToMyRef = () => {
    window.scrollTo({
      top: this.myRef.offsetTop,
      // behavior: "smooth" // optional
    });
  };

  componentDidMount() {
    this.scrollToMyRef();
    axios.all([
      axios.get('http://localhost:3000/beckett-timeline-ver-26-aug.json')])
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
      const meta = {
        title: 'Beckett Timeline',
        description: "This page displays a timeline of events in Beckett's personal life and events he mentioned in his letters.",
      };
      return (
        <div className="timeline-container">
          <DocumentMeta {...meta} id='docmeta' />
          {/* <Row>
            <h1>Timeline</h1>
          </Row>
          <Row>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium mollitia, laborum blanditiis, natus rerum distinctio architecto rem atque, aut necessitatibus illum eum veritatis. Mollitia qui similique sit corrupti, atque amet?</p>
          </Row>
          <Row className='timelineTitleRow'>
            <Col md={6} >
              <h2>Personal events are in <span className="timelineHeaderBlue">blue</span></h2>
            </Col>
            <Col md={6} >
              <h2>Global events are in <span className="timelineHeaderYellow">gold</span></h2>
            </Col>
          </Row> */}
          <ol>
            {Object.keys(allTimelineEntries).map(keyOuter => {
              return (
                <li ref={this.myRef}>{keyOuter}</li>
              )
            })}
            <button onClick={() => this.scrollToTop()}>Top</button>
          </ol>
          {
            Object.keys(allTimelineEntries).map(keyOuter => {
              return (
                <TimelineYear ref={keyOuter} key={keyOuter} year={keyOuter} events={allTimelineEntries[keyOuter]} />
              )
            })
          }
        </div>
      )
    }
  }
}

export default Timeline;
