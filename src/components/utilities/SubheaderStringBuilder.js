// import React from 'react';

// create Attendance sub-header string
export function setAttendanceSubheader(entity) {
    const attendeesString = entity.attributes.properties['attended-with'].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
            return element
        }
        else {
            return (
                null
            )
        }
    }).join(', ');
    const performers = entity.attributes.properties['performed-by'].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
            return element
        }
        else {
            return (
                null
            )
        }
    }).join(', ');
    let altSpellings = null;
    if (typeof entity.attributes.properties['alternative-spellings'] !== 'string') {
        altSpellings = entity.attributes.properties['alternative-spellings'].filter(function (element) {
            if (element !== null || element !== '' || element !== ' ') {
                return element
            }
            else {
                return (
                    null
                )
            }
        }).join(', ');
    }
    const subheaderText = {
        attendees: attendeesString,
        notes: null,
        performedBy: performers,
        spellings: altSpellings
    }
    return (
        subheaderText
    )
};

// create Music sub-header string
export function setMusicSubheader(entity) {
    let performers = null
    if (typeof entity.attributes.properties['performed-by'] !== 'string') {
        performers = entity.attributes.properties['performed-by'].filter(function (element) {
            if (element !== null || element !== '' || element !== ' ') {
                return element
            }
            else {
                return (
                    null
                )
            }
        }).join(', ');
    }
    else {
        performers = entity.attributes.properties['performed-by'];
    }
    const subheaderLines = {
        description: entity.attributes.description,
        performers: performers,
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
    if (entity.attributes.properties['alternate-names-spellings'].length !== 0) {
        let altNames = '[' + entity.attributes.properties['alternate-names-spellings'].join(', ') + ']';
        return altNames
    }
    else {
        return (
            null
        )
    }
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
        // notes: entity.attributes.properties.notes,
        // stagingLink: entity.attributes.properties['staging-beckett']
    }
    return (
        subheaderLines
    )
};

// create Event sub-header string
export function setEventSubheader(entity) {
    const subheaderLines = {
        description: entity.attributes.properties.description,
    }
    return (
        subheaderLines
    )
};

// create Publication sub-header string
export function setPublicationSubheader(entity) {
    const subheaderLines = [
        entity.attributes.properties.notes
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
    // const subheaderLines = [
    //     entity.attributes.properties.comment
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
    const subheaderText = {
        comment: entity.attributes.properties.comment
    }
    return (
        subheaderText
    )
};

// create Repository sub-header string
// export function setRepositorySubheader(entity) {
// };

// create Translating sub-header string
export function setTranslatingSubheader(entity) {
    const subheaderLines = {
        translatedInto: entity.attributes.properties['translated-into'],
        translator: entity.attributes.properties['translator'],
        translatedTitle: entity.attributes.properties['translated-title'],
        comments: entity.attributes.properties.comments,
    }
    return (
        subheaderLines
    )
};

// create Work of Art sub-header string
export function setWorkOfArtSubheader(entity) {
    const workSpellings = entity.attributes.properties['alternate-spellings'].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
            return element
        }
        else {
            return (
                null
            )
        }
    }).join(', ');
    let artistSpellings = entity.attributes.properties['artist-alternate-spellings'].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
            return element
        }
        else {
            return (
                null
            )
        }
    }).join(', ');
    const subheaderLines = {
        workAltSpelling: workSpellings,
        artistAltSpelling: artistSpellings,
        location: entity.attributes.properties['owner-location-accession-number-contemporaneous']
    };
    return (
        subheaderLines
    )
};

// create Writing sub-header string
export function setWritingSubheader(entity) {
    const subheaderLines = {
        date: entity.attributes.properties.date,
        proposalResponse: entity.attributes.properties.proposal,
        notes: entity.attributes.properties.notes
    }
    return (
        subheaderLines
    )
};