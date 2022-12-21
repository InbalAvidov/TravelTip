export const weatherService = {
    getWeather
}

import {storgeService } from "./storage.service.js"

window.gTimeOutId = ''

function getWeather({ lat = 31, lng = 31, locName = 'Quatar' }) {
    console.log('hi from weather:')
    const KEY = 'weatherDB'
    const termLocMap = utilService.loadFromStorage(KEY) || {}
    // console.log('weatherInfo:',weatherInfo)
    if (termLocMap[locName]) {
        // console.log('weatherInfo:',weatherInfo)
        return Promise.resolve(termLocMap[locName])
    }

    console.log('Getting from Network')
    //  clearTimeout(timeOutId)
    const API_KEY = '30dc2cce8468139852bf28b9c5bed2a9'
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`).then(res => {
        const { name, sys, weather, main, wind } = res.data
        const { country } = sys
        const { description } = weather[0]
        const { temp, temp_min, temp_max } = main
        const { speed } = wind
        const weatherInfo = {
            country,
            city: name,
            // flag,
            desc: description,
            AvgTemp: temp,
            minTemp: temp_min,
            maxTemp: temp_max,
            wind: speed
        }
        console.log('weatherInfo to storage:',weatherInfo)
        termLocMap[locName] = weatherInfo
        // console.log('info to storage:', weatherInfo[locName])
        utilService.saveToStorage(KEY, termLocMap)
        setTimeout(() => utilService.cleanStorage(), 1000 * 60 * 60 * 24)
        console.log('info:', weatherInfo)
        return weatherInfo
    })
        .catch(console.log('error while loading weater'))
}

