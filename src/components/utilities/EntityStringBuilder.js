import React from 'react';

// create Attendance label string
export function setAttendanceLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const productionLabel = [
            entity.attributes.label,
            entity.attributes.properties['event-type'],
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
        });
        let attendanceLabelString = productionLabel.join('. ');
        return <span dangerouslySetInnerHTML={{ __html: `${attendanceLabelString}.` }} />;
    }
};

// create Music label string
export function setMusicLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const musicLabel = [
            entity.attributes.properties.composer,
            entity.attributes.label,
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
        let musicLabelString = musicLabel.join(', ')
        return <span dangerouslySetInnerHTML={{ __html: musicLabelString }} />;
    }
};

// create Organization label string
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

// create Person label string
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

// create Place label string
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

// create Production label string
export function setProductionLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const productionLabel = [
            entity.attributes.properties['director'],
            entity.attributes.properties['theatre'],
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
                {productionLabelString ? <span dangerouslySetInnerHTML={{ __html: `, ${productionLabelString}` }} /> : null}
                .
            </>
        )
            ;
    }
};

// create Event label string
export function setEventLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const publicEventLabel = [
            entity.attributes.label,
            entity.attributes.properties.date
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
        let publicEventLabelString = publicEventLabel.join(', ');
        return <span dangerouslySetInnerHTML={{ __html: `${publicEventLabelString}.` }} />;
    }
};

// create Publication label string
export function setPublicationLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const publicationLabel = [
            entity.attributes.label,
            entity.attributes.properties.author
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

// create Reading label string
export function setReadingLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        let authorsListString = null;
        if (entity.attributes.properties.authors.length !== 0) {
            authorsListString = entity.attributes.properties.authors.join(', ');
        }
        else {
            authorsListString = '';
        }
        return (
            <>
                {authorsListString ? <span dangerouslySetInnerHTML={{ __html: `${authorsListString}, ` }} /> : null}
                <span dangerouslySetInnerHTML={{ __html: `${entity.attributes.label}` }} />
                {entity.attributes.properties.publication ? <span dangerouslySetInnerHTML={{ __html: ` ${entity.attributes.properties.publication}` }} /> : null}
            </>
        )
    }
};

// create Repository label string
export function setRepositoryLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        return <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} />;
    }
};

// create Translating label string
export function setTranslatingLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const translatingLabel = [
            entity.attributes.label,
            entity.attributes.properties.author,
            entity.attributes.properties['translated-into'],
            entity.attributes.properties.translator,
            entity.attributes.properties['translated-title'],
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
        let translatingLabelString = translatingLabel.join(', ')
        return <span dangerouslySetInnerHTML={{ __html: translatingLabelString }} />;
    }
};

// create Work of Art label string
export function setWorkOfArtLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const workOfArtLabel = [
            entity.attributes.properties.artist,
            entity.attributes.label,
            entity.attributes.description,
            entity.attributes.properties['owner-location-accession-number-current'],
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
        return <span dangerouslySetInnerHTML={{ __html: workOfArtLabelString }} />;
    }
};

// create Writing label string
export function setWritingLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        let writingLabel = [
            entity.attributes.label,
            entity.attributes.properties.proposal,
            entity.attributes.properties.date,
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
        let writingLabelString = writingLabel.join(', ')
        return <span dangerouslySetInnerHTML={{ __html: writingLabelString }} />;
    }
};