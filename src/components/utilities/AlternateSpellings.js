import React, { Component } from "react";

class AlternateSpellings extends Component {
  render() {
    if (this.props.spellingList && this.props.spellingList.length >0) {
      return (
        <div>
          <h2>Alternate Spellings:</h2>
          {this.props.spellingList.map((spelling) =>
            <div>{spelling}</div>
          )}
        </div>)
    } else {
      return null
    }
  }
}

export default AlternateSpellings;
