import React, { Component } from "react";

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
                        letter
                        </td>
                    <td>
                        here
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