import { storageService } from "./async-storage.service.js"
import { utilService } from './storage.service.js'


const LOCS_KEY = 'location'
var gLocs

export const locService = {
    getLocs
}

_createLocs()


function _createLocs() {
    gLocs = utilService.loadFromStorage(LOCS_KEY)
    if (!gLocs || gLocs.length === 0) {
        gLocs = [
            { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
            { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
        ]
        utilService.saveToStorage(LOCS_KEY, gLocs)
    }
}


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs)
        }, 1000)
    })
}


