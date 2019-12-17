import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class LoadingSpinner extends Component {
  render() {
    return(
          <div className="text-center">
            <FontAwesomeIcon icon="spinner" spin size="6x" />
          </div>
    )
  }
}

export default LoadingSpinner;
