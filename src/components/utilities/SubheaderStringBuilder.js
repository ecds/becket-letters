// import React from 'react';

// create Attendance sub-header string
export function setAttendanceSubheader(entity) {
    const subheaderLines = [
        entity.attributes.properties['event-type'],
        entity.attributes.properties['place-date']
    ].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
                return element
            }
        else {
            return (
                null
            )
        }
    });
    return (
        subheaderLines
    )
};

// create Music sub-header string
export function setMusicSubheader(entity) {
    const subheaderLines = [
        entity.attributes.properties.description,
        entity.attributes.properties.notes,
        entity.attributes.properties['performed-by']
    ].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
                return element
            }
        else {
            return (
                null
            )
        }
    });
    return (
        subheaderLines
    )
};

// create Organization sub-header string
export function setOrganizationSubheader(entity) {
    const subheaderLines = [
        entity.attributes.properties.description,
    ].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
                return element
            }
        else {
            return (
                null
            )
        }
    });
    return (
        subheaderLines
    )
};

// create Person sub-header string
export function setPersonSubheader(entity) {
};

// create Place sub-header string
export function setPlaceSubheader(entity) {
    const subheaderLines = {
        description: entity.attributes.properties.description,
        // links: entity.attributes.properties.links
    }
    return (
        subheaderLines
    )
}

// create Production sub-header string
export function setProductionSubheader(entity) {
    const subheaderLines = entity.attributes.properties.cast.filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
                return element
            }
        else {
            return (
                null
            )
        }
    });
    return (
        subheaderLines
    )
};

// create Event sub-header string
export function setEventSubheader(entity) {
    const subheaderLines = [
        entity.attributes.properties.description,
    ].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
                return element
            }
        else {
            return (
                null
            )
        }
    });
    return (
        subheaderLines
    )
};

// create Publication sub-header string
export function setPublicationSubheader(entity) {
    const subheaderLines = [
        entity.attributes.properties.place,
        entity.attributes.properties.notes,
        entity.attributes.properties['publication-information']
    ].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
                return element
            }
        else {
            return (
                null
            )
        }
    });
    return (
        subheaderLines
    )
};

// create Reading sub-header string
export function setReadingSubheader(entity) {
    const subheaderLines = [
        entity.attributes.properties.publication
    ].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
                return element
            }
        else {
            return (
                null
            )
        }
    });
    return (
        subheaderLines
    )
};

// create Repository sub-header string
// export function setRepositorySubheader(entity) {
// };

// create Translating sub-header string
export function setTranslatingSubheader(entity) {
    const subheaderLines = {
        translatedInto: entity.attributes.properties['translated-into'],
        translatedTitle: entity.attributes.properties['translated-title'],
        translator: entity.attributes.properties.translator,
    }
    return (
        subheaderLines
    )
};

// create Work of Art sub-header string
export function setWorkOfArtSubheader(entity) {
    const subheaderLines = [
        entity.attributes.description,
        entity.attributes.properties.description,
        entity.attributes.properties.location
    ].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
                return element
            }
        else {
            return (
                null
            )
        }
    });
    return (
        subheaderLines
    )
};

// create Writing sub-header string
export function setWritingSubheader(entity) {
    const subheaderLines = [
        entity.attributes.properties.date,
        entity.attributes.properties.notes,
        entity.attributes.properties.proposal
    ].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
                return element
            }
        else {
            return (
                null
            )
        }
    });
    return (
        subheaderLines
    )
};