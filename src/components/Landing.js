import React, { Component } from "react";
import HomeJumbotron from './Jumbotron';
import SearchPage from './SearchPage';
import HomeTiles from './utilities/HomeTiles';
import DocumentMeta from 'react-document-meta';

class Landing extends Component {
  render() {
    const meta = {
      title: 'Beckett Letters Landing Page',
      description: "Begin your exploration of Samuel Beckett's letters",
    };

    return (
      <div className="landing" >
        <DocumentMeta {...meta}>
          <h1>Hello World!</h1>
        </DocumentMeta>
        <HomeJumbotron />
        <SearchPage />
        <HomeTiles />
      </div >
    )
  }
}

export default Landing;
