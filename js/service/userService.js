'use strict';

const STORAGE_KEY = 'userdata'


function saveUserData(obj) {
    console.log('Saved user data');
    saveToStorage(STORAGE_KEY, obj)
}