import React, { Component } from "react";

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
      if (this.props.pagination['total-pages'] > 1) {
        for (let i = 0; i < this.props.pagination['total-pages']; i++) {
          table.push(<li key={i} className="page-item pagination-btn"><button onClick={this.changePageNumber} id={i+1} className='page-link' alt={"Page"+i+1}>{i+1}</button></li>)
        }
        return table
      }
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
