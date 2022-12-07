'use strict';

$(document).ready(onInit)

function onInit() {
    if (!loadFromStorage(STORAGE_KEY) || loadFromStorage(STORAGE_KEY).length) {
        $('body').css('background-color', 'white')
    } else {
        let { bgColor, txtColor } = loadFromStorage(STORAGE_KEY)
        $('body').css('background-color', bgColor)
    }
}

