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
                <>
                    {subheaderText.attendedWith ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.attendedWith}.` }} /></h2> : null}
                    {subheaderText.performedBy ? <h2><span dangerouslySetInnerHTML={{ __html: `Performed by ${subheaderText.performedBy}.` }} /></h2> : null}
                    {subheaderText.spellings ? <h2><span dangerouslySetInnerHTML={{ __html: `[${subheaderText.spellings}]` }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Music') {
            subheaderText = setMusicSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.description ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.description}` }} /></h2> : null}
                    {subheaderText.performers ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.performers}.` }} /></h2> : null}
                    {subheaderText.notes ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.notes}` }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Organization') {
            subheaderText = setOrganizationSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.description ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.description}.` }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Person') {
            subheaderText = setPersonSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText}` }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Place') {
            subheaderText = setPlaceSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.description ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.description}.` }} /></h2> : null}
                    {subheaderText.links ? <a href={subheaderText.links} target="_blank" rel="noopener noreferrer" ><h2 dangerouslySetInnerHTML={{ __html: subheaderText.links }} /></a> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Production') {
            subheaderText = setProductionSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.proposal || subheaderText.responseReason ? <h2>{subheaderText.proposal ? <span dangerouslySetInnerHTML={{ __html: `${subheaderText.proposal}` }} /> : null}{subheaderText.proposal && subheaderText.responseReason ? ', response: ' : null}{subheaderText.responseReason ? <span dangerouslySetInnerHTML={{ __html: `${subheaderText.responseReason}` }} /> : null}.</h2> : null}
                    {subheaderText.cast ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.cast}.` }} /></h2> : null}
                    {subheaderText.notes ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.notes}.` }} /></h2> : null}
                    {subheaderText.stagingLinks ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.stagingLinks}` }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Public Event') {
            subheaderText = setEventSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.label ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText.label }} /></h2> : null}
                    {subheaderText.date ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText.date }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Publication') {
            subheaderText = setPublicationSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText[0] ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText[0]}` }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Reading') {
            subheaderText = setReadingSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.comment ? <h2><span dangerouslySetInnerHTML={{ __html: subheaderText.comment }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Translating') {
            subheaderText = setTranslatingSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.translatedTitle ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.translatedTitle}.` }} /></h2> : null}
                    {subheaderText.comments ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.comments}` }} /></h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Work Of Art') {
            subheaderText = setWorkOfArtSubheader(this.props.entityData);
            return (
                <>
                    {subheaderText.workAltSpelling ? <h2><span dangerouslySetInnerHTML={{ __html: `[${subheaderText.workAltSpelling}]` }} /></h2> : null}
                    {subheaderText.artistAltSpelling ? <h2><span dangerouslySetInnerHTML={{ __html: `[${subheaderText.artistAltSpelling}]` }} /></h2> : null}
                    {subheaderText.current || subheaderText.contemporaneous ? <h2>{subheaderText.current ? <span dangerouslySetInnerHTML={{ __html: `Current location: ${subheaderText.current}.` }} /> : null} {subheaderText.contemporaneous ? <span dangerouslySetInnerHTML={{ __html: `Contemporaneous location: ${subheaderText.contemporaneous}.` }} /> : null}</h2> : null}
                </>
            )
        }
        if (this.props.entityData.attributes['type-label'] === 'Writing') {
            subheaderText = setWritingSubheader(this.props.entityData);
            return (
                <>
                {subheaderText.proposalResponse ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.proposalResponse}.` }} /></h2> : null}
                    {subheaderText.date ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.date}.` }} /></h2> : null}
                    {subheaderText.notes ? <h2><span dangerouslySetInnerHTML={{ __html: `${subheaderText.notes}.` }} /></h2> : null}
                </>
            )
        }
    }
}

export default SubheaderBuilder;