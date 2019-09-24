import React, { Component } from "react";
import {Link, withRouter} from 'react-router-dom';
import axios from "axios";


class Sidebar extends Component {
  constructor(props, context) {
      super(props, context);
  }

  componentDidMount() {
  }


  render() {
      return (
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">
            Samuel Beckett Letters
           </div>
          <div className="list-group list-group-flush">
            <a href="#" className="list-group-item list-group-item-action bg-light">Letters</a>
            <a href="#" className="list-group-item list-group-item-action bg-light">Places</a>
            <a href="#" className="list-group-item list-group-item-action bg-light">People</a>
            <a href="#" className="list-group-item list-group-item-action bg-light">Productions</a>
            <a href="#" className="list-group-item list-group-item-action bg-light">Chronology</a>
            <a href="/browse-letters" activekey="people" className="list-group-item list-group-item-action bg-light">Advanced Search</a>
          </div>
          <div className="credits">
            <p className="small">Beckett Letters is supported by Emory University LITS and Emory University Center for Digital Scholarship</p>
          </div>
        </div>
      )
    }
  }

export default withRouter(Sidebar);
