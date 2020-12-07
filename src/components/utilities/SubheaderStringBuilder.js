// import React from 'react';

// create Attendance sub-header string
export function setAttendanceSubheader(entity) {
    // const subheaderLines = [
    //     entity.attributes.properties['event-type'],
    //     entity.attributes.properties['place-date']
    // ].filter(function (element) {
    //     if (element !== null || element !== '' || element !== ' ') {
    //             return element
    //         }
    //     else {
    //         return (
    //             null
    //         )
    //     }
    // });
    return (
        null
    )
};

// create Music sub-header string
export function setMusicSubheader(entity) {
    const performers = entity.attributes.properties['performed-by'];
    const altSpellings = entity.attributes.properties['alternative-titles'].join(', ');
    console.log(altSpellings)
    const subheaderLines = {
        performers: performers,
        spellings: altSpellings
    }
    return (
        subheaderLines
    )
};

// create Organization sub-header string
export function setOrganizationSubheader(entity) {
    // const subheaderLines = [
    //     entity.attributes.properties.description,
    // ].filter(function (element) {
    //     if (element !== null || element !== '' || element !== ' ') {
    //         return element
    //     }
    //     else {
    //         return (
    //             null
    //         )
    //     }
    // });
    return (
        null
    )
};

// create Person sub-header string
export function setPersonSubheader(entity) {
};

// create Place sub-header string
export function setPlaceSubheader(entity) {
    const subheaderLines = {
        description: entity.attributes.properties.description,
        links: entity.attributes.properties.links
    }
    return (
        subheaderLines
    )
}

// create Production sub-header string
export function setProductionSubheader(entity) {
    const prodCast = entity.attributes.properties.cast.filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
            return element
        }
        else {
            return (
                null
            )
        }
    });
    const subheaderLines = {
        cast: prodCast,
        notes: entity.attributes.properties.notes,
        stagingLink: entity.attributes.properties['staging-beckett']
    }
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
        entity.attributes.description
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
        description: entity.attributes.description
    }
    return (
        subheaderLines
    )
};

// create Work of Art sub-header string
export function setWorkOfArtSubheader(entity) {
    const subheaderLines = {
        altSpelling: entity.attributes.properties['alternate-spellings'],
        location: entity.attributes.properties['owner-location-accession-number-contemporaneous']
    };
    return (
        subheaderLines
    )
};

// create Writing sub-header string
export function setWritingSubheader(entity) {
    const subheaderLines = [
        null
        // will be URL
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