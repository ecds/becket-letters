import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';

class TimelineEvent extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    const eventClassName = (() => {
      if (this.props.event.type == 'global')
        return 'event offset-md-6 right-event'
      else
        return 'event left-event'
    })();

    return (
      <Row>
        <Col md={6} className={eventClassName}>
          <div className={this.props.event.type}>
            <h4>{this.props.event.date}</h4>
            <p>{this.props.event.event}</p>
          </div>
        </Col>
      </Row>
    )

  }
}

export default TimelineEvent;
