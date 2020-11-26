// import React from 'react';

// create Attendance sub-header string
export function setAttendanceSubheader(entity) {
};

// create Music sub-header string
export function setMusicSubheader(entity) {
};

// create Organization sub-header string
export function setOrganizationSubheader(entity) {
};

// create Person sub-header string
export function setPersonSubheader(entity) {
};

// create Place sub-header string
export function setPlaceSubheader(entity) {
}

// create Production sub-header string
export function setProductionSubheader(entity) {
};

// create Event sub-header string
export function setEventSubheader(entity) {
};

// create Publication sub-header string
export function setPublicationSubheader(entity) {
};

// create Reading sub-header string
export function setReadingSubheader(entity) {
};

// create Repository sub-header string
export function setRepositorySubheader(entity) {
};

// create Translating sub-header string
export function setTranslatingSubheader(entity) {
};

// create Work of Art sub-header string
export function setWorkOfArtSubheader(entity) {
    const subheaderLines = [
        entity.attributes.description,
        entity.attributes.properties.description,
        entity.attributes.properties.location
    ].filter(function (element) {
        return element !== null;
    });
    if (subheaderLines.length === 0) {
        return null
    }
    else {
        return (
            subheaderLines
        )
    }
};

// create Writing sub-header string
export function setWritingSubheader(entity) {
    if (!entity.attributes.properties.date && !entity.attributes.properties.proposal) {
        return (
            null
        )
    }
    else {
        const subheaderLines = [
            entity.attributes.properties.date,
            entity.attributes.properties.notes,
            entity.attributes.properties.proposal
        ].filter(function (element) {
            return element !== null;
        });
        return (
            subheaderLines
        )
    }
};