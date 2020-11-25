import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setAttendanceLabel, setMusicLabel, setOrganizationLabel, setPersonLabel, setPlaceLabel, setProductionLabel, setEventLabel, setPublicationLabel, setReadingLabel, setRepositoryLabel, setTranslatingLabel, setWorkOfArtLabel, setWritingLabel } from './utilities/EntityStringBuilder.js';


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
    if (this.state.typeLabel === 'Attendance') {
      this.setState({ localURLExtension: '/attendance/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Music') {
      this.setState({ localURLExtension: '/music/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Organization') {
      this.setState({ localURLExtension: '/organization/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Place') {
      this.setState({ localURLExtension: '/place/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Production') {
      this.setState({ localURLExtension: '/production/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Public Event') {
      this.setState({ localURLExtension: '/public-event/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Publication') {
      this.setState({ localURLExtension: '/publication/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Reading') {
      this.setState({ localURLExtension: '/reading/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Translating') {
      this.setState({ localURLExtension: '/translating/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Work Of Art') {
      this.setState({ localURLExtension: '/work-of-art/' + this.state.entityData.id })
    }
    else if (this.state.typeLabel === 'Writing') {
      this.setState({ localURLExtension: '/writing/' + this.state.entityData.id })
    }
    else {
      this.setState({ localURLExtension: '/people/' + this.state.entityData.id })
    }
  };

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
      if (this.state.entityData.attributes['type-label'] === 'Attendance') {
        let label = setAttendanceLabel(this.state.entityData);
        if (this.props.typeLabel === 'nolink') {
          return (<p className="listLink">{label}</p>)
        }
        else {
          return (<Link to={this.state.localURLExtension} className="listLink">{label}</Link>)
        }
      }
      if (this.state.entityData.attributes['type-label'] === 'Music') {
        let label = setMusicLabel(this.state.entityData);
        if (this.props.typeLabel === 'nolink') {
          return (
            <p className="listLink">{label}</p>
          )
        }
        else {
          return (
            <Link to={this.state.localURLExtension} className="listLink">{label}</Link>
          )
        }
      }
      if (this.state.entityData.attributes['type-label'] === 'Organization') {
        let label = setOrganizationLabel(this.state.entityData);
        if (this.props.typeLabel === 'nolink') {
          return (
            <p className="listLink">{label}</p>
          )
        }
        else {
          return (
            <Link to={this.state.localURLExtension} className="listLink">{label}</Link>
          )
        };
      };
      if (this.state.entityData.attributes['type-label'] === 'Person') {
        let label = setPersonLabel(this.state.entityData);
        if (this.props.typeLabel === 'nolink') {
          return (
            <p className="listLink">{label}</p>
          )
        }
        else {
          return (
            <Link to={this.state.localURLExtension} className="listLink">{label}</Link>
          )
        }
      }
      if (this.state.entityData.attributes['type-label'] === 'Place') {
        let label = setPlaceLabel(this.state.entityData);
        if (this.props.typeLabel === 'nolink') {
          return (
            <p className="listLink">{label}</p>
          )
        }
        else {
          return (
            <Link to={this.state.localURLExtension} className="listLink">{label}</Link>
          )
        }
      }
      if (this.state.entityData.attributes['type-label'] === 'Production') {
        let label = setProductionLabel(this.state.entityData);
        if (this.props.typeLabel === 'nolink') {
          return (
            <p className="listLink">{label}</p>
          )
        }
        else {
          return (
            <Link to={this.state.localURLExtension} className="listLink">{label}</Link>
          )
        }
      }
      if (this.state.entityData.attributes['type-label'] === 'Public Event') {
        let label = setEventLabel(this.state.entityData);
        if (this.props.typeLabel === 'nolink') {
          return (
            <p className="listLink">{label}</p>
          )
        }
        else {
          return (
            <Link to={this.state.localURLExtension} className="listLink">{label}</Link>
          )
        }
      }
      if (this.state.entityData.attributes['type-label'] === 'Publication') {
        let label = setPublicationLabel(this.state.entityData);
        if (this.props.typeLabel === 'nolink') {
          return (
            <p className="listLink">{label}</p>
          )
        }
        else {
          return (
            <Link to={this.state.localURLExtension} className="listLink">{label}</Link>
          )
        }
      }
      if (this.state.entityData.attributes['type-label'] === 'Reading') {
        let label = setReadingLabel(this.state.entityData);
        if (this.props.typeLabel === 'nolink') {
          return (
            <p className="listLink">{label}</p>
          )
        }
        else {
          return (
            <Link to={this.state.localURLExtension} className="listLink">{label}</Link>
          )
        }
      }
      if (this.state.entityData.attributes['type-label'] === 'Repository') {
        let label = setRepositoryLabel(this.state.entityData);
        if (this.props.typeLabel === 'nolink') {
          return (
            <p className="listLink">{label}</p>
          )
        }
        else {
          return (
            <Link to={this.state.localURLExtension} className="listLink">{label}</Link>
          )
        }
      }
      if (this.state.entityData.attributes['type-label'] === 'Translating') {
        let label = setTranslatingLabel(this.state.entityData);
        if (this.props.typeLabel === 'nolink') {
          return (
            <p className="listLink">{label}</p>
          )
        }
        else {
          return (
            <Link to={this.state.localURLExtension} className="listLink">{label}</Link>
          )
        }
      }
      if (this.state.entityData.attributes['type-label'] === 'Work-of-Art') {
        let label = setWorkOfArtLabel(this.state.entityData);
        if (this.props.typeLabel === 'nolink') {
          return (
            <p className="listLink">{label}</p>
          )
        }
        else {
          return (
            <Link to={this.state.localURLExtension} className="listLink">{label}</Link>
          )
        }
      }
      if (this.state.entityData.attributes['type-label'] === 'Writing') {
        let label = setWritingLabel(this.state.entityData);
        if (this.props.typeLabel === 'nolink') {
          return (
            <p className="listLink">{label}</p>
          )
        }
        else {
          return (
            <Link to={this.state.localURLExtension} className="listLink">{label}</Link>
          )
        }
      }
      else {
        return (
          'no fx yet'
        )
      }
    }
  }
}

export default QuickGlance;