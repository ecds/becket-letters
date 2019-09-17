import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';
import axios from "axios";


class HomeTiles extends Component {
  constructor(props, context) {
      super(props, context);
  }

  componentDidMount() {
    console.log(this.props)
    // this.createPagination();
  }


  render() {
      return (
        <Container fluid className="home-tiles">
          <h2>Browse Letters By</h2>
          <Row>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>People Mentioned</Card.Title>
                  <Card.Text>
                    Example Text Here
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="btn btn-primary">
                  <Link to={{pathname: '/browse-letters', state: { activeKey: "people" }}}>Explore</Link>
                </Card.Footer>
              </Card>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Places Mentioned</Card.Title>
                  <Card.Text>
                    Example Text Here
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="btn btn-primary">
                  <Link to={{pathname: '/browse-letters', state: { activeKey: "places" }}}>Explore</Link>
                </Card.Footer>
              </Card>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Organizations Mentioned</Card.Title>
                  <Card.Text>
                    Example Text Here
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="btn btn-primary">
                  <Link to={{pathname: '/browse-letters', state: { activeKey: "organizations" }}}>Explore</Link>
                </Card.Footer>
              </Card>
          </Row>
        </Container>
      )
    }
  }

export default withRouter(HomeTiles);
