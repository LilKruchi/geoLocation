'use strict';

let gMarkers = loadFromStorage(SAVED_LOCATIONS)

if (!loadFromStorage(SAVED_LOCATIONS) || loadFromStorage(SAVED_LOCATIONS).length === 0) {
    let gMarkers = []
}


function getUserData() {
    return loadFromStorage(STORAGE_KEY)
}

function _createMarkData(id, lat, lng, name) {
    return {
        id,
        lat,
        lng,
        name
    }
}

function saveMarkers(id, lat, lng, name) {
    gMarkers.push(_createMarkData(id, lat, lng, name))
    console.log(gMarkers);
    saveToStorage(SAVED_LOCATIONS, gMarkers)
}

function returnMarkers() {
    return gMarkers
}

function updateMarkers(markers) {
    gMarkers = markers
    saveToStorage(SAVED_LOCATIONS, gMarkers)
}