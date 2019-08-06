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
                    <p>Letter ID: #ID#</p>
                </Row>
                <Row>
                    <Col md={10}>
                        <h3>Details</h3>
                        <Row>
                            <Col>
        <p>"ID": 2008,</p>
        <p>"Code": "SABE [SPRING 1957] ALBO",</p>
        <p>"Day": 0,</p>
        <p>"Month": 0,</p>
        <p>"Year": 57,</p>
        <p>"Addressed from (Actual)": "",</p>
        <p>"Reg. Place written": "",</p>
        <p>"Reg. Place written city": "",</p>
        <p>"Reg. Place written country": "",</p>
        <p>"Reg. Place written, second city": "",</p>
        <p>"Autograph or Typed": "",</p>
        <p>"PhysDes": "Other",</p>
        <p>"initialed or signed": "",</p>
        <p>"Postcard Image": "",</p>
        <p>"phys descr detail": "",</p>
        <p>"PhysDes notes": "",</p>
        <p>"leaves": "?",</p>
        <p>"sides": "?",</p>
        <p>"Envelope": "",</p>
        <p>"Postmark (Actual)": "",</p>
        <p>"Addressed to (Actual)": "ALAIN BOSQUET",</p>
        <p>"Reg. recipient": "Alain Bosquet",</p>
        <p>"Reg place sent": "",</p>
        <p>"Reg. PlaceSent City": "",</p>
        <p>"Reg. PlaceSent Country": "",</p>
        <p>"Additional": "BY BOSQUET - 1996 - REPRINTED FROM LES FRUITS. . .",</p>
        <p>"First Repository": "BOSQUET",</p>
        <p>"First Format": "",</p>
        <p>"Euro or Am?": "",</p>
        <p>"First Public?": "",</p>
        <p>"First Collection": "",</p>
        <p>"Repository information": "",</p>
        <p>"Second Repository": "",</p>
        <p>"Second Format": "",</p>
        <p>"Second Public?": "",</p>
        <p>"Second Collection": "",</p>
        <p>"Third Repository": "",</p>
        <p>"Third Format": "",</p>
        <p>"Third Public?": "",</p>
        <p>"Third Collection": "",</p>
        <p>"OwnerRights": "Beckett",</p>
        <p>"PrimaryLang": "French",</p>
        <p>"File": "BOSQUET",</p>
        <p>"Sender": "Samuel Beckett",</p>
        <p>"PlacePrevPubl": "LES FRUITS DE L'AN DERNIE",</p>
        <p>"Verified": "Y"</p>
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