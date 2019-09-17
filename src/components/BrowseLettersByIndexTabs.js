import React, { Component } from "react";
import { Container, Tabs, Tab, Sonnet } from 'react-bootstrap';
import axios from "axios";
import LettersByPeopleMentioned from './LettersByPeopleMentioned';
import LettersByPlacesMentioned from './LettersByPlacesMentioned';

class BrowseLettersByIndexTabs extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
          error: null,
          isLoaded: false,
          activeKey: 'people'
      };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
      return (
        <Tabs defaultActiveKey={this.state.activeKey} id="uncontrolled-tab-example">
          <Tab eventKey="people" title="People">
            <LettersByPeopleMentioned props="People"/>
          </Tab>
          <Tab eventKey="places" title="Places">
            <LettersByPlacesMentioned />
          </Tab>
          <Tab eventKey="organization" title="Organization">
            <div>Organization</div>
          </Tab>
        </Tabs>
      )
    }
  }

export default BrowseLettersByIndexTabs;
