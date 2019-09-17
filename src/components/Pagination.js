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
    console.log(this.props)
  }

  componentDidMount() {
    console.log(this.props)
    // this.createPagination();
  }

  createPagination = () => {
      let table = []
      for (let i = 0; i < this.props.pagination['total-pages']; i++) {
        table.push(<a key={i} onClick={() => this.refreshData(i+1)} className='btn btn-pagination' href="#">{i+1}</a>)
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
