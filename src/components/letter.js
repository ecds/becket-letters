import React, { Component } from "react";
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import axios from "axios";

export class LetterPg extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      isLoaded: false,
      letter: []
    };
  }

  componentDidMount() {
    axios.all([
      axios.get('2008.json')])
      .then(axios.spread((getLetterData) => {
        const letter = getLetterData.data;
        this.setState({ letter });
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
        return (
          <div>
              <Row>
                  <h2>{this.state.letter[0].Code}</h2>
              </Row>
              <Row>
                  <Col md={6} className='letterPgDetails'>
                      <Row>
                          <Col>
                              <Accordion defaultActiveKey="1">
                                  <Card>
                                      <Accordion.Toggle className='detInfo' as={Card.Header} eventKey="0">
                                          <h4 className='accordTitle'>Details</h4>
                                      </Accordion.Toggle>
                                      <Accordion.Collapse eventKey="0">
                                          <Card.Body className='results'>
                                              <p>ID: </p><p> {this.state.letter[0].ID}</p>
                                              <p>Code: </p><p>{this.state.letter[0].Code}</p>
                                          </Card.Body>
                                      </Accordion.Collapse>
                                  </Card>

                                  <Card>
                                      <Accordion.Toggle className='authInfo' as={Card.Header} eventKey="1">
                                          <h4 className='accordTitle'>Authorship Information</h4>
                                      </Accordion.Toggle>
                                      <Accordion.Collapse eventKey="1">
                                          <Card.Body className='results'>
                                              <p>Day: </p><p>{this.state.letter[0].Day}</p>
                                              <p>Month: </p><p>{this.state.letter[0].Month}</p>
                                              <p>Year: </p><p>{this.state.letter[0].Year}</p>
                                              <p>Addressed from (Actual): </p><p>{this.state.letter[0]['Addressed from (Actual)']}</p>
                                              <p>Reg. Place written: </p><p>{this.state.letter[0]['Reg. Place written']}</p>
                                              <p>Reg. Place written city: </p><p>{this.state.letter[0]['Reg. Place written city']}</p>
                                              <p>Reg. Place written country: </p><p>{this.state.letter[0]['Reg. Place written country']}</p>
                                              <p>Reg. Place written, second city: </p><p>{this.state.letter[0]['Reg. Place written, second city']}</p>
                                              <p>Autograph or Typed: </p><p>{this.state.letter[0]['Autograph or Typed']}</p>
                                              <p>PhysDes: </p><p>{this.state.letter[0].PhysDes}</p>
                                              <p>initialed or signed: </p><p>{this.state.letter[0]['initialed or signed']}</p>
                                              <p>Postcard Image: </p><p>{this.state.letter[0]['Postcard Image']}</p>
                                              <p>phys descr detail: </p><p>{this.state.letter[0]['phys descr detail']}</p>
                                              <p>PhysDes notes: </p><p>{this.state.letter[0]['PhysDes notes']}</p>
                                              <p>leaves: </p><p> "?"</p>
                                              <p>sides: </p><p>{this.state.letter[0].sides}</p>
                                              <p>Envelope: </p><p>{this.state.letter[0].Envelope}</p>
                                              <p>Postmark (Actual): </p><p> </p>
                                              <p>Addressed to (Actual): </p><p>{this.state.letter[0]['Addressed to (Actual)']}</p>
                                              <p>Reg. recipient: </p><p>{this.state.letter[0]['Reg. recipient']}</p>
                                              <p>Reg place sent: </p><p>{this.state.letter[0]['Reg place sent']}</p>
                                              <p>Reg. PlaceSent City: </p><p>{this.state.letter[0]['Reg PlaceSent City']}</p>
                                              <p>Reg. PlaceSent Country: </p><p>{this.state.letter[0]['Reg. PlaceSent Country']}</p>
                                          </Card.Body>
                                      </Accordion.Collapse>
                                  </Card>

                                  <Card>
                                      <Accordion.Toggle className='moreInfo' as={Card.Header} eventKey="2">
                                          <h4 className='accordTitle'>Additional</h4>
                                      </Accordion.Toggle>
                                      <Accordion.Collapse eventKey="2">
                                          <Card.Body>
                                              <p>{this.state.letter[0].Additional}</p>
                                          </Card.Body>
                                      </Accordion.Collapse>
                                  </Card>

                                  <Card>
                                      <Accordion.Toggle className='archInfo' as={Card.Header} eventKey="3">
                                          <h4 className='accordTitle'>Archival Info</h4>
                                      </Accordion.Toggle>
                                      <Accordion.Collapse eventKey="3">
                                          <Card.Body className='results'>
                                              <p>First Repository: </p><p>{this.state.letter[0]['First Repository']}</p>
                                              <p>First Format: </p><p>{this.state.letter[0]['First Format']}</p>
                                              <p>Euro or Am?: </p><p>{this.state.letter[0]['Euro or Am?']}</p>
                                              <p>First Public?: </p><p>{this.state.letter[0]['First Public?']}</p>
                                              <p>First Collection: </p><p>{this.state.letter[0]['First Collection']}</p>
                                              <p>Repository information: </p><p>{this.state.letter[0]['Repository information']}</p>
                                              <p>Second Repository: </p><p>{this.state.letter[0]['Second Repository']}</p>
                                              <p>Second Format: </p><p>{this.state.letter[0]['Second Format']}</p>
                                              <p>Second Public?: </p><p>{this.state.letter[0]['Second Public?']}</p>
                                              <p>Second Collection: </p><p>{this.state.letter[0]['Second Collection']}</p>
                                              <p>Third Repository: </p><p>{this.state.letter[0]['Third Repository']}</p>
                                              <p>Third Format: </p><p>{this.state.letter[0]['Third Format']}</p>
                                              <p>Third Public?: </p><p>{this.state.letter[0]['Third Public?']}</p>
                                              <p>Third Collection: </p><p>{this.state.letter[0]['Third Collection']}</p>
                                              <p>OwnerRights: </p><p>{this.state.letter[0].OwnerRights}</p>
                                              <p>PrimaryLang: </p><p>{this.state.letter[0].PrimaryLang}</p>
                                              <p>File: </p><p>{this.state.letter[0].File}</p>
                                              <p>Sender: </p><p>{this.state.letter[0].Sender}</p>
                                              <p>PlacePrevPubl: </p><p>{this.state.letter[0].PlacePrevPubl}</p>
                                              <p>Verified: </p><p>{this.state.letter[0]['Verified']}</p>
                                          </Card.Body>
                                      </Accordion.Collapse>
                                  </Card>

                              </Accordion>
                          </Col>
                      </Row>
                  </Col>
                  <Col></Col>
                  <Col md={2} className='navPane'>
                      <h4>Navigation</h4>
                  </Col>
              </Row>
          </div>
        )
      }
    }
}

export default LetterPg;
