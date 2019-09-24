import React, { Component } from "react";
import { Container, Tabs, Tab } from 'react-bootstrap';
import axios from "axios";
import LettersByPeopleMentioned from './LettersByPeopleMentioned';
import LettersByPlacesMentioned from './LettersByPlacesMentioned';
import LettersByOrganizationsMentioned from './LettersByOrganizationsMentioned';
import LettersByProductionsMentioned from './LettersByProductionsMentioned';

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
    if (Object.prototype.hasOwnProperty.call(this.props, 'location')) {
      if (Object.prototype.hasOwnProperty.call(this.props.location, 'state')) {
        if (this.props.location.state != undefined) {
          this.setState({ activeKey: this.props.location.state.activeKey }, () => {
            console.log(this.state.activeKey);
            this.setState({isLoaded:true})
          });
        }
        else {
          this.setState({ activeKey: 'people' })
          this.setState({isLoaded:true})
        }
      }
      else {
        this.setState({ activeKey: 'people' })
        this.setState({isLoaded:true})
      }
    }
    else {
      this.setState({ activeKey: 'people' })
      this.setState({isLoaded:true})
    }
  }

  render() {
      return (
        <div className='main-content'>
          <h1>Browse Letters by Entities Mentioned</h1>
          {this.state.isLoaded ?
          <Tabs defaultActiveKey={this.state.activeKey} id="uncontrolled-tab-example">
            <Tab eventKey="people" title="People">
              <LettersByPeopleMentioned/>
            </Tab>
            <Tab eventKey="places" title="Places">
              <LettersByPlacesMentioned />
            </Tab>
            <Tab eventKey="organizations" title="Organization">
              <LettersByOrganizationsMentioned/>
            </Tab>
            <Tab eventKey="productions" title="Productions">
              <LettersByProductionsMentioned/>
            </Tab>
          </Tabs>
          : null}
        </div>
      )
    }
  }

export default BrowseLetters;
