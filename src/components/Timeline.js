import React, { Component } from 'react';
import axios from "axios";
import TimelineYear from './TimelineYear';
import DocumentMeta from 'react-document-meta';
import ScrollIntoView from 'react-scroll-into-view';

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



  componentDidMount() {
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
          <div className='scrollToLinks'>
            <h3 id='scrollLabelSm'>Jump to:</h3>
            <ScrollIntoView selector='#div1957' ><button className='btn btn-primary'>Top</button></ScrollIntoView>
            {Object.keys(allTimelineEntries).map(keyOuter => {
              return (
                <ScrollIntoView selector={"#div" + keyOuter}><nav className='scrollToLink'>{keyOuter}</nav></ScrollIntoView>
              )
            })}
          </div>
          {
            Object.keys(allTimelineEntries).map(keyOuter => {
              console.log(keyOuter)
              return (
                <TimelineYear year={keyOuter} events={allTimelineEntries[keyOuter]} />
              )
            })
          }
        </div>
      )
    }
  }
}

export default Timeline;
