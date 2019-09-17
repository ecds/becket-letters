import React, { Component } from "react";
import { Container, Table } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from "axios";


class Pagination extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
          page: '1'
      };
  }

  componentDidMount() {
    console.log(this.props)
    // this.createPagination();
  }

  changePageNumber = (e) => {
    console.log(e.target.id)
    var page = e.target.id
    this.props.action(page)
  }

  createPagination = () => {
      let table = []
      for (let i = 0; i < this.props.pagination['total-pages']; i++) {
        table.push(<button key={i} onClick={this.changePageNumber} id={i+1} className='btn btn-pagination' href="#">{i+1}</button>)
      }
      return table
    }


  render() {
      return (
        <div>
          {this.createPagination()}
        </div>
      )
    }
  }

export default Pagination;
