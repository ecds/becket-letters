import React from 'react';
import './App.scss';
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Landing from './components/landing';
import People from './components/people';
import Letters from './components/letters';
import Header from './components/header';
import LocationPath from './components/breadcrumbs';
import LetterPg from './components/letter';
import Timeline from './components/Timeline';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
      <LocationPath />
      <Route exact path="/" component={Landing} />
      <Route exact path="/people" component={People} />
      <Route exact path="/letters" component={Letters} />
      <Route exact path="/letterdetails" component={LetterPg} />
      <Route exact path='/timeline' component={Timeline} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
