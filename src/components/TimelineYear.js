import React, { Component } from 'react';
import TimelineEvent from './TimelineEvent';

class TimelineYear extends Component {

  componentDidMount() {
  }

  render() {
    const events = this.props.events.map((event, key) =>
        <TimelineEvent event={event} />
    );
    return (
        <div className="year-container">
          <div className="year-title sticky-top">
            {this.props.year}
          </div>
          {events}
        </div>
    )
  }
}

export default TimelineYear;
