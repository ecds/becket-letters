import React, { Component } from "react";
import { Tabs, Tab } from 'react-bootstrap';
import LettersByPeopleMentioned from './LettersByPeopleMentioned';
import LettersByPlacesMentioned from './LettersByPlacesMentioned';
import LettersByOrganizationsMentioned from './LettersByOrganizationsMentioned';
import LettersByProductionsMentioned from './LettersByProductionsMentioned';

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
          <h1>Browse Letters by Entities Mentioned</h1>
          <ul className="nav nav-tabs" id="browse-tabs">
            <li className={this.setActive('by-places')}><a href="/browse-letters/places">Places</a></li>
            <li className={this.setActive('by-people')}><a href="/browse-letters/people">People</a></li>
            <li className={this.setActive('by-organization')}><a href="/browse-letters/organizations">Organizations</a></li>
            <li className={this.setActive('by-production')}><a href="/browse-letters/productions">Productions</a></li>
            <li className={this.setActive('by-publication')}><a href="/browse-letters/publications">Publications</a></li>
            <li className={this.setActive('by-music')}><a href="/browse-letters/music">Music</a></li>
            <li className={this.setActive('by-reading')}><a href="/browse-letters/readings">Readings</a></li>
            <li className={this.setActive('by-writing')}><a href="/browse-letters/writing">Writings</a></li>
            <li className={this.setActive('by-translations')}><a href="/browse-letters/translations">Translations</a></li>
            <li className={this.setActive('by-attendance')}><a href="/browse-letters/attendance">Attendance</a></li>
            <li className={this.setActive('by-works-of-art')}><a href="/browse-letters/works_of_art">Works of Art</a></li>
            <li className={this.setActive('by-public-events')}><a href="/browse-letters/public_events">Public Events</a></li>








          </ul>

        </div>
      )
    }
  }

export default BrowseLetters;
