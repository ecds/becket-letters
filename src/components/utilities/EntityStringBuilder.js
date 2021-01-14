import React from 'react';

// Attendance
export function setAttendanceLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const attendanceLabelString = [
            entity.attributes.properties['event-type'],
            entity.attributes.label,
            entity.attributes.properties['place-date'],
        ].filter(function (element) {
            if (element !== null || element !== '' || element !== ' ') {
                return element
            }
            else {
                return (
                    null
                )
            }
        }).join(', ');
        return <span dangerouslySetInnerHTML={{ __html: `${attendanceLabelString}.` }} />;
    }
};

// Music
export function setMusicLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const altSpellings = entity.attributes.properties['alternative-titles'].filter(function (element) {
            if (element !== null || element !== '' || element !== ' ') {
                return element
            }
            else {
                return (
                    null
                )
            }
        }).join(', ');
        let altSpellingsString = ''
        if (altSpellings) {
            altSpellingsString = ` [${altSpellings}]`
        }
        const musicLabel = [
            entity.attributes.properties.composer,
            entity.attributes.label,
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
        let musicLabelString = musicLabel.join(', ')
        return <span dangerouslySetInnerHTML={{ __html: `${musicLabelString}${altSpellingsString}.` }} />;
    }
};

// Organization
export function setOrganizationLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const altSpellings = entity.attributes.properties['alternate-spellings'].filter(function (element) {
            if (element !== null || element !== '' || element !== ' ') {
                return element
            }
            else {
                return (
                    null
                )
            }
        }).join(', ');
        let altSpellingsString = ''
        if (altSpellings) {
            altSpellingsString = ` [${altSpellings}]`
        }
        let headerString = `${entity.attributes.label}${altSpellingsString}`
        return (
            <>
                <span dangerouslySetInnerHTML={{ __html: headerString }} />
                .
            </>
        );
    }
};

// Person
export function setPersonLabel(entity) {
    if (entity.attributes.label === null || entity.attributes.label === '' || entity.attributes.label === ' ') {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        let lifeDatesString = '';
        if (entity.attributes.properties['life-dates']) {
            lifeDatesString = ` ${entity.attributes.properties['life-dates']}`;
        };
        let descriptionString = '';
        if (entity.attributes.properties.description) {
            descriptionString = ` ${entity.attributes.properties.description}.`;
        }
        let headerString = `${entity.attributes.label}${lifeDatesString}.${descriptionString}`
        return <>
            <span dangerouslySetInnerHTML={{ __html: `${headerString} ` }} />
        </>;
    }
};

// Place
export function setPlaceLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        return (
            <>
                <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} />
                {entity.attributes.description ? <span dangerouslySetInnerHTML={{ __html: `, ${entity.attributes.description}` }} /> : null}
                .
            </>
        );
    }
}

// Production
export function setProductionLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const productionLabel = [
            entity.attributes.properties['theatre'],
            entity.attributes.properties['city'],
            entity.attributes.properties['date'],
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
        let productionLabelString = productionLabel.join(', ');
        return (
            <>
                <span dangerouslySetInnerHTML={{ __html: `${entity.attributes.label}` }} />
                {entity.attributes.properties['director'] ? <span dangerouslySetInnerHTML={{ __html: `, dir. ${entity.attributes.properties['director']}` }} /> : null}
                {productionLabelString ? <span dangerouslySetInnerHTML={{ __html: `, ${productionLabelString}` }} /> : null}
                .
            </>
        )
            ;
    }
};

// Event
export function setEventLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        let eventDate = ''
        if (entity.attributes.properties.date) {
            eventDate = ` (${entity.attributes.properties.date})`
        }
        return <span dangerouslySetInnerHTML={{ __html: `${entity.attributes.label}${eventDate}.` }} />;
    }
};

// Publication
export function setPublicationLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const authorTitleTranslator = [
            entity.attributes.properties.author,
            entity.attributes.label,
            entity.attributes.properties.translator
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
        let publicationInfo = '';
        if (entity.attributes.properties['publication-information']) {
            publicationInfo = ` ${entity.attributes.properties['publication-information']}`
        };
        let publicationLabelString = authorTitleTranslator.join(', ') + publicationInfo;
        return <span dangerouslySetInnerHTML={{ __html: `${publicationLabelString}.` }} />;
    }
};

// Reading
export function setReadingLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const authorsList = entity.attributes.properties.authors.filter(function (element) {
            if (element !== null || element !== '' || element !== ' ') {
                return element
            }
            else {
                return (
                    null
                )
            }
        }).join(', ');
        let authorsString = ''
        if (authorsList) {
            authorsString = `${authorsList}, `
        };
        let publicationString = '';
        if (entity.attributes.properties.publication) {
            publicationString = ` ${entity.attributes.properties.publication}`
        }
        let headerString = `${authorsString}${entity.attributes.label}${publicationString}`
        return (
            <>
                <span dangerouslySetInnerHTML={{ __html: `${headerString}.` }} />
            </>
        )
    }
};

// Repository
export function setRepositoryLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        return <span dangerouslySetInnerHTML={{ __html: `${entity.attributes.label}` }} />;
    }
};

// Translating
export function setTranslatingLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const translatingLabel = [
            entity.attributes.properties.author,
            entity.attributes.label,
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
        let translatingLabelString = translatingLabel.join(', ') + '.';
        let translatedIntoString = ''
        if (entity.attributes.properties['translated-into'] || entity.attributes.properties.translator) {
            translatedIntoString = ` Translated ${entity.attributes.properties['translated-into'] ? `${entity.attributes.properties['translated-into']}` : null} ${entity.attributes.properties.translator ? ` by ${entity.attributes.properties.translator}` : null}.`
        }
        return <span dangerouslySetInnerHTML={{ __html: `${translatingLabelString}${translatedIntoString}` }} />;
    }
};

// Work of Art
export function setWorkOfArtLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const workOfArtLabel = [
            entity.attributes.label,
            entity.attributes.description,
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
        let workOfArtLabelString = workOfArtLabel.join(', ')
        return (
            <>
                {entity.attributes.properties.artist ? <span dangerouslySetInnerHTML={{ __html: `${entity.attributes.properties.artist}` }} /> : null}
                {entity.attributes.properties.artist && workOfArtLabelString ? ', ' : null}
                {workOfArtLabelString ? <span dangerouslySetInnerHTML={{ __html: `${workOfArtLabelString}.` }} /> : null}
            </>
        )

    }
};

// Writing
export function setWritingLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        let writingLabel = [
            entity.attributes.label,
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
        let writingLabelString = writingLabel.join(', ')
        return <span dangerouslySetInnerHTML={{ __html: `${writingLabelString}.` }} />;
    }
};