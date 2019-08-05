import React, { Component } from "react";
import axios from "axios";
import { Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';

const columns = [{
  dataField: 'Addressed from (Actual)',
  text: 'Addressed from (Actual)',
  sort: true,
  filter: textFilter({ delay: 333 })
}, {
  dataField: 'Addressed to (Actual)',
  text: 'Addressed to (Actual)',
  sort: true,
  filter: textFilter({ delay: 333 })
}, {
  dataField: 'Day',
  text: 'Day',
  sort: true,
  filter: numberFilter({ delay: 333 })
}, {
  dataField: 'Month',
  text: 'Month',
  sort: true,
  filter: numberFilter({ delay: 333 })
}, {
  dataField: 'Year',
  text: 'Year',
  sort: true,
  filter: numberFilter({ delay: 333 })
}, {
  dataField: 'Reg place sent',
  text: 'Reg place sent',
  sort: true,
  filter: textFilter({ delay: 333 })
}, {
  dataField: 'First Repository',
  text: 'First Repository',
  sort: true,
  filter: textFilter({ delay: 333 })
}, {
  dataField: 'PrimaryLang',
  text: 'PrimaryLang',
  sort: true,
  filter: textFilter({ delay: 333 })
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
      axios.get('letters_json.json')])
      .then(axios.spread((getLetters) => {
        const letters = getLetters.data;
        this.setState({ letters });
        console.log(letters)
      }))
      .catch((err) => {
        this.setState({ isLoaded: false });
        this.setState({ error: err.message });
      });
  }

  render() {
    // const allLetters = this.state.letters.map((letter) => <li>{letter.ID}, {letter.Additional} </li>)
    return (
      <div>
        <Container>
          <h1>Letters</h1>
          <BootstrapTable keyField='id' data={this.state.letters} columns={columns} filter={filterFactory()} />
          {/* {allLetters} */}
        </Container>

      </div>
    )
  }
}

export default Letters;