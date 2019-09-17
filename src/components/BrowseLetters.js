import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import axios from "axios";
import BrowseLettersByIndexTabs from './BrowseLettersByIndexTabs';

class BrowseLetters extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
          error: null,
          isLoaded: false,
          componentName: ''
      };
  }

  render() {
      return (
        <Container>
          <h1>Browse by {this.state.componentName} Mentioned</h1>
          <BrowseLettersByIndexTabs />
        </Container>
      )
    }
  }

export default BrowseLetters;
