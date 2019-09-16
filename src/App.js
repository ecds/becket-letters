import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Route } from "react-router-dom";
import Breadcrumbs  from 'react-router-dynamic-breadcrumbs';
import { Container } from 'react-bootstrap';
import Landing from './components/Landing';
import People from './components/people';
import BrowseLetters from './components/BrowseLetters';
import Header from './components/header';
import LetterPg from './components/letter';
import Timeline from './components/Timeline';
import Places from './components/Places';
import Place from './components/Place';
import Profile from './components/Profile';
import SearchResults from './components/SearchResults';
// import SearchPage from './components/SearchPage';
import axios from 'axios';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      entityTypes: []
    };
  }

  componentDidMount() {
    // Get all Entity Types and Store for use among all components
    axios.all([
        axios.get('../entity-types.json')])
        .then(axios.spread((getEntityTypes) => {
            const entityTypes = getEntityTypes.data.data;
            this.setState({ entityTypes });
        }))
  }

  render() {
    const routes = {
      '/': 'Home',
      '/letters': 'Letters',
      '/letters/letterdetails': 'Letter Details',
      '/timeline': 'Timeline',
      '/people': 'People',
      '/people/:personId': ':personId',
      '/places': 'Places',
      '/places/place': 'Place',
      '/search': 'Search Results'
    };
    return (
      <BrowserRouter>
        <Header />
        <Container fluid className="p-0">
        <Breadcrumbs mappedRoutes={routes} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/people" component={People} />
        <Route exact path="/people/:personId" component={Profile} />
        <Route exact path="/letters" component={BrowseLetters} />
        <Route exact path="/letters/letterdetails" component={LetterPg} />
        <Route exact path='/timeline' component={Timeline} />
        <Route exact path='/places' component={Places} />
        <Route exact path='/places/place' component={Place} />
        <Route exact path='/search' component={SearchResults} />
        </Container>
      </BrowserRouter>
    );
  }

}

export default App;
