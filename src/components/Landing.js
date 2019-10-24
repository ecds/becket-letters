import React, { Component } from "react";
import HomeJumbotron from './Jumbotron';
import SearchPage from './SearchPage';
import HomeTiles from './utilities/HomeTiles';
import DocumentMeta from 'react-document-meta';

class Landing extends Component {
  render() {
    const meta = {
      title: "Samuel Beckett Letters",
      description: "Begin your exploration of Samuel Beckett's letters",
    };

    return (
      <div className="landing" >
        <DocumentMeta {...meta} />
        <HomeJumbotron />
        <SearchPage />
        <HomeTiles />
      </div >
    )
  }
}

export default Landing;
