import React from 'react';

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
    if (!entity.attributes.description) {
        return (
            null
        )
    }
    else {
        return (
            <span dangerouslySetInnerHTML={{ __html: entity.attributes.description }} />
        )
    }
};

// create Writing sub-header string
export function setWritingSubheader(entity) {
};