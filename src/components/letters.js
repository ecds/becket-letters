import React, { Component } from "react";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';

const columns = [{
  dataField: 'ID',
  text: 'ID',
  sort: true,
  filter: textFilter({delay: 333}),
  expandRow: true
}, {
  dataField: 'Code',
  text: 'Code',
  sort: true,
  filter: textFilter({delay: 333})
// }, {
//   dataField: .map((letter) => <p> {letter.Day}, {letter.Month} </p>),
//   text: 'Date',
//   sort: true,
//   filter: numberFilter({delay: 333})
},{
  dataField: 'Addressed to (Actual)',
  text: 'Addressed to (Actual)',
  sort: true,
  filter: textFilter({delay: 333})
}, {
  dataField: 'Reg place sent',
  text: 'Reg place sent',
  sort: true,
  filter: textFilter({delay: 333})
}, {
  dataField: 'PrimaryLang',
  text: 'PrimaryLang',
  sort: true,
  filter: textFilter({delay: 333})
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
          <BootstrapTable keyField='id' data={ this.state.letters } columns={ columns } filter={ filterFactory() } />
          {/* {allLetters} */}
        </div>
      )
    }
  }

export default Letters;