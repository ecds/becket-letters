import React, { Component } from "react";

class SearchRecipientOnPage extends Component {
  constructor(props, context) {
      super(props, context);
      this.filterLettersList = this.filterLettersList.bind(this);
  }

  filterLettersList() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById(this.props.tableId+'_input');
  filter = input.value.toUpperCase();
  table = document.getElementById(this.props.tableId);
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

  render() {
      return (
        <div className="table-search">
          <label for={this.props.tableId+'_input'} >Search Letters by Recipient:</label>
          <input type="text" id={this.props.tableId+'_input'} onKeyUp={this.filterLettersList} placeholder={"Search "+this.props.placeHolder+'...'} className="form-control" controlId='12345'/>
        </div>
      )
    }
  }

export default SearchRecipientOnPage;
