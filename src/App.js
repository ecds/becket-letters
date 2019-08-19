import React from 'react';
import './App.scss';
import { BrowserRouter, Route } from "react-router-dom";
import Breadcrumbs  from 'react-router-dynamic-breadcrumbs';
import { Container } from 'react-bootstrap';
import Landing from './components/landing';
import People from './components/people';
import Letters from './components/letters';
import Header from './components/header';
import LetterPg from './components/letter';
import Timeline from './components/Timeline';

const routes = {
  '/': 'Home',
  '/letters': 'Letters',
  '/letters/letterdetails': 'Letter Details',
  '/timeline': 'Timeline',
  '/people': 'People'
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
      <Breadcrumbs mappedRoutes={routes} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/people" component={People} />
      <Route exact path="/letters" component={Letters} />
      <Route exact path="/letters/letterdetails" component={LetterPg} />
      <Route exact path='/timeline' component={Timeline} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
