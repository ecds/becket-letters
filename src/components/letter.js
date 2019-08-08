import React, { Component } from "react";
import { Accordion, Card, Col, Row, Table } from 'react-bootstrap';
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
                                                    <Table borderless striped hover>
                                                        <tbody>
                                                            <tr>
                                                                <td>ID</td>
                                                                <td>{this.state.letter[0].ID}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Code</td>
                                                                <td>{this.state.letter[0].Code}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>

                                        <Card>
                                            <Accordion.Toggle className='authInfo' as={Card.Header} eventKey="1">
                                                <h4 className='accordTitle'>Authorship Information</h4>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body className='results'>
                                                    <Table borderless striped>
                                                        <tbody>
                                                            <tr>
                                                                <td>Day</td>
                                                                <td>{this.state.letter[0].Day}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Month</td>
                                                                <td>{this.state.letter[0].Month}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Year</td>
                                                                <td>{this.state.letter[0].Year}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Addressed from (Actual)</td>
                                                                <td>{this.state.letter[0]['Addressed from (Actual)']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reg. Place written</td>
                                                                <td>{this.state.letter[0]['Reg. Place written']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reg. Place written city</td>
                                                                <td>{this.state.letter[0]['Reg. Place written city']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reg. Place written country</td>
                                                                <td>{this.state.letter[0]['Reg. Place written country']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reg. Place written, second city</td>
                                                                <td>{this.state.letter[0]['Reg. Place written, second city']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Autograph or Typed</td>
                                                                <td>{this.state.letter[0]['Autograph or Typed']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>PhysDes</td>
                                                                <td>{this.state.letter[0].PhysDes}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>initialed or signed</td>
                                                                <td>{this.state.letter[0]['initialed or signed']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Postcard Image</td>
                                                                <td>{this.state.letter[0]['Postcard Image']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>phys descr detail</td>
                                                                <td>{this.state.letter[0]['phys descr detail']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>PhysDes notes</td>
                                                                <td>{this.state.letter[0]['PhysDes notes']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>leaves</td>
                                                                <td>{this.state.letter[0].leaves}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Sides</td>
                                                                <td>{this.state.letter[0].sides}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Envelope</td>
                                                                <td>{this.state.letter[0].Envelope}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Postmark (Actual)</td>
                                                                <td>{this.state.letter[0]['Postmark (Actual)']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Addressed to (Actual)</td>
                                                                <td>{this.state.letter[0]['Addressed to (Actual)']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reg. recipient</td>
                                                                <td>{this.state.letter[0]['Reg. recipient']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reg place sent</td>
                                                                <td>{this.state.letter[0]['Reg place sent']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reg PlaceSent City</td>
                                                                <td>{this.state.letter[0]['Reg PlaceSent City']}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Reg. PlaceSent Country</td>
                                                                <td>{this.state.letter[0]['Reg. PlaceSent Country']}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
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
