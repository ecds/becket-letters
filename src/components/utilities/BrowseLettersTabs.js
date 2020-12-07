import { Link } from 'react-router-dom';
import HeaderBuilder from './HeaderBuilder';
import React, { Component } from "react";

class BrowseLettersTabs extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      isLoaded: false,
      activeTab: ''
    };
    this.setActive = this.setActive.bind(this);
    this.changeEntityType = this.changeEntityType.bind(this);
  }

  changeEntityType = (e) => {
    var activeTab = e.target.id
    this.props.action(activeTab)
    this.setState(() => {
      return { activeTab: activeTab }
    })
  }

  setActive(t) {
    if (t === this.props.active) {
      return 'active'
    }
  }

  render() {
    return (
      <div className="pt-3">
        <HeaderBuilder header='Browse Letters Mentioned' type='string' />
        <ul className="nav nav-tabs" id="browse-tabs">
          <li className={this.setActive('by-attendance')}><Link to="/browse-letters-attendance" id='attendance' onClick={this.changeEntityType}>Attendance</Link></li>
          <li className={this.setActive('by-music')}><Link to="/browse-letters-music" id='music' onClick={this.changeEntityType}>Music</Link></li>
          <li className={this.setActive('by-organization')}><Link to="/browse-letters-organization" id='organization' onClick={this.changeEntityType}>Organization</Link></li>
          <li className={this.setActive('by-person')}><Link to="/browse-letters-person" id='person' onClick={this.changeEntityType}>Person</Link></li>
          <li className={this.setActive('by-place')}><Link to="/browse-letters-place" id='place' onClick={this.changeEntityType}>Place</Link></li>
          <li className={this.setActive('by-production')}><Link to="/browse-letters-production" id='production' onClick={this.changeEntityType}>Production</Link></li>
          <li className={this.setActive('by-public-event')}><Link to="/browse-letters-public-event" id='public-event' onClick={this.changeEntityType}>Public Event</Link></li>
          <li className={this.setActive('by-publication')}><Link to="/browse-letters-publication" id='publication' onClick={this.changeEntityType}>Publication</Link></li>
          <li className={this.setActive('by-reading')}><Link to="/browse-letters-reading" id='reading' onClick={this.changeEntityType}>Reading</Link></li>
          <li className={this.setActive('by-Translating')}><Link to="/browse-letters-Translating" id='Translating' onClick={this.changeEntityType}>Translating</Link></li>
          <li className={this.setActive('by-work-of-art')}><Link to="/browse-letters-work-of-art" id='work-of-art' onClick={this.changeEntityType}>Work of Art</Link></li>
          <li className={this.setActive('by-writing')}><Link to="/browse-letters-writing" id='writing' onClick={this.changeEntityType}>Writing</Link></li>
          <li className={this.setActive('by-repositories')}><Link to="/browse-letters-repositories" id='repositories' onClick={this.changeEntityType}>Repository</Link></li>
        </ul>

      </div>
    )
  }
}

export default BrowseLettersTabs;
