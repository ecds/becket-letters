import React, { Component } from "react";
import { Link } from 'react-router-dom';

class FindLetters extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        var LettersList = this.props.entity.attributes['public-letters-hash'].map((letter) => {
            if (letter === null) {
                return null
            }
            else {
                return <tr>
                    <td>
                        <Link
                            to={{
                                pathname: `/letters/letterdetails/${letter.id}`,
                                state: {
                                    id: letter.recipients[0].id,
                                    name: letter.recipients[0].name
                                }
                            }}>
                            <span dangerouslySetInnerHTML={{ __html: "Letter to " + letter.recipients[0].name}} />
                        </Link>
                    </td>
                    <td>
                        {letter.date}
                            </td>
                </tr>
            }
        }
        );

        return (
            LettersList
        )
    }
}

export default FindLetters;