import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import People from './components/people';
import Letters from './components/letters';
import Header from './components/header';

function App() {
  return (
    <BrowserRouter>
    <Header />
        <div>
          <Route exact path="/" component={People} />
          <Route exact path="/people" component={People} />
          <Route exact path="/letters" component={Letters} />
        </div>
      </BrowserRouter>
  );
}

export default App;
