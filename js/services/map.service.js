export const mapService = {
    initMap,
    addMarker,
    panTo,
    search
}

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    // console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            const myLatlng = { lat, lng }
            // console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: myLatlng,
                zoom: 15
            })
            // Create the initial InfoWindow.
            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: myLatlng,
            });

            infoWindow.open(gMap);
            // Configure the click listener.
            gMap.addListener("click", (mapsMouseEvent) => {
                // Close the current InfoWindow.
                infoWindow.close();
                // Create a new InfoWindow.
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });
                infoWindow.setContent(
                    JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                );
                infoWindow.open(gMap);
            });
            // console.log('Map!', gMap)
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
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








