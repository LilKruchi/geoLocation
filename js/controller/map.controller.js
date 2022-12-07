'use strict';


$(document).ready(injectAPI())
$(document).ready(onInit)
$('.btn-container').append('<button onclick="deleteMarkers()" class="btn btn-primary ml-1 p-3">Delete markers</button>')

let gMap
window.initMap = initMap

function onInit() {

    console.log('Data loaded & Reset');
    setTimeout(() => {

        getPos()
        console.clear()
    }, 500)
}


function injectAPI() {

    $('<script>').attr({
        src: API_KEY,
    }).appendTo('body')

}

function getPos() {
    if (!navigator.geolocation) {
        alert('Your browser dosent support geolocation')
        return
    }

    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
}

function showLocation(pos) {
    const { latitude: lat, longitude: lng, accuracy } = pos.coords

    let date = new Date(pos.timestamp)
    initMap(lat, lng)
}



function initMap(lat = 2, lng = 3) {
    if (returnMarkers().length === null || !returnMarkers()) {
        saveMarkers(makeId(), lat, lng, 'Home')
    }
    let contentStr = `<h3>Home </h3>`
    let elMap = document.querySelector('.map')
    let { mapCoordsLat: userLat, mapCoordsLong: userLng, zoom: userZoom } = getUserData()


    const infowindow = new google.maps.InfoWindow({
        content: contentStr,
        ariaLabel: "Uluru",
    });

    let options = {
        center: { lat, lng },
        zoom: 11
    }

    let map = new google.maps.Map(
        elMap,
        options,
    )

    let marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Test',
        animation: google.maps.Animation.DROP,
        minWidth: 370,
        draggable: (lat > 85.04 || lat < -85.04) ? false : true
    })

    getClickPos(map, marker)
    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
        });
    });


    gMap = elMap
    map.setZoom(+userZoom)
    // displayMarkers(marker)
    setOnMap(map, marker)
}

// function resetMap(map) {
//     // let { mapCoordsLat: lat, mapCoordsLong: lng } = getUserData()
//     console.log(map);
//     // new google.maps.setCenter(lat, lng);
// }


function saveMarkerData(ev, id) {
    ev.preventDefault()
    $('')
}

function addMarker(id, map, location) {

    let contentStr =
        `<h3>PlaceHolder </h3>
    <form class="id-${id}" onsubmit="saveMarkerData(event, id)">
        Name: <input type="text">
        <button class="id-${id}">Save</button>
    </form>
`

    const infowindow = new google.maps.InfoWindow({
        content: contentStr,
        ariaLabel: "Uluru",
    });

    let marker = new google.maps.Marker({
        position: location,
        draggable: true,
        map: map
    });

    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
        });
    });

}

function setOnMap(map) {
    let test = returnMarkers()

    for (var i = 0; i < test.length; i++) {
        // new google.maps.Map({ lat: test[i].lat, lng: test[i].lng })
        addMarker(test[i].id, map, { lat: test[i].lat, lng: test[i].lng })
    }
}

function getClickPos(map, marker) {
    return map.addListener("click", (mapsMouseEvent) => {
        let gTempId = makeId()
        let clickCoords = { lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng() }
        changeMarkerPos(gTempId, map, marker, clickCoords)
    })
}

function changeMarkerPos(id, map, marker, { lat, lng }) {
    if (lat > 85.04 || lat < -85.04) return
    let newPos = new google.maps.LatLng(lat, lng)
    // marker.setPosition(newPos)

    saveMarkers(id, lat, lng, 'test')
    addMarker(id, map, newPos)
}

function displayMarkers() {
    let markers = returnMarkers()

    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(gMap)
    }
}


function handleLocationError(error) {
    let locationError = $('#locationError')

    switch (error.code) {
        case 0:
            locationError.html = "There was an error while retrieving your location: " + error.message
            break
        case 1:
            locationError.html = "The user didn't allow this page to retrieve a location."
            break
        case 2:
            locationError.html = "The browser was unable to determine your location: " + error.message
            break
        case 3:
            locationError.html = "The browser timed out before retrieving the location."
            break
    }
}

function deleteMarkers() {
    let markers = returnMarkers()
    markers = []
    updateMarkers(markers)
    initMap()

}

// function centerUser(map) {
//     let { mapCoordsLat: userLat, mapCoordsLong: userLng } = getUserData()
//     const userCoords = { lat: +1, lng: +2 }

// }
