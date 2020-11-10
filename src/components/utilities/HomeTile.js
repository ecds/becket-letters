import React, { Component } from "react";
import { Card } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class HomeTile extends Component {

  render() {
    // if type is not these two
    let cardTitle =
      this.props.type !== 'public-event' && this.props.type !== 'work-of-art' ?
        // capitalize first letter and assign
        this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1)
        :
        // or, it must be one or the other
        this.props.type === 'public-event' ? 'Public Event' : 'Work of Art'


    return (
      <Card style={{ width: '15rem', marginBottom: '1em' }}>
        <Card.Body>
          <Card.Title>{cardTitle}</Card.Title>
        </Card.Body>
        <Card.Footer className="btn btn-primary">
          <Link to={'/browse-letters-' + this.props.type}>Explore</Link>
        </Card.Footer>
      </Card>

    )
  }
}

export default withRouter(HomeTile);
