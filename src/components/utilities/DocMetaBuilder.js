import React, { Component } from "react";
import DocumentMeta from 'react-document-meta';

let striptags = require('striptags');

class MentionedLetters extends Component {
    render() {
        const meta = {
            title: this.props.title ? striptags(this.props.title) : this.props.id,
            description: striptags(this.props.desc)
        }
            return (
                <DocumentMeta {...meta} />
            )
        }
}

export default MentionedLetters;
