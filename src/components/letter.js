import React, { Component } from "react";
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import '../styles/letterpg.css'

export class LetterPg extends Component {
    render() {
        return (
            <div>
                <Row>
                    <h2>Letter Name</h2>
                </Row>
                <Row>
                    <Col md={6} className='letterPgDetails'>
                        <Row>
                            <Col>
                                <div >

                                </div>
                                <Accordion defaultActiveKey="0">

                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            <h4 className='detInfo accordTitle'>Details</h4>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body className='results'>
                                                <p>ID: </p><p> 2008</p>
                                                <p>Code: </p><p> "SABE [SPRING 1957] ALBO"</p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="1">
                                            <h4 className='authInfo accordTitle'>Authorship Information</h4>
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
                                        <Accordion.Toggle as={Card.Header} eventKey="2">
                                            <h4 className='moreInfo accordTitle'>Additional</h4>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="2">
                                            <Card.Body>
                                                <p> "BY BOSQUET - 1996 - REPRINTED FROM LES FRUITS. . ."</p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="3">
                                            <h4 className='archInfo accordTitle'>Archival Info</h4>
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

export default LetterPg;