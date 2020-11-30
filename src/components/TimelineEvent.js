import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

class TimelineEvent extends Component {

  timelineImageAdder(image_url) {

    fetch(image_url, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          console.log('Image exists.');
          return (
            <img className='timeline-event-image' src={this.props.event.additional} alt='timeline event' />
          )
        } else {
          console.log('Image does not exist.');
          return null
        }
      }).catch(err => console.log('Error:', err));

  }

  render() {
    const eventClassName = (() => {
      if (this.props.event.type === 'global')
        return 'event offset-md-6 right-event'
      else
        return 'event left-event'
    })();

    return (
      <Row>
        <Col md={6} className={eventClassName}>
          <div className={this.props.event.type}>
            <h4>{this.props.event.date}</h4>
            <p><span dangerouslySetInnerHTML={{ __html: this.props.event.event }} /></p>
            {this.props.event.additional && this.props.event.additional.startsWith('http') ? this.timelineImageAdder(this.props.event.additional) : null}
          </div>
        </Col>
      </Row>
    )

  }
}

export default TimelineEvent;
