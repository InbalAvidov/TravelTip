import {storgeService} from './storage.service.js'
import {asStorageService } from './async-storage.service.js'


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
            gLocs = storgeService.loadFromStorage(LOCS_KEY)
            resolve(gLocs)
        }
        ,1000)
    })
}

function save(loc) {
    loc.name = prompt('Location name?')
    loc.cratedAt = new Date().getHours() + ':' + new Date().getMinutes()
    return asStorageService.post(LOCS_KEY, loc)
}

function deleteLoc(id){
    return asStorageService.remove(LOCS_KEY,id)
}


