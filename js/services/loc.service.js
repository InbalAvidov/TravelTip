import { utilService } from './storage.service.js'
import { storageService } from './async-storage.service.js'


const LOCS_KEY = 'location'
var gLocs

export const locService = {
    getLocs,
    save,
    deleteLoc
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            gLocs = utilService.loadFromStorage(LOCS_KEY)
            resolve(gLocs)
        }
        ,1000)
    })
}

function save(loc) {
    loc.name = prompt('Location name?')
    loc.cratedAt = new Date().getHours() + ':' + new Date().getMinutes()
    return storageService.post(LOCS_KEY, loc)
}

function deleteLoc(id){
    return storageService.remove(LOCS_KEY,id)
}


