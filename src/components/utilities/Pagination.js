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
  }

  changePageNumber = (e) => {
    var page = e.target.id
    this.props.action(page)
    console.log(page)
    // ERROR IS HERE
    // is the component reloading entirely and reinitializing state when the page changes?
    this.setState({
      page: page
    })
    console.log(this.state.page)
  }

  createPrevBtn = () => {
    var page = parseInt(this.state.page)
    if (page === 1) {
      return null
    }
    else {
      return <Button onClick={this.changePageNumber} id={page-1} className='paginate-prev paginate-btn'>Previous</Button>
    }
  }

  createNextBtn = () => {
    var page = parseInt(this.state.page)
    if (page === this.props.pagination['total-pages']) {
      return null
    }
    else {
      return <Button onClick={this.changePageNumber} id={page+1} className='paginate-btn'>Next</Button>
    }
  }

  createPagination = () => {
    let pageBtns = []
    if (this.props.pagination['total-pages'] > 1) {
      for (let i = 0; i < this.props.pagination['total-pages']; i++) {
        pageBtns.push(<Dropdown.Item key={i} className="page-item pagination-link" onClick={this.changePageNumber} id={i + 1} alt={"Page" + i + 1}>{i + 1}</Dropdown.Item>)
      }
      return ([
        <div key="pagination-row">
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
      <nav aria-label="pagination">
        {this.createPagination()}
      </nav >
    )
  }
}

export default Pagination;
