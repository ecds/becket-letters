import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Route } from "react-router-dom";
import Breadcrumbs  from 'react-router-dynamic-breadcrumbs';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Landing from './components/Landing';
import People from './components/people';
import Letters from './components/letters';
import BrowseLetters from './components/BrowseLetters';
import Header from './components/header';
import LetterDetails from './components/LetterDetails';
import Timeline from './components/Timeline';
import Places from './components/Places';
import Place from './components/Place';
import Profile from './components/Profile';
import SearchResults from './components/SearchResults';
import SearchLetters from './components/SearchLetters';
import Sidebar from './utilities/Sidebar';
// import SearchPage from './components/SearchPage';
import axios from 'axios';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      entityTypes: []
    };
  }

  render() {
    const routes = {
      '/': 'Home',
      '/letters': 'Letters',
      '/letters/letterdetails/:letterId': 'Letter Details',
      '/timeline': 'Timeline',
      '/people': 'People',
      '/people/:personId': ':personId',
      '/places': 'Places',
      '/places/:placeId': ':placeId',
      '/search': 'Search Results',
      '/search-letters': 'Search Letters',
      '/browse-letters': 'Browse Letters'
    };
    return (
      <BrowserRouter>
        <Container fluid className="p-0">
        <div className="d-flex" id="wrapper">
          <Sidebar />
          <div id="page-content-wrapper">
            <Navbar expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto" id="navbarSupportedContent" >
                  <img src='http://localhost:3000/imgs/EU_hz_rev.png' alt='emory-logo-white'></img>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={Landing} />
            <Route exact path="/people" component={People} />
            <Route exact path="/people/:personId" component={Profile} />
            <Route exact path="/browse-letters" component={BrowseLetters} />
            <Route exact path="/letters" component={Letters} />
            <Route exact path="/letters/letterdetails/:letterId" component={LetterDetails} />
            <Route exact path='/timeline' component={Timeline} />
            <Route exact path='/places' component={Places} />
            <Route exact path='/places/:placeId' component={Place} />
            <Route exact path='/search' component={SearchResults} />
            <Route exact path='/search-letters' component={SearchLetters} />
          </div>
        </div>
        </Container>
      </BrowserRouter>
    );
  }

}

export default App;
