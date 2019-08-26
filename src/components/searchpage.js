import React, { Component } from "react";
import { Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import '../assets/stylesheets/components/searchpage.scss'

export class SearchPage extends Component {

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <h2>Search</h2>
                    </Row>
                </Container>
                <Row className='m-0 searchBoxBg'>
                    <Container >
                        <Row className='dateRange justify-content-md-center'>
                            <Col md={3}>
                                <Row>
                                    <h5>Beginning Date Range</h5>
                                    <InputGroup className="mb-3 ">
                                        <input type="date" name="start date" defaultValue="1954-01-01" min="1954-01-01" max="1970-01-01" />
                                    </InputGroup>

                                </Row>
                            </Col>
                            <Col md={3}>
                                <h5>End Date Range</h5>
                                <InputGroup className="mb-3 ">
                                    <input type="date" name="end date" defaultValue='1970-01-01' min="1954-01-01" max="1970-01-01" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className='justify-content-md-center'>
                            <Col md={8}>
                                <h5>Search Query</h5>
                                <InputGroup className="mb-3 queryBox">
                                    <FormControl
                                        placeholder="ex. 'Waiting for Godot'"
                                        aria-label="ex. 'Waiting for Godot'"
                                        aria-describedby="basic-addon2"
                                    />

                                    <InputGroup.Append>
                                        <InputGroup.Text>in</InputGroup.Text>
                                        <select>
                                            <option value="Entity 1">Entity 1</option>
                                            <option value="Entity 4">Entity 2</option>
                                            <option value="Entity 3">Entity 3</option>
                                            <option value="Entity 4">Entity 4</option>
                                        </select>
                                        <Button >Go</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>

                    </Container>
                </Row>
                {/* <Container>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, sequi, molestias numquam perferendis delectus cumque dolores aut obcaecati unde fugit, veniam quae vel ipsa repellendus. Recusandae repellendus unde earum. Recusandae.</p>
                </Container> */}
            </div>
        )
    }
}

export default SearchPage;