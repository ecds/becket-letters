import React, { Component } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import axios from "axios";
import Moment from 'react-moment';
import PlaceCard from './PlaceCard';
import ProfileCard from './ProfileCard';
import EntitiesMentioned from './EntitiesMentioned';


export class LetterDetails extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: null,
            isLoaded: false,
            letter: [],
            placesWritten: [],
            includedFields: ['addressed-from', 'code'],
            attributes: [],
            letterRecipients: [],
            entitiesMentioned: []
        };
    }



    componentDidMount() {
        axios.all([
            axios.get('http://ot-api.ecdsdev.org/letters/'+this.props.match.params.letterId)])
            .then(axios.spread((getEntityList) => {
                const letter = getEntityList.data.data;
                const placesWritten = getEntityList.data.data.relationships['places-written'].data
                const letterRecipients = getEntityList.data.data.attributes.recipients
                const entitiesMentioned = getEntityList.data.data.relationships['entities-mentioned'].data
                const attributes = getEntityList.data.data.attributes
                this.setState({ letter, placesWritten, attributes, letterRecipients, entitiesMentioned });
                this.setState({ isLoaded: true })
            }))
            .catch((err) => {
                this.setState({ isLoaded: false });
                this.setState({ error: err.message });
            });
    }

    showEntitiesMentioned() {
      const entitiesMentioned = this.state.entitiesMentioned.map((entity) =>
        <Col sm={3} className=" d-flex align-items-stretch"><EntitiesMentioned id={entity.id} /></Col>
      )
      return entitiesMentioned
    }





    render() {
        const PlacesWritten = this.state.placesWritten.map((place) =>
          <Col sm={4} className=" d-flex align-items-stretch"><PlaceCard placeId={place.id} key={place.id}/></Col>
        )
        const Recipients = this.state.letterRecipients.map((recipient) =>
          <Col sm={4} className=" d-flex align-items-stretch"><ProfileCard personId={recipient.id} key={recipient.id} /></Col>
        )

        const { error, isLoaded } = this.state;
        // if there is an error
        if (!error & isLoaded) {
          return (
            <div className="letter-details">
              <h1>Letter To: {this.state.letter.attributes['recipient-list']}(<Moment format="DD MMM YYYY">{this.state.letter.attributes.date}</Moment>)</h1>
              <div className="panel">
              <h2>Information About This Letter</h2>
              <table className="table table-striped">
              {this.state.letter.attributes['addressed-from'] ? <tr><td>Addressed From:</td><td> <span className="value">{this.state.letter.attributes['addressed-from']}</span></td></tr> : null }
              {this.state.letter.attributes['addressed-to'] ? <tr><td>Addressed To:</td><td> {this.state.letter.attributes['addressed-to']}</td></tr> : null }
              {this.state.letter.attributes['code'] ? <tr><td>Code: </td><td>{this.state.letter.attributes['code']}</td></tr> : null }
              {this.state.letter.attributes['envelope'] ? <tr><td>Envelope: </td><td>{this.state.letter.attributes['envelope']}</td></tr> : null }
              {this.state.letter.attributes['leaves'] ? <tr><td>Leaves:</td><td> {this.state.letter.attributes['leaves']}</td></tr> : null }
              {this.state.letter.attributes['letter-publisher'] ? <tr><td>Letter Publisher:</td><td> {this.state.letter.attributes['letter-publisher']}</td></tr> : null }
              {this.state.letter.attributes['notes'] ? <tr><td>Notes:</td><td> {this.state.letter.attributes['notes']}</td></tr> : null }
              {this.state.letter.attributes['physical-desc'] ? <tr><td>Physical Description:</td><td> {this.state.letter.attributes['physical-desc']}</td></tr> : null }
              {this.state.letter.attributes['physical-detail'] ? <tr><td>Physical Detail: </td><td>{this.state.letter.attributes['physical-detail']}</td></tr> : null }
              {this.state.letter.attributes['physical-notes'] ? <tr><td>Physical Notes:</td><td> {this.state.letter.attributes['physical-notes']}</td></tr> : null }
              {this.state.letter.attributes['postcard-image'] ? <tr><td>Postcard Image: </td><td>{this.state.letter.attributes['postcard-image']}</td></tr> : null }
              {this.state.letter.attributes['postmark'] ? <tr><td>Postmark: </td><td>{this.state.letter.attributes['postmark']}</td></tr> : null }
              {this.state.letter.attributes['sides'] ? <tr><td>Sides: </td><td>{this.state.letter.attributes['sides']}</td></tr> : null }
              {this.state.letter.attributes['signed'] ? <tr><td>Signed:</td><td> Yes </td></tr> : <tr><td>Signed:</td><td> No </td></tr> }
              {this.state.letter.attributes['typed'] ? <tr><td>Typed:</td><td> Yes </td></tr> : <tr><td>Typed:</td><td> No</td></tr>}
              {this.state.letter.attributes['verified'] ? <tr><td>Verified:</td><td> Yes</td></tr> : <tr><td>Verified:</td><td> No</td></tr> }
              </table>
              </div>
              <div>
                <div className="panel">
                <h2>Recipients</h2>
                  <Row>
                    {Recipients}
                  </Row>
                </div>
                <div className="panel">
                <h2>Places Written</h2>
                  <Row>
                    {PlacesWritten}
                  </Row>
                </div>
                <div className="panel">
                <h2>Entities Mentioned</h2>
                <Row>
                  {this.showEntitiesMentioned()}
                </Row>
                </div>

              </div>
            </div>
          )
        }
        else {
          return null
        }
    }
}

export default LetterDetails;
