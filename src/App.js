import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Route } from "react-router-dom";
import Breadcrumbs  from 'react-router-dynamic-breadcrumbs';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
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
import Sidebar from './components/utilities/Sidebar';
import RepositoryDetails from './components/RepositoryDetails';
import ProductionDetails from './components/ProductionDetails';
import MusicDetails from './components/MusicDetails';
import OrganizationDetails from './components/OrganizationDetails';
import AttendanceDetails from './components/AttendanceDetails';
import PublicationDetails from './components/PublicationDetails';
import PublicEventDetails from './components/PublicEventDetails';
import ReadingDetails from './components/ReadingDetails';
import WorksOfArtDetails from './components/WorksOfArtDetails';
import WritingDetails from './components/WritingDetails';
import TranslationDetails from './components/TranslationDetails';
import LettersByOrganizationsMentioned from './components/LettersByOrganizationsMentioned';

import axios from 'axios';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner, faSearch)

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
      '/letters/letterdetails/:id': 'Letter Details',
      '/timeline': 'Timeline',
      '/people': 'People',
      '/people/:personId/:name': ':name',
      '/places': 'Places',
      '/places/:placeId': ':d',
      '/search': 'Search Results',
      '/search-letters': 'Search Letters',
      '/browse-letters': 'Browse Letters',
      '/repositories/:id': ':id',
      '/productions/:id': ':id',
      '/music/:id': ':id',
      '/organizations/:id': ':id',
      '/attendance/:id': ':id'
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
            <Route exact path="/people/:id/:name" render={(props) => <Profile apiUrl={this.props.apiUrl} {...props} /> } />
            <Route exact path="/browse-letters" component={BrowseLetters} />
            <Route exact path="/letters" component={Letters} />
            <Route exact path="/letters/letterdetails/:id" render={(props) => <LetterDetails apiUrl={this.props.apiUrl} {...props} /> } />
            <Route exact path='/timeline' component={Timeline} />
            <Route exact path='/places' component={Places} />
            <Route exact path='/places/:id' render={(props) => <Place apiUrl={this.props.apiUrl} {...props} /> } />
            <Route exact path='/search' component={SearchResults} />
            <Route exact path='/search-letters' component={SearchLetters} />
            <Route exact path='/repositories/:id' render={(props) => <RepositoryDetails apiUrl={this.props.apiUrl} {...props} /> }  />
            <Route exact path='/productions/:id' render={(props) => <ProductionDetails apiUrl={this.props.apiUrl} {...props} /> }  />
            <Route exact path='/publications/:id' render={(props) => <PublicationDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/music/:id' render={(props) => <MusicDetails apiUrl={this.props.apiUrl} {...props} /> }  />
            <Route exact path='/organizations/:id' render={(props) => <OrganizationDetails apiUrl={this.props.apiUrl} {...props} /> }  />
            <Route exact path='/attendances/:id' render={(props) => <AttendanceDetails apiUrl={this.props.apiUrl} {...props} /> }  />
            <Route exact path='/events/:id' render={(props) => <PublicEventDetails apiUrl={this.props.apiUrl} {...props} /> }  />
            <Route exact path='/readings/:id' render={(props) => <ReadingDetails apiUrl={this.props.apiUrl} {...props} /> }  />
            <Route exact path='/works-of-art/:id' render={(props) => <WorksOfArtDetails apiUrl={this.props.apiUrl} {...props} /> }  />
            <Route exact path='/writings/:id' render={(props) => <WritingDetails apiUrl={this.props.apiUrl} {...props} /> }  />
            <Route exact path='/translations/:id' render={(props) => <TranslationDetails apiUrl={this.props.apiUrl} {...props} /> }  />
            <Route exact path='/browse-letters/productions' render={(props) => <LettersByProductionsMentioned apiUrl={this.props.apiUrl} {...props} /> }  />
            <Route exact path='/browse-letters/organizations' render={(props) => <LettersByOrganizationsMentioned apiUrl={this.props.apiUrl} {...props} /> }  />
          </div>
        </div>
        </Container>
      </BrowserRouter>
    );
  }

}

export default App;
