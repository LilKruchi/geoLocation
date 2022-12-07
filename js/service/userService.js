'use strict';


function saveUserData(obj) {
    ('Saved user data');
    saveToStorage(STORAGE_KEY, obj)
}