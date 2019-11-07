import React, { Component } from "react";
import DocumentMeta from 'react-document-meta';
import { throwStatement } from "@babel/types";

let striptags = require('striptags');

class MentionedLetters extends Component {
    render() {
        let strippedTitle
        if (this.props.title !== null) {
            strippedTitle = striptags(this.props.title)
        }
        else strippedTitle = striptags(this.props.id)
        let strippedDesc = striptags(this.props.desc)
        const meta = {
            title: strippedTitle,
            description: strippedDesc
        }
            return (
                <DocumentMeta {...meta} />
            )
        }
}

export default MentionedLetters;
