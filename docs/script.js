function clearStorage() {
    sessionStorage.removeItem('cb-cookiesAccepted')
    sessionStorage.removeItem('cb-cookiesRejected')
    sessionStorage.removeItem('cb-preferences')

    localStorage.removeItem('cb-cookiesAccepted')
    localStorage.removeItem('cb-cookiesRejected')
    localStorage.removeItem('cb-preferences')

    const cb = document.getElementById('cb-banner')
    cb && cb.remove()
}

function defaultExample() {
    clearStorage()
    cookieBanner()
}

function fullScreenExample() {
    clearStorage()
    cookieBanner({
        fullScreen: true,
    })
}
