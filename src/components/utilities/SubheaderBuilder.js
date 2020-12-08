import React, { Component } from "react";
import { setAttendanceSubheader, setMusicSubheader, setOrganizationSubheader, setPersonSubheader, setPlaceSubheader, setProductionSubheader, setEventSubheader, setPublicationSubheader, setReadingSubheader, setTranslatingSubheader, setWorkOfArtSubheader, setWritingSubheader } from './SubheaderStringBuilder.js';


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
                // <>
                //     {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                //     {subheaderText[1] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[1] }} /></h2> : null}
                // </>
                null
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Music') {
            subheaderText = setMusicSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.performers ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText.performers }} /></h2> : null}
                    {subheaderText.spellings ? <h2><span dangerouslySetInnerHTML={{ __html: `[${subheaderText.spellings}]` }} /></h2> : null}
                    {subheaderText ? '.' : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Organization') {
            subheaderText = setOrganizationSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                    {subheaderText ? '.' : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Person') {
            subheaderText = setPersonSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText }} /></h2> : null}
                    {subheaderText ? '.' : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Place') {
            subheaderText = setPlaceSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.description ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText.description }} /></h2> : null}
                    {/* open in new tab */}
                    {subheaderText.links ? <a href={subheaderText.links}><h2 dangerouslySetInnerHTML={{ __html: subheaderText.links }} /></a> : null}
                    {subheaderText ? '.' : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Production') {
            subheaderText = setProductionSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.cast ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText.cast }} /></h2> : null}
                    {subheaderText.notes ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText.notes }} /></h2> : null}
                    {/* open in new tab */}
                    {subheaderText.stagingLink ? <a href={subheaderText.stagingLink}><h2><span dangerouslySetInnerHTML={{ __html: subheaderText.stagingLink }} /></h2></a> : null}
                    {subheaderText ? '.' : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Public Event') {
            subheaderText = setEventSubheader(this.props.entityData);
            return (
                // <>
                //     {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                // </>
                null
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Publication') {
            subheaderText = setPublicationSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                    {subheaderText[1] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[1] }} /></h2> : null}
                    {subheaderText[2] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[2] }} /></h2> : null}
                    {subheaderText ? '.' : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Reading') {
            subheaderText = setReadingSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                    {subheaderText ? '.' : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Translating') {
            subheaderText = setTranslatingSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.comments ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.comments}` }} /></h2> : null}
                    {subheaderText ? '.' : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Work Of Art') {
            subheaderText = setWorkOfArtSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.altSpelling ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText.altSpelling }} /></h2> : null}
                    {subheaderText.location ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText.location }} /></h2> : null}
                    {subheaderText ? '.' : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Writing') {
            subheaderText = setWritingSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText[0] }} /></h2> : null}
                    {subheaderText ? '.' : null}
                </>
            )
        }
    }
}

export default SubheaderBuilder;