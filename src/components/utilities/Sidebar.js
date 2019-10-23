import React, { Component } from "react";
import {Link, withRouter} from 'react-router-dom';
import axios from "axios";


class Sidebar extends Component {
  constructor(props, context) {
      super(props, context);
  }

  render() {
      return (
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">
            Samuel Beckett Letters
           </div>
          <div className="list-group list-group-flush">
            <a href="/" className="list-group-item list-group-item-action bg-light">Home</a>
            <a href="/timeline" className="list-group-item list-group-item-action bg-light">Chronology</a>
            <a href="/browse-letters/places" className="list-group-item list-group-item-action bg-light">Letters by Places</a>
            <a href="/browse-letters/people" className="list-group-item list-group-item-action bg-light">Letters by People</a>
            <a href="/browse-letters/productions" className="list-group-item list-group-item-action bg-light">Letters by Productions</a>
            <a href="/browse-letters/organizations" className="list-group-item list-group-item-action bg-light">Letters by Organizations</a>
            <a href="/browse-letters/publications" className="list-group-item list-group-item-action bg-light">Letters by Publications</a>
            <a href="/browse-letters/music" className="list-group-item list-group-item-action bg-light">Letters by Music</a>
            <a href="/browse-letters/readings" className="list-group-item list-group-item-action bg-light">Letters by Reading</a>
            <a href="/browse-letters/writings" className="list-group-item list-group-item-action bg-light">Letters by Writings</a>
            <a href="/browse-letters/translations" className="list-group-item list-group-item-action bg-light">Letters by Translations</a>
            <a href="/browse-letters/attendance" className="list-group-item list-group-item-action bg-light">Letters by Attendance</a>
            <a href="/browse-letters/works_of_art" className="list-group-item list-group-item-action bg-light">Letters by Works of Art</a>
            <a href="/browse-letters/public_events" className="list-group-item list-group-item-action bg-light">Letters by Public Events</a>

          </div>
          <div className="credits">
            <p className="small">Beckett Letters is supported by Emory University LITS and Emory University Center for Digital Scholarship</p>
          </div>
        </div>
      )
    }
  }

export default withRouter(Sidebar);
