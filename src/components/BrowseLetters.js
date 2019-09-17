import React, { Component } from "react";
import { Container, Tabs, Tab } from 'react-bootstrap';
import axios from "axios";
import LettersByPeopleMentioned from './LettersByPeopleMentioned';
import LettersByPlacesMentioned from './LettersByPlacesMentioned';

class BrowseLetters extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
          error: null,
          isLoaded: false,
          componentName: '',
          activeKey: 'people'
      };
  }

  componentDidMount() {
    this.setState({ activeKey: this.props.location.state.activeKey }, () => {
      console.log(this.state.activeKey);
      this.setState({isLoaded:true})
    });
  }

  render() {
      return (
        <Container>
          <h1>Browse Letters by <span className="active-key">{this.state.activeKey}</span> Mentioned</h1>
          {this.state.isLoaded ?
          <Tabs defaultActiveKey={this.state.activeKey} id="uncontrolled-tab-example">
            <Tab eventKey="people" title="People">
              <LettersByPeopleMentioned/>
            </Tab>
            <Tab eventKey="places" title="Places">
              <LettersByPlacesMentioned />
            </Tab>
            <Tab eventKey="organization" title="Organization">
              <div>Organization</div>
            </Tab>
          </Tabs>
          : null}
        </Container>
      )
    }
  }

export default BrowseLetters;
