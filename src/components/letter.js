import React, { Component } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import ProfileLite from './ProfileLite';
import axios from "axios";
import { list } from "postcss";

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
            axios.get('http://ot-api.ecdsdev.org/letters/45b6288b-732a-4a6a-8667-e602a930d963')])
            .then(axios.spread((getEntityList) => {
                const letter = getEntityList.data.data;
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
            console.log(this.state.letter.attributes)
            let format;
            if (this.state.letter.attributes.typed === false && this.state.letter.attributes.signed === true) {
                format = 'signed';
            }
            else format = 'typed';
            
            return (
                <Container>
                    <h2><a href='https://www.npmjs.com/package/react-moment#formatting'>https://www.npmjs.com/package/react-moment#formatting</a></h2>
                    <Row>
                        <h2>Letter from Samuel Beckett to {this.state.letter.attributes['addressed-to']} on {this.state.letter.attributes.date}</h2>
                    </Row>
                    <Row>
                        <ProfileLite personId="9a304912-c851-436a-ae20-e72e73f92397" />
                    </Row>
                    <Row>
                        <Col md='auto' className='letterPgDetails'>


                            <div className='letterInfo'>
                                <h4>Information about this letter:</h4>
                                <h5>This letter was addressed from:</h5>
                                <p>{this.state.letter.attributes['addressed-from']}</p>
                                <h5>And addressed to:</h5>
                                <p>{this.state.letter.attributes['addressed-to']}</p>
                                <h5>Destination:</h5>
                                <p>{this.state.letter.attributes.destination}</p>
                                <h5>Recpient:</h5>
                                <p>{this.state.letter.attributes.recipient.label}</p>                            
                                <h5>Physical description:</h5>
                                <p>Physical-desc: {this.state.letter.attributes['physical-desc']}</p>
                                <p>This letter was {format}.</p>
                                <p>Physical detail: {this.state.letter.attributes['physical-detail']} ( physical-detail empty )</p>
                                <p>Physical notes: {this.state.letter.attributes['physical-notes']} ( physical-notes empty )</p>
                                <p>{this.state.letter.attributes.leaves} leave(s)</p>
                                <p>{this.state.letter.attributes.sides} side(s)</p>
                                <h5>Notes:</h5>
                                <p>{this.state.letter.attributes.notes}</p>
                                <p>Postmark: {this.state.letter.attributes.postmark}</p>
                                <p>Verified: {this.state.letter.attributes.verified}</p>
                                <p>Envelope: {this.state.letter.attributes.envelope}</p>
                                
                                
                            </div>
                            <h5>Repository Information:</h5>
                            <p>{this.state.letter.attributes['repository-info']} ( repository-info empty )</p>
                            <h5>Entity Count:</h5>
                            <p>{this.state.letter.attributes['entity-count']}</p>

                            <div className='letterInfo'>
                                <h4>Missing data from previous:</h4>
                                <p>Addressed from</p>
                                <p>Place Written</p>
                                <p>First repository</p>
                                <p>first format</p>
                                <p>euro or am</p>
                                <p>first public?</p>
                                <p>first collection </p>
                                <p>repository information</p>
                                <p>second format</p>
                                <p>second public?</p>
                                <p>Third Collection</p>
                                <p>OwnerRights</p>
                                <p>PrimaryLang</p>
                                <p>File</p>
                                <p>Sender</p>
                                <p>PlacePrevPubl</p>
                            </div>
                            

                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default LetterPg;