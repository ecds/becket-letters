import React, { Component } from "react";
import { setAttendanceSubheader, setMusicSubheader, setOrganizationSubheader, setPlaceSubheader, setProductionSubheader, setEventSubheader, setPublicationSubheader, setReadingSubheader, setTranslatingSubheader, setWorkOfArtSubheader, setWritingSubheader } from './SubheaderStringBuilder.js';


class SubheaderBuilder extends Component {
    render() {

        let subheaderText

        if (this.props.type === 'string') {
            return (
                null
            )
        }

        else if (this.props.header && this.props.header.type === "repositories") {
            return (
                null
            )
        }

        if (this.props.entityData.attributes['type-label'] === 'Attendance') {
            subheaderText = setAttendanceSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                    {subheaderText[1] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[1] }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Music') {
            subheaderText = setMusicSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                    {subheaderText[1] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[1] }} /></h2> : null}
                    {subheaderText[2] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[2] }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Organization') {
            subheaderText = setOrganizationSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Person') {
            return (
                null
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Place') {
            subheaderText = setPlaceSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.description ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText.description }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Production') {
            subheaderText = setProductionSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                    {subheaderText[1] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[1] }} /></h2> : null}
                    {subheaderText[2] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[2] }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Public Event') {
            subheaderText = setEventSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Publication') {
            subheaderText = setPublicationSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                    {subheaderText[1] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[1] }} /></h2> : null}
                    {subheaderText[2] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[2] }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Reading') {
            subheaderText = setReadingSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Translating') {
            subheaderText = setTranslatingSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.translatedInto || subheaderText.translatedTitle ?
                        <h2>
                            Translated
                            {subheaderText.translatedInto ? <span dangerouslySetInnerHTML={{ __html: ' into ' + subheaderText.translatedInto }} /> : null}
                            {subheaderText.translator ? <span dangerouslySetInnerHTML={{ __html: ' by ' + subheaderText.translator }} /> : null}
                        </h2>
                        :
                        null}
                    {subheaderText.translatedTitle ? <h2><span dangerouslySetInnerHTML={{ __html: 'Translated Title: ' + subheaderText.translatedTitle }} /></h2> : null}

                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Work Of Art') {
            subheaderText = setWorkOfArtSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                    {subheaderText[1] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[1] }} /></h2> : null}
                    {subheaderText[2] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[2] }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Writing') {
            subheaderText = setWritingSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                    {subheaderText[1] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[1] }} /></h2> : null}
                    {subheaderText[2] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[2] }} /></h2> : null}
                </>
            )
        }
    }
}

export default SubheaderBuilder;