import React, { Component } from 'react';
import TimelineEvent from './TimelineEvent';

class TimelineYear extends Component {

  render() {
    const events = this.props.events.map((event, key) =>
        <TimelineEvent key={key} event={event} />
    );
    return (
        <div className="year-container" id={this.props.id}>
          <h3 className="year-title sticky-top">
            {this.props.year}
          </h3>
          {events}
        </div>
    )
  }
}

export default TimelineYear;
