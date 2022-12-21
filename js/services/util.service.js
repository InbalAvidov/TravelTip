export const utilService={
    debounce
}


function debounce(func, wait) {
    console.log('debounce')
    let timeout

    return function (...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}