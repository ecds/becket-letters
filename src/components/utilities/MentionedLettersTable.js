import React, { Component } from "react";

class MentionedLetters extends Component {
    render() {
        return (
            <tbody>
                {this.props.letters.map((letter) =>
                    <tr>
                        <td>{letter['recipients'].map((this_recipient) => <a href={'/people/' + this_recipient.id + '/' + this_recipient.name}>{this_recipient.name}</a>)}</td>
                        <td>{letter.date}</td>
                        <td className="actions"><a href={'/letters/letterdetails/' + letter.id}>Explore Letter</a></td>
                    </tr>
                )}
            </tbody>
        )
    }
}

export default MentionedLetters;
