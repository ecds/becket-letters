import React, { Component } from "react";
import { Container, Col, Row, Table } from 'react-bootstrap';
import ProfileLite from './ProfileLite';
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
            axios.get('../letters_json.json')])
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
            // 
            // to:
            // {recipient} at {address}
            // 
            // autographed or typed
            let formatAndSignoff;
            if (this.state.letter[10]['Autograph or Typed'] === '' && this.state.letter[10]['initialed or signed'] === '') {
                formatAndSignoff = null
            }
            else if (this.state.letter[10]['Autograph or Typed'] === 'A' && this.state.letter[10]['initialed or signed'] === '') {
                formatAndSignoff = 'Beckett hand wrote this letter.'
            }
            else if (this.state.letter[10]['Autograph or Typed'] === 'A' && this.state.letter[10]['initialed or signed'] === 'I') {
                formatAndSignoff = "Beckett hand wrote this letter and initialed his name."
            }
            else if (this.state.letter[10]['Autograph or Typed'] === 'A' && this.state.letter[10]['initialed or signed'] === 'S') {
                formatAndSignoff = "Beckett hand wrote this letter and signed his name."
            }
            else if (this.state.letter[10]['Autograph or Typed'] === 'T' && this.state.letter[10]['initialed or signed'] === '') {
                formatAndSignoff = "Beckett typed this letter."
            }
            else if (this.state.letter[10]['Autograph or Typed'] === 'T' && this.state.letter[10]['initialed or signed'] === 'I') {
                formatAndSignoff = "Beckett typed this letter and signed his name."
            }
            else if (this.state.letter[10]['Autograph or Typed'] === 'T' && this.state.letter[10]['initialed or signed'] === 'S') {
                formatAndSignoff = "Beckett typed this letter and signed his name."
            }
            else if (this.state.letter[10]['Autograph or Typed'] === '' && this.state.letter[10]['initialed or signed'] === 'I') {
                formatAndSignoff = "Beckett initialed his name."
            }
            else if (this.state.letter[10]['Autograph or Typed'] === '' && this.state.letter[10]['initialed or signed'] === 'S') {
                formatAndSignoff = "Beckett signed his name."
            }
            //
            let leavesAndSides;
            let leavesNo = this.state.letter[10]['leaves'];
            let sidesNo = this.state.letter[10]['sides'];
            if (this.state.letter[10]['leaves'] === '' && this.state.letter[10]['sides'] === '') {
                leavesAndSides = null
            }
            else if (this.state.letter[10]['leaves'] === '' && this.state.letter[10]['sides'] === !'') {
                leavesAndSides = 'This letter has {sides} sides.'
            }
            else if (this.state.letter[10]['leaves'] === !'' && this.state.letter[10]['sides'] === '') {
                leavesAndSides = 'This letter has {leaves} leaves.'
            }
            else leavesAndSides = 'This letter has ' + leavesNo + ' leave(s) and ' + sidesNo + ' side(s).'
            // it has {leaves} leaves and {sides} sides
            //  
            // this letter can be found at {first repository}
            // in the {first collection}
            // 
            // 
            // 
            return (
                <div>
                    <Row>
                        <h2>Letter from Samuel Beckett to {this.state.letter[10]['Reg. recipient']} on {this.state.letter[10].Day}/{this.state.letter[10].Month}/{this.state.letter[10].Year}</h2>
                    </Row>
                    <Row>
                        <ProfileLite personId="9a304912-c851-436a-ae20-e72e73f92397" />
                    </Row>
                    <Row>
                        <Col md={12} className='letterPgDetails'>


                            <div className='letterInfo'>
                                <h4>Information about this letter:</h4>
                                <h5>This letter was written at:</h5>
                                <p>{this.state.letter[10]['Reg. Place written']}</p>
                                <p>{this.state.letter[10]['Reg. Place written city']}, {this.state.letter[10]['Reg. Place written country']}</p>
                                <h5>Beckett addressed it from:</h5>
                                <p>{this.state.letter[10]['Addressed from (Actual)']}</p>
                                <h5>{formatAndSignoff}</h5>
                                <h5>{leavesAndSides}</h5>

                            </div>
                            <h5>Postcard Image</h5>
                            <p>{this.state.letter[10]['Postcard Image']}</p>

                        </Col>
                    </Row>
                </div>
            )
        }
    }
}

export default LetterPg;