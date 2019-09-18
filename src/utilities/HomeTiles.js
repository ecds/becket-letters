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
          <Row className='justify-content-center'>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "imgs/lindon.jpg"} />
                <Card.Body>
                  <Card.Title>People Mentioned</Card.Title>
                  <Card.Text>
                    Pictured: Jérôme Lindon, <i>nouveau roman</i> publisher at Les Éditions de Minuit
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="btn btn-primary">
                  <Link to={{pathname: '/browse-letters', state: { activeKey: "people" }}}>Explore</Link>
                </Card.Footer>
              </Card>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "imgs/paris.jpg"} />
                <Card.Body>
                  <Card.Title>Places Mentioned</Card.Title>
                  <Card.Text>
                    Pictured: Paris. France
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="btn btn-primary">
                  <Link to={{pathname: '/browse-letters', state: { activeKey: "places" }}}>Explore</Link>
                </Card.Footer>
              </Card>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "imgs/akademie.jpg"} />
                <Card.Body>
                  <Card.Title>Organizations Mentioned</Card.Title>
                  <Card.Text>
                    Pictured: Akademie der Künste state arts institution in Berlin
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="btn btn-primary">
                  <Link to={{pathname: '/browse-letters', state: { activeKey: "organizations" }}}>Explore</Link>
                </Card.Footer>
              </Card>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "imgs/krapp.jpg"} />
                <Card.Body>
                  <Card.Title>Productions Mentioned</Card.Title>
                  <Card.Text>
                    Pictured:<br/> John Hurt in a 2012 production of <i>Krapp's Last Tape</i>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="btn btn-primary">
                  <Link to={{pathname: '/browse-letters', state: { activeKey: "productions" }}}>Explore</Link>
                </Card.Footer>
              </Card>
          </Row>
        </Container>
      )
    }
  }

export default withRouter(HomeTiles);
