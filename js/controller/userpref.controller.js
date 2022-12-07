'use strict';

$(document).ready(onInit)

function onInit() {
    $('#zoom-span').text(16)
    $('#zoom').val(16)

    console.log('Data loaded & Reset');
    setTimeout(() => { console.clear() }, 1000)
}

function showZoom(val) {
    $('#zoom-span').text(val)
}

function onSubmitForm(ev) {
    ev.preventDefault()

    let firstName = $('#first-name').val()
    let bgColor = $('#bg-color').val()
    let txtColor = $('#txt-color').val()
    let zoom = $('#zoom').val()
    let mapCoordsLat = $('#coords-lat').val()
    let mapCoordsLong = $('#coords-long').val()

    let userData = {
        firstName,
        bgColor,
        txtColor,
        zoom,
        mapCoordsLat,
        mapCoordsLong,
    }
    // console.log(userData);
    saveUserData(userData)
}