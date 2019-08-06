import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';
import '../styles/letterpg.css'

export class LetterPg extends Component {
    render() {
        return (
            <div>
                <Row>
                    <h2>Letter Name</h2>
                </Row>
                <Row>
                    <p>Letter ID: </p><p> #ID#</p>
                </Row>
                <Row>
                    <Col md={9} className='letterPgDetails'>
                        <h3>Details</h3>
                        <Row>
                            <Col>
                                <div className='results'>
                                    <p>ID: </p><p> 2008</p>
                                    <p>Code: </p><p> "SABE [SPRING 1957] ALBO"</p>
                                </div>
                                <h4 className='authInfo'>Authorship Information</h4>
                                <div className='results'>
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
                                </div>
                                <h4 className='moreInfo'>More</h4>
                                <div className='results'>
                                    <p>Additional: </p><p> "BY BOSQUET - 1996 - REPRINTED FROM LES FRUITS. . ."</p>
                                </div>
                                <h4 className='archInfo'>Archival Info</h4>
                                <div className='results'>
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
                                </div>
                            </Col>

                        </Row>
                    </Col>
                    <Col md={2} className='navPane'>Navigation Pane</Col>
                </Row>

            </div>
        )
    }
}

export default LetterPg;