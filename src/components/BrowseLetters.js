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
            <li className={this.setActive('by-places')}><a href="/browse-letters/places">By Places</a></li>
            <li className={this.setActive('by-people')}><a href="/browse-letters/people">By People</a></li>
            <li className={this.setActive('by-organization')}><a href="/browse-letters/organizations">By Organizations</a></li>
            <li className={this.setActive('by-production')}><a href="/browse-letters/productions">By Productions</a></li>
          </ul>

        </div>
      )
    }
  }

export default BrowseLetters;
