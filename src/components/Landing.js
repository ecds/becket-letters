import React, { Component } from "react";
import HomeJumbotron from './Jumbotron';
import SearchPage from './SearchPage';
import HomeTiles from './utilities/HomeTiles';
import DocMetaBuilder from './utilities/DocMetaBuilder';

class Landing extends Component {
  render() {
    const metaBuild = {
      title: "Samuel Beckett's Letters",
      description: "Begin your exploration of Samuel Beckett's letters",
    };

    return (
      <div className="landing" >
        <DocMetaBuilder {...metaBuild} />
        <HomeJumbotron />
        <SearchPage />
        <HomeTiles />
      </div >
    )
  }
}

export default Landing;
