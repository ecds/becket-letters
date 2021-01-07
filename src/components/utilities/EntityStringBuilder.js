import React from 'react';

// Attendance
export function setAttendanceLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const attendanceLabelString = [
            entity.attributes.label,
            entity.attributes.properties['event-type'],
            entity.attributes.properties['director'],
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
        return (
            <>
                <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} />
                {entity.attributes.description ? <span dangerouslySetInnerHTML={{ __html: `, ${entity.attributes.description}` }} /> : null}
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
        return <>
            <span dangerouslySetInnerHTML={{ __html: `${entity.attributes.label} ` }} />
            {entity.attributes.properties['life-dates'] ? <span dangerouslySetInnerHTML={{ __html: ` (${entity.attributes.properties['life-dates']})` }} /> : null}
            {entity.attributes.properties.description ? <span dangerouslySetInnerHTML={{ __html: `, ${entity.attributes.properties.description}` }} /> : null}
            .
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
    if (!entity.attributes.properties.description) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        let eventDate = ''
        if (entity.attributes.properties.date) {
            eventDate = ` (${entity.attributes.properties.date})`
        }
        return <span dangerouslySetInnerHTML={{ __html: `${entity.attributes.properties.description}${eventDate}.` }} />;
    }
};

// Publication
export function setPublicationLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const publicationLabelPart2 = [
            entity.attributes.properties.place,
            entity.attributes.properties['publication-information'],
            entity.attributes.properties.date,
        ].filter(function (element) {
            if (element !== null || element !== '' || element !== ' ') {
                return element
            }
            else {
                return (
                    null
                )
            }
        }).join('/');
        const publicationLabel = [
            entity.attributes.properties.author,
            entity.attributes.label,
            entity.attributes.properties.translator,
            publicationLabelPart2
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
        let publicationLabelString = publicationLabel.join(', ')
        return <span dangerouslySetInnerHTML={{ __html: `${publicationLabelString}` }} />;
    }
};

// Reading
export function setReadingLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        let authorsListString = null;
        if (entity.attributes.properties.authors.length !== 0) {
            authorsListString = entity.attributes.properties.authors.join(', ');
        }
        return (
            <>
                {authorsListString ? <span dangerouslySetInnerHTML={{ __html: `${authorsListString}, ` }} /> : null}
                <span dangerouslySetInnerHTML={{ __html: `${entity.attributes.label}` }} />
                {entity.attributes.properties.publication ? <span dangerouslySetInnerHTML={{ __html: `, ${entity.attributes.properties.publication}` }} /> : null}
                .
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
        let translatedIntoString
        if (entity.attributes.properties['translated-into'] || entity.attributes.properties.translator) {
            translatedIntoString = `Translated ${entity.attributes.properties['translated-into'] ? `${entity.attributes.properties['translated-into']}` : null} ${entity.attributes.properties.translator ? ` by ${entity.attributes.properties.translator}` : null}.`
        }
        return <span dangerouslySetInnerHTML={{ __html: `${translatingLabelString} ${translatedIntoString}` }} />;
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
                {workOfArtLabelString ? <span dangerouslySetInnerHTML={{ __html: `${workOfArtLabelString} ` }} /> : null}
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
        return <span dangerouslySetInnerHTML={{ __html: `${writingLabelString}` }} />;
    }
};