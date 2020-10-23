import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class QuickGlance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: '',
      entityData: [],
      localURLExtension: '',
      typeLabel: ''
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios.all([
      axios.get(this.props.apiUrl + '/entities/' + this.props.id)])
      .then(axios.spread((getData) => {
        const entityData = getData.data.data;
        this.setState({ entityData });
        this.getLocalURLExtender();
        this.setState({ isLoaded: true })
      }))
      .catch((err) => {
        this.setState({ isLoaded: false });
        this.setState({ error: err.message });
      });
  }

  getLifeDates() {
    if (this.state.entityData.attributes.properties != null) {
      return ' (' + this.state.entityData.attributes.properties['life-dates'] + ')'
    }
    else {
      return false
    }
  }

  getLocalURLExtender() {
    this.setState({ typeLabel: this.state.entityData.attributes['type-label'] })
    if (this.state.typeLabel === 'Place') {
      this.setState({ localURLExtension: '/places/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Production') {
      this.setState({ localURLExtension: '/productions/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Reading') {
      this.setState({ localURLExtension: '/readings/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Music') {
      this.setState({ localURLExtension: '/music/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Organization') {
      this.setState({ localURLExtension: '/organizations/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Attendance') {
      this.setState({ localURLExtension: '/attendance/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Public Event') {
      this.setState({ localURLExtension: '/events/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Publication') {
      this.setState({ localURLExtension: '/publications/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Writing') {
      this.setState({ localURLExtension: '/writings/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Translating') {
      this.setState({ localURLExtension: '/translating/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Work Of Art') {
      this.setState({ localURLExtension: '/work-of-art/' + this.state.entityData.id })
    }
    else {
      this.setState({ localURLExtension: '/people/' + this.state.entityData.id })
    }
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
      if (this.props.type === 'nolink') {
        return (
          <p className="listLink">
            <span dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} />
            {this.state.typeLabel === 'Person' ? this.getLifeDates() : null}
            {this.state.typeLabel === 'Production' ?
              <span dangerouslySetInnerHTML={{ __html: ' (' + this.state.entityData.attributes.properties['city'] + '; ' + this.state.entityData.attributes.properties['date'] + ')' }} />
              : null}
          </p>
        )
      }
      else {
        return (
          <Link to={this.state.localURLExtension} className="listLink">
            <span dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} />
            {this.state.typeLabel === 'Person' ? this.getLifeDates() : null}
            {this.state.typeLabel === 'Production' ?
              <span dangerouslySetInnerHTML={{
                __html:
                  ' ('
                  + `${this.state.entityData.attributes.properties['city'] ? `${this.state.entityData.attributes.properties['city']}; ` : ``}`
                  + `${this.state.entityData.attributes.properties['date'] ? `${this.state.entityData.attributes.properties['date']}` : ``}`
                  + `${this.state.entityData.attributes.properties['director'] ? `, dir. ${this.state.entityData.attributes.properties['director']}` : ``}`
                  + `${this.state.entityData.attributes.properties['theatre'] ? `, shown at ${this.state.entityData.attributes.properties['theatre']}` : ``}`
                  + ')'
              }} />
              : null}
          </Link>
        )
      }
    }
  }
}

export default QuickGlance;
