import React, { Component } from "react";
import Header from './header';

export class People extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      
    };
  }

  componentDidMount() {
    // axios.get(`http://localhost:3000/people.json`)
    //   .then(res => {
    //     const people = res.data.data;
    //     this.setState({
    //       isLoaded: true,
    //       people: people
    //     });
    //   })
    //   .catch((err) => {
    //     this.setState({
    //       error: err.message
    //     });
    //   });
  }

  render() {
      return (
        <div>
          <Header />
          <h1>People</h1>
          <a href='./letters'>Link to letters</a>
        </div>
      )
    }
  }

export default People;