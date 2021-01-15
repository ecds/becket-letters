// import React from 'react';

// create Attendance sub-header string
export function setAttendanceSubheader(entity) {
    let attendedWithString === '';
    if (entity.attributes.properties['attended-with'].length !== 0) {
        attendedWithString = 'Attended with ' + entity.attributes.properties['attended-with'].filter(function (element) {
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
    let attendedWithAndNotes = [attendedWithString, entity.attributes.properties.notes].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
            return element
        }
        else {
            return (
                null
            )
        }
    }).join('/');
    console.log(attendedWithAndNotes)
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
        attendedWithAndNotes: attendedWithAndNotes,
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
        description: entity.attributes.properties.description,
        performers: performers,
        notes: entity.attributes.properties.notes,
    }
    return (
        subheaderLines
    )
};

// create Organization sub-header string
export function setOrganizationSubheader(entity) {
    const subheaderText = {
        description: entity.attributes.properties.description,
    };
    return (
        subheaderText
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
    let prodCast = null;
    if (entity.attributes.properties.cast.length !== 0) {
        prodCast = entity.attributes.properties.cast.filter(function (element) {
            if (element !== null || element !== '' || element !== ' ') {
                return element
            }
            else {
                return (
                    null
                )
            }
        });
        prodCast = prodCast.join(', ')
    }
    let proposalString
    if (entity.attributes.properties.proposal) {
        proposalString = entity.attributes.properties.proposal
    }
    let responseReason
    if (entity.attributes.properties.response || entity.attributes.properties.reason) {
        let responseReasonArray = [entity.attributes.properties.response, entity.attributes.properties.reason].filter(function (element) {
            if (element !== null || element !== '' || element !== ' ') {
                return element
            }
            else {
                return (
                    null
                )
            }
        });
        responseReason = responseReasonArray.join(', ')
    }
    let stagingLinks
    if (entity.attributes.properties.links.length !== 0) {
        stagingLinks = entity.attributes.properties.links.filter(function (element) {
            if (element !== null || element !== '' || element !== ' ') {
                return `<a href={${element}}>{${element}}</a>`
            }
            else {
                return (
                    null
                )
            }
        });
        stagingLinks = stagingLinks.join(', ')
    }
    const subheaderLines = {
        proposal: proposalString,
        responseReason: responseReason,
        cast: prodCast,
        notes: entity.attributes.properties.notes,
        stagingLinks: stagingLinks 
    }
    return (
        subheaderLines
    )
};

// create Event sub-header string
export function setEventSubheader(entity) {
    const subheaderLines = {
        label: entity.attributes.properties.description,
        date: entity.attributes.properties.date,
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
        current: entity.attributes.properties['owner-location-accession-number-current'],
        contemporaneous: entity.attributes.properties['owner-location-accession-number-contemporaneous']
    };
    return (
        subheaderLines
    )
};

// create Writing sub-header string
export function setWritingSubheader(entity) {
    let proposalResponse = [entity.attributes.properties.proposal, entity.attributes.properties.response].filter(function (element) {
        if (element !== null || element !== '' || element !== ' ') {
            return element
        }
        else {
            return (
                null
            )
        }
    }).join('/');
    const subheaderLines = {
        proposalResponse: proposalResponse,
        date: entity.attributes.properties.date,
        notes: entity.attributes.properties.notes
    }
    return (
        subheaderLines
    )
};
