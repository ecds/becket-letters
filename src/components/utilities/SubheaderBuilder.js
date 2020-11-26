import React, { Component } from "react";
import { setAttendanceSubheader, setMusicSubheader, setOrganizationSubheader, setPersonSubheader, setPlaceSubheader, setProductionSubheader, setEventSubheader, setPublicationSubheader, setReadingSubheader, setRepositorySubheader, setTranslatingSubheader, setWorkOfArtSubheader, setWritingSubheader } from './SubheaderStringBuilder.js';


class SubheaderBuilder extends Component {
    render() {

        let subheaderText

        console.log(this.props)

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
            return (
                null
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Music') {
            return (
                null
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Organization') {
            return (
                null
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Person') {
            return (
                null
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Place') {
            return (
                null
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Production') {
            return (
                null
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Public Event') {
            return (
                null
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Publication') {
            return (
                null
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Reading') {
            return (
                null
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Translating') {
            return (
                null
            );
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