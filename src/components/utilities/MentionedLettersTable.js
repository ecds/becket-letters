import React, { Component } from "react";
import { Link } from "react-router-dom";

class MentionedLetters extends Component {
    render() {
        return (
            <tbody>
                {this.props.letters.map((letter) =>
                    <tr>
                        <td>{letter['recipients'].map((this_recipient) => <a href={'/people/' + this_recipient.id + '/' + this_recipient.name}>{this_recipient.name}</a>)}</td>
                        <td>{letter.date}</td>
                        <td className="actions"><Link to={'/letters/letterdetails/' + letter.id}>Explore Letter</Link></td>
                    </tr>
                )}
            </tbody>
        )
    }
}

export default MentionedLetters;
