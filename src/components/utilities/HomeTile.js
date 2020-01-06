import React, { Component } from "react";
import { Card } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class HomeTile extends Component {

  render() {

    let firstLetterCapital = this.props.type.charAt(0).toUpperCase() +  
    this.props.type.slice(1)

    return (
      <Card style={{ width: '15rem' }}>
        <Card.Body>
          <Card.Title>{firstLetterCapital}</Card.Title>
        </Card.Body>
        <Card.Footer className="btn btn-primary">
          <Link to={'/browse-letters-' + this.props.type}>Explore</Link>
        </Card.Footer>
      </Card>

    )
  }
}

export default withRouter(HomeTile);
