import React from 'react';

// create Attendance label string
export function setAttendanceLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        return <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} />;
    }
};

// create Music label string
export function setMusicLabel(entity) {
    console.log(entity)
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const musicLabel = [
            entity.attributes.label,
            entity.attributes.properties.composer
        ].filter(function (element) {
            return element != null;
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
        return <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} />;
    }
};

// create Person label string
export function setPersonLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        return <span dangerouslySetInnerHTML={{ __html: `${entity.attributes.label} (${entity.attributes.properties['life-dates']})` }} />;
    }
};

// create Place label string
export function setPlaceLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        return <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} />;
    }
}

// create Production label string
export function setProductionLabel(entity) {
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const productionLabel = [
            entity.attributes.properties['city'],
            entity.attributes.properties['date'],
            entity.attributes.properties['director'],
            entity.attributes.properties['theatre']
        ].filter(function (element) {
            return element != null;
        });
        let productionLabelString = productionLabel.join(', ');
        return <span dangerouslySetInnerHTML={{ __html: `${entity.attributes.label}, ${productionLabelString}.` }} />;
    }
};

// create Event label string
export function setEventLabel(entity) {
    console.log(entity);
    if (!entity.attributes.label) {
        return <span dangerouslySetInnerHTML={{ __html: entity.id }} />
    }
    else {
        const publicEventLabel = [
            entity.attributes.label,
            entity.attributes.properties.date
        ].filter(function (element) {
            return element != null;
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
            return element != null;
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
            authorsListString = ' by ' + entity.attributes.properties.authors.join(', ');
        }
        else {
            // authorsListString = 'fkds';
        }
        const readingLabel = [
            entity.attributes.label,
            authorsListString ? authorsListString : null,
            entity.attributes.properties.publication
        ].filter(function (element) {
            return element != null;
        });
        let readingLabelString = readingLabel.join(', ');
        return <span dangerouslySetInnerHTML={{ __html: `${readingLabelString}` }} />;
    }
};

// create Repository label string
export function setRepositoryLabel(entity) {
    console.log(entity)
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
            entity.attributes.properties.author
        ].filter(function (element) {
            return element != null;
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
            entity.attributes.label,
            entity.attributes.properties.artist
        ].filter(function (element) {
            return element != null;
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
        return <span dangerouslySetInnerHTML={{ __html: entity.attributes.label }} />;
    }
};