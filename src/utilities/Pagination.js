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
        table.push(<li class="page-item"><a key={i} onClick={this.changePageNumber} id={i+1} className='page-link' href="#">{i+1}</a></li>)
      }
      return table
    }


  render() {
      return (
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {this.createPagination()}
          </ul>
        </nav>
      )
    }
  }

export default Pagination;
