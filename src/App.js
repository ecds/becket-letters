import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import BrowseLetters from './components/BrowseLetters';
import EntityDetails from './components/EntityDetails';
import Landing from './components/Landing';
import LetterDetails from './components/LetterDetails';
import Letters from './components/letters';
import LettersBy from './components/LettersBy';
import People from './components/people';
import PersonDetails from './components/PersonDetails';
import Places from './components/Places';
import PublicEventDetails from './components/PublicEventDetails';
import RepositoryDetails from './components/RepositoryDetails';
import SearchLetters from './components/SearchLetters';
import SearchResults from './components/SearchResults';
import Sidebar from './components/utilities/Sidebar';
import Timeline from './components/Timeline';

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
            <Route exact path="/browse-letters" component={BrowseLetters} />
            <Route exact path='/browse-letters-attendance' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType={'attendance'}
              placeholder={"ex. 'Come Back Africa'"}
              tableHeader={'Attendance Name'}
              metaTitle={'Browse by Attendances'}
            />}
            />
            <Route exact path='/browse-letters-music' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType={'music'}
              placeholder={"ex. 'Nearer my God'"}
              tableHeader={'Music Title'}
              metaTitle={'Browse by Music'}
            />}
            />
            <Route exact path='/browse-letters-organization' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='organization'
              placeholder={"ex. 'University of Toronto'"}
              tableHeader={'Organization Name'}
              metaTitle={'Browse by Organizations'}
            />}
            />
            <Route exact path='/browse-letters-person' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props} 
              entityType={'person'}
              placeholder={"ex. 'PERSON NAME HERE'"}
              tableHeader={'Person Name'}
              metaTitle={'Browse by Person'}
            />}
            />
            <Route exact path='/browse-letters-place' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType={'place'}
              placeholder={"ex. 'Paris'"}
              tableHeader={'Place Name'}
              metaTitle={'Browse by Places'}
            />}
            />
            <Route exact path='/browse-letters-production' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='production'
              placeholder={"ex. 'Krapp's Last Tape'"}
              tableHeader={'Production Name'}
              metaTitle={'Browse by Productions'}
            />}
            />
            <Route exact path='/browse-letters-public-event' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='public-event'
              placeholder={"ex. 'Bastille Day'"}
              tableHeader={'Public Event'}
              metaTitle={'Browse by Public Events'}
            />}
            />
            <Route exact path='/browse-letters-publication' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='publication'
              placeholder={"ex. 'Godot'"}
              tableHeader={'Publication Name'}
              metaTitle={'Browse By Publication'}
            />}
            />
            <Route exact path='/browse-letters-reading' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='reading'
              placeholder={"ex. 'The Warden'"}
              tableHeader={'Reading Name'}
              metaTitle={'Browse by Reading'}
            />}
            />
            <Route exact path="/browse-letters-repositories" render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='repositories'
              placeholder={"ex. 'Trinity College'"}
              tableHeader={'Repository'}
              metaTitle={'Browse by Repositories'}
            />}
            />
            <Route exact path='/browse-letters-Translating' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='Translating'
              placeholder={"ex. 'Krapp'"}
              tableHeader={'Translating Title'}
              metaTitle={'Browse by Translating'}
            />}
            />
            <Route exact path='/browse-letters-work-of-art' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='work-of-art'
              placeholder={"ex. 'Divine Comedy'"}
              tableHeader={'Work of Art Title'}
              metaTitle={'Browse by Work of Art'}
            />}
            />
            <Route exact path='/browse-letters-writing' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='writing'
              placeholder={"ex. 'Molloy'"}
              tableHeader={'Writing Title'}
              metaTitle={'Browse by Writing'}
            />}
            />
            {/* Entity Details: */}
            <Route exact path='/attendances/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/events/:id' render={(props) => <PublicEventDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/music/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/organizations/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/places/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/productions/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/publications/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/readings/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/repositories/:id' render={(props) => <RepositoryDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/translations/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/works-of-art/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/writings/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            {/* etc: */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/letters" component={Letters} />
            <Route exact path="/letters/letterdetails/:id" render={(props) => <LetterDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path="/people" component={People} />
            <Route exact path="/people/:id" render={(props) => <PersonDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/places' component={Places} />
            <Route exact path='/search' component={SearchResults} />
            <Route exact path='/search-letters' component={SearchLetters} />
            <Route exact path='/timeline' component={Timeline} />
          </Switch>
        </Container>
      </Router>
    );
  }

}

export default App;
