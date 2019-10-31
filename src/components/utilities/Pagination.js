import React, { Component } from "react";
import { Dropdown } from 'react-bootstrap';

class Pagination extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      page: '1'
    };
  }

  componentDidMount() {
    // this.createPagination();
  }

  changePageNumber = (e) => {
    var page = e.target.id
    this.props.action(page)
  }

  createPagination = () => {
    let pageBtns = []
    if (this.props.pagination['total-pages'] > 1) {
      for (let i = 0; i < this.props.pagination['total-pages']; i++) {
        pageBtns.push(<Dropdown.Item key={i} className="page-item pagination-link" onClick={this.changePageNumber} id={i + 1} alt={"Page" + i + 1}>{i + 1}</Dropdown.Item>)
      }
      return ([
        <Dropdown>
          <Dropdown.Toggle className='pagination-toggle'>
            Pages
        </Dropdown.Toggle>
          <Dropdown.Menu className='pagination-dropdown'>
            {pageBtns}
          </Dropdown.Menu>
        </Dropdown>
      ])
    }
  }


  render() {
    return (
      <nav aria-label="Page navigation example">
        {this.createPagination()}
      </nav >
    )
  }
}

export default Pagination;
