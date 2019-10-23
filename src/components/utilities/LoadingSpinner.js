import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class LoadingSpinner extends Component {
  render() {
    return(
      <tr>
        <td>
          <div className="text-center">
            <FontAwesomeIcon icon="spinner" spin  size="6x" />
          </div>
        </td>
      </tr>
    )
  }
}

export default LoadingSpinner;
