import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import AttendanceDetails from './components/AttendanceDetails';
import BrowseLetters from './components/BrowseLetters';
import Landing from './components/Landing';
import Letters from './components/letters';
import LetterDetails from './components/LetterDetails';
import LettersByAttendanceMentioned from './components/LettersByAttendanceMentioned';
import LettersByMusicMentioned from './components/LettersByMusicMentioned';
import LettersByOrganizationsMentioned from './components/LettersByOrganizationsMentioned';
import LettersByPlacesMentioned from './components/LettersByPlacesMentioned';
import LettersByPeopleMentioned from './components/LettersByPeopleMentioned';
import LettersByProductionsMentioned from './components/LettersByProductionsMentioned';
import LettersByPublicationMentioned from './components/LettersByPublicationMentioned';
import LettersByPublicEventMentioned from './components/LettersByPublicEventMentioned';
import LettersByReadingsMentioned from './components/LettersByReadingsMentioned';
import LettersByTranslationsMentioned from './components/LettersByTranslationsMentioned';
import LettersByWorkOfArtMentioned from './components/LettersByWorkOfArtMentioned';
import LettersByWritingsMentioned from './components/LettersByWritingsMentioned';
import MusicDetails from './components/MusicDetails';
import People from './components/people';
import Places from './components/Places';
import Place from './components/Place';
import Profile from './components/Profile';
import Timeline from './components/Timeline';
import SearchResults from './components/SearchResults';
import SearchLetters from './components/SearchLetters';
import Sidebar from './components/utilities/Sidebar';
import OrganizationDetails from './components/OrganizationDetails';
import ProductionDetails from './components/ProductionDetails';
import PublicationDetails from './components/PublicationDetails';
import PublicEventDetails from './components/PublicEventDetails';
import ReadingDetails from './components/ReadingDetails';
import RepositoryDetails from './components/RepositoryDetails';
import TranslationDetails from './components/TranslationDetails';
import WorksOfArtDetails from './components/WorksOfArtDetails';
import WritingDetails from './components/WritingDetails';




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
      <Router buildname="build">
        <Container fluid className="p-0">
          <Sidebar />
          <Switch>
            <Route exact path='/browse-letters-productions' render={(props) => <LettersByProductionsMentioned apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/browse-letters-organizations' render={(props) => <LettersByOrganizationsMentioned apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/browse-letters-places' render={(props) => <LettersByPlacesMentioned apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/browse-letters-people' render={(props) => <LettersByPeopleMentioned apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/browse-letters-writings' render={(props) => <LettersByWritingsMentioned apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/browse-letters-translations' render={(props) => <LettersByTranslationsMentioned apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/browse-letters-readings' render={(props) => <LettersByReadingsMentioned apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/browse-letters-attendance' render={(props) => <LettersByAttendanceMentioned apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/browse-letters-music' render={(props) => <LettersByMusicMentioned apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/browse-letters-publications' render={(props) => <LettersByPublicationMentioned apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/browse-letters-works_of_art' render={(props) => <LettersByWorkOfArtMentioned apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/browse-letters-public_events' render={(props) => <LettersByPublicEventMentioned apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/repositories/:id' render={(props) => <RepositoryDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/productions/:id' render={(props) => <ProductionDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/publications/:id' render={(props) => <PublicationDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/music/:id' render={(props) => <MusicDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/organizations/:id' render={(props) => <OrganizationDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/attendances/:id' render={(props) => <AttendanceDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/events/:id' render={(props) => <PublicEventDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/readings/:id' render={(props) => <ReadingDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/works-of-art/:id' render={(props) => <WorksOfArtDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/writings/:id' render={(props) => <WritingDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/translations/:id' render={(props) => <TranslationDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/timeline' component={Timeline} />
            <Route exact path="/people" component={People} />
            <Route exact path="/people/:id" render={(props) => <Profile apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path="/browse-letters" component={BrowseLetters} />
            <Route exact path="/letters" component={Letters} />
            <Route exact path="/letters/letterdetails/:id" render={(props) => <LetterDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/places' component={Places} />
            <Route exact path='/places/:id' render={(props) => <Place apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/search' component={SearchResults} />
            <Route exact path='/search-letters' component={SearchLetters} />
            <Route exact path="/" component={Landing} />
          </Switch>

        </Container>
      </Router>
    );
  }

}

export default App;
