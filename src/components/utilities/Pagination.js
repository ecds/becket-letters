import React, { Component } from "react";
import { Button, Dropdown } from 'react-bootstrap';

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
    this.setState(() => {
      return { page: page }
    })
  }

  createPrevBtn = (e) => {
    var page = this.state.page
    if (page === 1) {
      return null
    }
    else {
      return <Button onClick={this.changePageNumber} id={this.state.page-1}>Previous</Button>
    }
  }

  createNextBtn = (e) => {
    if (this.state.page === this.props.pagination['total-pages']) {
      return null
    }
    else {
      return <Button onClick={this.changePageNumber} id={this.state.page+1}>Next</Button>
    }
  }

  createPagination = () => {
    let pageBtns = []
    if (this.props.pagination['total-pages'] > 1) {
      for (let i = 0; i < this.props.pagination['total-pages']; i++) {
        pageBtns.push(<Dropdown.Item key={i} className="page-item pagination-link" onClick={this.changePageNumber} id={i + 1} alt={"Page" + i + 1}>{i + 1}</Dropdown.Item>)
      }
      return ([
        <div>
          <Dropdown>
            <Dropdown.Toggle className='pagination-toggle'>
              Page {this.state.page} of {this.props.pagination['total-pages']}
            </Dropdown.Toggle>
            <Dropdown.Menu className='pagination-dropdown'>
              {pageBtns}
            </Dropdown.Menu>
          </Dropdown>
          {this.createPrevBtn()}
          {this.createNextBtn()}
        </div>
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
