import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchRecipientOnPage from './SearchRecipientOnPage';

class MentionedLetters extends Component {
    render() {
        if (this.props.letters.length === 0) {
            return (
                <p>No Letters</p>
            )
        }
        else {
            return (
                <div>
                    <SearchRecipientOnPage tableId='repositoryLetters' placeHolder='by recipient' />
                    <table className='table table-bordered' id='repositoryLetters'>
                        <thead>
                            <tr>
                                <th>Recipient</th>
                                <th colSpan="2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.letters.map((letter) =>
                                <tr key={letter.id}>
                                    <td>{letter['recipients'].map((this_recipient) => <a key={this_recipient.id} href={'/people/' + this_recipient.id + '/'}>{this_recipient.name}</a>)}</td>
                                    <td>{letter.date}</td>
                                    <td className="actions"><Link to={'/letters/letterdetails/' + letter.id}>View Letter Details</Link></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default MentionedLetters;
