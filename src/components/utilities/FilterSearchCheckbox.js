import React, { Component } from "react";

class FilterSearchCheckboxes extends Component {
    render() {
        return (
            <label>
                <input
                    type="checkbox"
                    className="checkbox"
                    onChange={(e) => this.filterRowsByType(this.props.type, e)}
                />
                {this.props.labelText}
            </label>
        )
    }
}

export default FilterSearchCheckboxes;
