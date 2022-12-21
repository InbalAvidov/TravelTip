import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'

// import { storageService } from './services/async-storage.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos

function onInit() {
    onGetLocs()
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
        renderWeather(31,31,'Quatar')
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log(locs);
            const strHTML = locs.map(loc => {
                const pos = {lat:loc.lat, lng:loc.lng}
                return `<tr>
                    <td>${loc.name}</td>
                    <td>${loc.lat},${loc.lng}</td>
                    <td>
                    <button onclick="onPanTo(${loc.lat}, ${loc.lng})">Go</button>
                    <button>Delete</button>
                    </td>
                </tr>`
            }
            )
            document.querySelector('table').innerHTML += strHTML.join('')
        })
}

function onGetUserPos(ev) {
    ev.preventDefault()
    getPosition()
        .then(location => {
            const {latitude:lat, longitude:lng} = location.coords
            onPanTo(lat,lng)

        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo(lat,lng) {
    mapService.panTo(lat, lng)
}

function renderWeather(lat,lng,locName){
 weatherService.getWeather(lat,lng,locName).then(weather=>{ 
 console.log('weather at render:',weather)
 const {country,city,desc,AvgTemp,minTemp,maxTemp,wind}=weather
 const strHTML= `
 <p><span class="place">${city}, ${country}</span><span class="desc"> ${desc}</span></p>
 <p><span class="temp">${AvgTemp}</span> temperture from ${minTemp} to ${maxTemp}.wind ${wind} m/s </p>
 `
 document.querySelector('.weather').innerHTML=strHTML
})

}