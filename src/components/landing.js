import React, { Component } from "react";

export class Landing extends Component {
    render() {
        return (
            <div>
                <h2>Landing</h2>
                <p><a href='./letters'>Link to letters</a></p>
                <p><a href='./people'>Link to people</a></p>
                <p><a href='./places'>Link to places</a></p>
                <p><a href='./letterdetails'>Link to letter detail page</a></p>
                <p><a href='./timeline'>Link to timeline page</a></p>
        </div>
        )
    }
}

export default Landing;