import axios from "axios";
import DocMetaBuilder from './utilities/DocMetaBuilder';
import React, { Component } from "react";
import RepositoryQuickGlance from './RepositoryQuickGlance';
import QuickGlance from './QuickGlance';


export class LetterDetails extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      isLoaded: false,
      letter: [],
      letterRecipients: [],
      entitiesMentioned: []
    };
  }

  getData() {
    axios.all([
      axios.get(this.props.apiUrl + '/letters/' + this.props.match.params.id)])
      .then(axios.spread((getEntityList) => {
        const letter = getEntityList.data.data;
        console.log(letter)
        const placesWritten = getEntityList.data.data.relationships['places-written'].data
        const letterRecipients = getEntityList.data.data.attributes.recipients
        const entitiesMentioned = getEntityList.data.data.attributes['entities-mentioned-list']
        const attributes = getEntityList.data.data.attributes
        this.setState({ letter, placesWritten, attributes, letterRecipients, entitiesMentioned });
        this.setState({ isLoaded: true })
      }))
      .catch((err) => {
        this.setState({ isLoaded: false });
        this.setState({ error: err.message });
      });
  }



  componentDidMount() {
    this.getData()
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  getPhysicalDescription() {
    var physicalDescription = '';
    if (this.state.letter.attributes['typed']) {
      physicalDescription += 'T'
    }
    else {
      physicalDescription += 'A'
    }
    physicalDescription += this.state.letter.attributes['physical-desc'];
    if (this.state.letter.attributes['signed']) {
      physicalDescription += 'S'
    }
    else {
      physicalDescription += 'I'
    }
    physicalDescription += '; '
    if (this.state.letter.attributes['leaves']) {
      physicalDescription += this.state.letter.attributes['leaves'] + ' leaf,'
    }
    if (this.state.letter.attributes['sides']) {
      physicalDescription += this.state.letter.attributes['sides'] + ' side'
    }

    return physicalDescription;
  }

  render() {
    const { error, isLoaded } = this.state;
    // if there is an error
    if (!error & isLoaded) {
      let metaBuild = {
        title: this.state.letter.attributes['formatted-date'],
        desc: `letter to ${this.state.letter.attributes['recipient-list']}`
      }
      return (
        <div className="details">
          <DocMetaBuilder {...metaBuild} />
          <h1>Letter To: {this.state.letter.attributes['recipient-list']} ({this.state.letter.attributes['formatted-date']})</h1>
          <div className="panel">
            <h2>Information About This Letter</h2>
            <table className="table table-striped">
              <tbody>
                {this.state.letter.attributes['addressed-from'] ? <tr><td>Addressed From:</td><td> <span className="value">{this.state.letter.attributes['addressed-from']}</span></td></tr> : null}
                {this.state.letter.attributes['addressed-to'] ? <tr><td>Addressed To:</td><td><span dangerouslySetInnerHTML={{ __html: this.state.letter.attributes['addressed-to'] }} /></td></tr> : null}
                <tr><td>Envelope: </td>{this.state.letter.attributes['envelope'] ? <td>E</td> : <td></td>}</tr>
                {this.state.letter.attributes['letter-publisher'] ? <tr><td>Letter Publisher:</td><td> {this.state.letter.attributes['letter-publisher']}</td></tr> : null}
                {this.state.letter.attributes['notes'] ? <tr><td>Notes:</td><td> {this.state.letter.attributes['notes']}</td></tr> : null}
                <tr><td>Physical Description:</td>
                  <td>{this.getPhysicalDescription()} </td></tr>
                {this.state.letter.attributes['physical-detail'] ? <tr><td>Physical Detail: </td><td>{this.state.letter.attributes['physical-detail']}</td></tr> : null}
                {this.state.letter.attributes['physical-notes'] ? <tr><td>Physical Notes:</td><td> {this.state.letter.attributes['physical-notes']}</td></tr> : null}
                {this.state.letter.attributes['postcard-image'] ? <tr><td>Postcard Image: </td><td>{this.state.letter.attributes['postcard-image']}</td></tr> : null}
                {this.state.letter.attributes['postmark'] ? <tr><td>Postmark: </td><td>{this.state.letter.attributes['postmark']}</td></tr> : null}
                <tr>
                  <td>Recipient{this.state.letter.attributes.recipients.length > 1 ? 's' : null}:</td>
                  <td>
                    {this.state.letter.attributes.recipients.map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} type='nolink' />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Repository:</td>
                  <td>
                    {this.state.letter.relationships.repositories.data.map((respository) =>
                      <RepositoryQuickGlance apiUrl={this.props.apiUrl} id={respository.id} key={respository.id} type='nolink' />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Place Written:</td>
                  <td>
                    {this.state.letter.relationships['places-written'].data.map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} type='nolink' />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Production{this.state.entitiesMentioned['production'].length > 1 ? 's' : null} Mentioned:</td>
                  <td>
                    {this.state.entitiesMentioned['production'].map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Attendance Mentioned:</td>
                  <td>
                    {this.state.entitiesMentioned['attendance'].map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Music Mentioned:</td>
                  <td>
                    {this.state.entitiesMentioned['music'].map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Organization{this.state.entitiesMentioned['organization'].length > 1 ? 's' : null} Mentioned:</td>
                  <td>
                    {this.state.entitiesMentioned['organization'].map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>People Mentioned:</td>
                  <td>
                    {this.state.entitiesMentioned['person'].map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Place{this.state.entitiesMentioned['place'].length > 1 ? 's' : null} Mentioned:</td>
                  <td>
                    {this.state.entitiesMentioned['place'].map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Event{this.state.entitiesMentioned['public-event'].length > 1 ? 's' : null} Mentioned:</td>
                  <td>
                    {this.state.entitiesMentioned['public-event'].map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Publication{this.state.entitiesMentioned['public-event'].length > 1 ? 's' : null} Mentioned:</td>
                  <td>
                    {this.state.entitiesMentioned['publication'].map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Reading Mentioned:</td>
                  <td>
                    {this.state.entitiesMentioned['reading'].map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Translating Mentioned:</td>
                  <td>
                    {this.state.entitiesMentioned['translating'].map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Work{this.state.entitiesMentioned['work-of-art'].length > 1 ? 's' : null} of Art Mentioned:</td>
                  <td>
                    {this.state.entitiesMentioned['work-of-art'].map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Writing Mentioned:</td>
                  <td>
                    {this.state.entitiesMentioned['writing'].map((entity) =>
                      <QuickGlance apiUrl={this.props.apiUrl} id={entity.id} apiUrlExtender='entities' key={entity.id} />
                    )}
                  </td>
                </tr>

              </tbody>
            </table>
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
