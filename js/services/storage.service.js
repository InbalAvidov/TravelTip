export const storgeService = {
    saveToStorage,
    loadFromStorage,
    cleanStorage
}

function cleanStorage(key){
   saveToStorage(key,null)
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

