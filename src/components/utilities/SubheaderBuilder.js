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
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Work Of Art') {
            subheaderText = setWorkOfArtSubheader(this.props.entityData)
            if (subheaderText = null) {
                return (
                    null
                )
            }
            else {
                return (
                    <h2 className="listLink">{subheaderText}</h2>
                )
            }
        }
        if (this.props.entityData.attributes['type-label'] === 'Writing') {
            return (
                null
            )
        }
    }
}

export default SubheaderBuilder;