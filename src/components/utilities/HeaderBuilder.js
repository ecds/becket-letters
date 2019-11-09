import React, { Component } from "react";

class HeaderBuilder extends Component {
    render() {
        let title = this.props.header ? this.props.header : this.props.id
        let years = this.props.lifedates ? ` (${this.props.lifedates})` : ''
            return (
                <h1 dangerouslySetInnerHTML={{ __html: `${title} ${years}` }} />
            )
        }
}

export default HeaderBuilder;
