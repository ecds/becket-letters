import React, { Component } from "react";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'ID',
  text: 'ID',
  sort: true
}, {
  dataField: 'Code',
  text: 'Code',
  sort: true
}, {
  dataField: 'Year',
  text: 'Date',
  sort: true
}, {
  dataField: 'Addressed to (Actual)',
  text: 'Addressed to (Actual)',
  sort: true
}, {
  dataField: 'Reg place sent',
  text: 'Reg place sent',
  sort: true
}, {
  dataField: 'PrimaryLang',
  text: 'PrimaryLang',
  sort: true
}];

export class Letters extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      isLoaded: false,
      letters: []
    };
  }

  componentDidMount() {
    axios.all([
      axios.get('letters_json.json')    ])
    .then(axios.spread((getLetters) => {
      const letters = getLetters.data;
      this.setState({ letters });
      console.log(letters)
    }))
    .catch((err) => {
      this.setState({ isLoaded:false });
      this.setState({ error:err.message });
    });
  }

  render() {
    // const allLetters = this.state.letters.map((letter) => <li>{letter.ID}, {letter.Additional} </li>)
      return (
        <div>
          <h1>Letters</h1>
          <BootstrapTable keyField='id' data={ this.state.letters } columns={ columns } />
          {/* {allLetters} */}
        </div>
      )
    }
  }

export default Letters;