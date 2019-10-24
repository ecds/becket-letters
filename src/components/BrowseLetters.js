import DocumentMeta from 'react-document-meta';
import LettersByPeopleMentioned from './LettersByPeopleMentioned';
import LettersByPlacesMentioned from './LettersByPlacesMentioned';
import LettersByOrganizationsMentioned from './LettersByOrganizationsMentioned';
import LettersByProductionsMentioned from './LettersByProductionsMentioned';
import { Link } from 'react-router-dom';
import React, { Component } from "react";
import { Tabs, Tab } from 'react-bootstrap';

const meta = {
  title: 'Browse Letters',
  description: `Browse all letters on this page`,
};

class BrowseLetters extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      isLoaded: false
    };
    this.setActive = this.setActive.bind(this);
  }

  setActive(t) {
    if (t == this.props.active) {
      return 'active'
    }
  }

  render() {
    return (
      <div className="pt-3">
        <DocumentMeta {...meta} />
        <h1>Browse Letters by Entities Mentioned</h1>
        <ul className="nav nav-tabs" id="browse-tabs">
          <li className={this.setActive('by-places')}>
            <Link to='/browse-letters-places'>Places</Link>
          </li>
          <li className={this.setActive('by-people')}><Link to="/browse-letters-people">People</Link></li>
          <li className={this.setActive('by-organization')}><Link to="/browse-letters-organizations">Organizations</Link></li>
          <li className={this.setActive('by-production')}><Link to="/browse-letters-productions">Productions</Link></li>
          <li className={this.setActive('by-publication')}><Link to="/browse-letters-publications">Publications</Link></li>
          <li className={this.setActive('by-music')}><Link to="/browse-letters/-music">Music</Link></li>
          <li className={this.setActive('by-reading')}><Link to="/browse-letters/-readings">Readings</Link></li>
          <li className={this.setActive('by-writing')}><Link to="/browse-letters-writings">Writings</Link></li>
          <li className={this.setActive('by-translations')}><Link to="/browse-letters-translations">Translations</Link></li>
          <li className={this.setActive('by-attendance')}><Link to="/browse-letters-attendance">Attendance</Link></li>
          <li className={this.setActive('by-works-of-art')}><Link to="/browse-letters-works_of_art">Works of Art</Link></li>
          <li className={this.setActive('by-public-events')}><Link to="/browse-letters-public_events">Public Events</Link></li>
        </ul>

      </div>
    )
  }
}

export default BrowseLetters;
