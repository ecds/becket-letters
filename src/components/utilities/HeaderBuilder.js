import React, { Component } from "react";
import { setAttendanceLabel, setMusicLabel, setOrganizationLabel, setPersonLabel, setPlaceLabel, setProductionLabel, setEventLabel, setPublicationLabel, setReadingLabel, setRepositoryLabel, setTranslatingLabel, setWorkOfArtLabel, setWritingLabel } from './EntityStringBuilder.js';


class HeaderBuilder extends Component {
    render() {

        if (this.props.type === 'string') {
            return (
                <h1>{this.props.header}</h1>
            )
        }

        else if (this.props.header && this.props.header.type === "repositories") {
            return (
                <h1>{setRepositoryLabel(this.props.header)}</h1>
            )
        }

        if (this.props.entityData.attributes['type-label'] === 'Attendance') {
            return (
                <h1 className='label'>{setAttendanceLabel(this.props.entityData)}</h1>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Music') {
            return (
                <h1 className="listLink">{setMusicLabel(this.props.entityData)}</h1>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Organization') {
            return (
                <h1 className="listLink">{setOrganizationLabel(this.props.entityData)}</h1>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Person') {
            return (
                <h1 className="listLink">{setPersonLabel(this.props.entityData)}</h1>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Place') {
            return (
                <h1 className="listLink">{setPlaceLabel(this.props.entityData)}</h1>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Production') {
            return (
                <h1 className="listLink">{setProductionLabel(this.props.entityData)}</h1>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Public Event') {
            return (
                <h1 className="listLink">{setEventLabel(this.props.entityData)}</h1>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Publication') {
            return (
                <h1 className="listLink">{setPublicationLabel(this.props.entityData)}</h1>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Reading') {
            return (
                <h1 className="listLink">{setReadingLabel(this.props.entityData)}</h1>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Translating') {
            return (
                <h1 className="listLink">{setTranslatingLabel(this.props.entityData)}</h1>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Work Of Art') {
            return (
                <h1 className="listLink">{setWorkOfArtLabel(this.props.entityData)}</h1>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Writing') {
            return (
                <h1 className="listLink">{setWritingLabel(this.props.entityData)}</h1>
            )
        }
    }
}

export default HeaderBuilder;