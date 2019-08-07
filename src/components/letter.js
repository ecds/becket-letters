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
        console.log(getLetterData)
        const letter = getLetterData.data;
        this.setState({ letter });
        console.log(letter)
        console.log(this.state.letter[0].Code)
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
                                              <p>Code: </p><p> "SABE [SPRING 1957] ALBO"</p>
                                          </Card.Body>
                                      </Accordion.Collapse>
                                  </Card>

                                  <Card>
                                      <Accordion.Toggle className='authInfo' as={Card.Header} eventKey="1">
                                          <h4 className='accordTitle'>Authorship Information</h4>
                                      </Accordion.Toggle>
                                      <Accordion.Collapse eventKey="1">
                                          <Card.Body className='results'>
                                              <p>Day: </p><p> 0</p>
                                              <p>Month: </p><p> 0</p>
                                              <p>Year: </p><p> 57</p>
                                              <p>Addressed from (Actual): </p><p> </p>
                                              <p>Reg. Place written: </p><p> </p>
                                              <p>Reg. Place written city: </p><p> </p>
                                              <p>Reg. Place written country: </p><p> </p>
                                              <p>Reg. Place written, second city: </p><p> </p>
                                              <p>Autograph or Typed: </p><p> </p>
                                              <p>PhysDes: </p><p> "Other"</p>
                                              <p>initialed or signed: </p><p> </p>
                                              <p>Postcard Image: </p><p> </p>
                                              <p>phys descr detail: </p><p> </p>
                                              <p>PhysDes notes: </p><p> </p>
                                              <p>leaves: </p><p> "?"</p>
                                              <p>sides: </p><p> "?"</p>
                                              <p>Envelope: </p><p> </p>
                                              <p>Postmark (Actual): </p><p> </p>
                                              <p>Addressed to (Actual): </p><p> "ALAIN BOSQUET"</p>
                                              <p>Reg. recipient: </p><p> "Alain Bosquet"</p>
                                              <p>Reg place sent: </p><p> </p>
                                              <p>Reg. PlaceSent City: </p><p> </p>
                                              <p>Reg. PlaceSent Country: </p><p> </p>
                                          </Card.Body>
                                      </Accordion.Collapse>
                                  </Card>

                                  <Card>
                                      <Accordion.Toggle className='moreInfo' as={Card.Header} eventKey="2">
                                          <h4 className='accordTitle'>Additional</h4>
                                      </Accordion.Toggle>
                                      <Accordion.Collapse eventKey="2">
                                          <Card.Body>
                                              <p> "BY BOSQUET - 1996 - REPRINTED FROM LES FRUITS. . ."</p>
                                          </Card.Body>
                                      </Accordion.Collapse>
                                  </Card>

                                  <Card>
                                      <Accordion.Toggle className='archInfo' as={Card.Header} eventKey="3">
                                          <h4 className='accordTitle'>Archival Info</h4>
                                      </Accordion.Toggle>
                                      <Accordion.Collapse eventKey="3">
                                          <Card.Body className='results'>
                                              <p>First Repository: </p><p> "BOSQUET"</p>
                                              <p>First Format: </p><p> </p>
                                              <p>Euro or Am?: </p><p> </p>
                                              <p>First Public?: </p><p> </p>
                                              <p>First Collection: </p><p> </p>
                                              <p>Repository information: </p><p> </p>
                                              <p>Second Repository: </p><p> </p>
                                              <p>Second Format: </p><p> </p>
                                              <p>Second Public?: </p><p> </p>
                                              <p>Second Collection: </p><p> </p>
                                              <p>Third Repository: </p><p> </p>
                                              <p>Third Format: </p><p> </p>
                                              <p>Third Public?: </p><p> </p>
                                              <p>Third Collection: </p><p> </p>
                                              <p>OwnerRights: </p><p> "Beckett"</p>
                                              <p>PrimaryLang: </p><p> "French"</p>
                                              <p>File: </p><p> "BOSQUET"</p>
                                              <p>Sender: </p><p> "Samuel Beckett"</p>
                                              <p>PlacePrevPubl: </p><p> "LES FRUITS DE L'AN DERNIE"</p>
                                              <p>Verified: </p><p> "Y"</p>
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
