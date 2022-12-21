export const mapService = {
    initMap,
    addMarker,
    panTo,
    search,
    spliceMarker,
    addMarkers
}

import { locService } from './loc.service.js'
import { appController } from '../app.controller.js'
import { utilService } from './storage.service.js'
import { storageService } from './async-storage.service.js'


// Var that is used throughout this Module (not global)
var gMap
var gMarkers 
var MARKERS_KEY = 'markers'

function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then(() => {
            const myLatlng = { lat, lng }
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: myLatlng,
                zoom: 15
            })

            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to add Location!",
                position: myLatlng,
            })

            infoWindow.open(gMap)
            gMap.addListener("click", (mapsMouseEvent) => {

                infoWindow.close()
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                })
                infoWindow.setContent(
                    JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                )
                const newLocation = JSON.parse(infoWindow.content)
                locService.save(newLocation)
                    .then(appController.renderLocations())
                    .then((loc) => addMarker(loc))
            })
        })

}

function addMarkers() {
    gMarkers = utilService.loadFromStorage(MARKERS_KEY)
    if (!gMarkers || gMarkers.length === 0) 
    {
        gMarkers = []
        return
    }
    gMarkers.forEach(marker => {
        const { lat, lng } = marker
        var marker = new google.maps.Marker({
            position: { lat, lng },
            map: gMap,
            title: marker.name,
            id: marker.id
        })
    })
}

function addMarker({ lat, lng, name, id }) {
    var marker = new google.maps.Marker({
        position: { lat, lng },
        map: gMap,
        title: name,
        id,
    })
    gMarkers.push({lat,lng,name,id})
    utilService.saveToStorage(MARKERS_KEY, gMarkers)
}


function spliceMarker(id) {
    const idx = gMarkers.findIndex(marker => marker.id === id)
    gMarkers.splice(idx, 1)
    utilService.saveToStorage(MARKERS_KEY, gMarkers)
    initMap()
}


function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDLez0mB8_Kg8kCSsX6FMsWyPrDtejo2xQ'
    const API = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = API
    elGoogleApi.async = true
    document.body.append(elGoogleApi)
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function search(locName) {
    const API_KEY_GE0 = `AIzaSyA6WG8zW9hBoHIkuiS2mbS4GQ8zME2jg04`
    const API_GEO = `https://maps.googleapis.com/maps/api/geocode/json?address=${locName}&key=${API_KEY_GE0}`
    return axios.get(API_GEO).then(loc => {
        console.log(locName)
        console.log(loc.data.results[0].geometry.location)
    })
}











