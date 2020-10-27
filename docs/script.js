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

function onAcceptRejectExample() {
    clearStorage()
    cookieBanner({
        onAccept: function () {
            alert('User has accepted cookies')
        },
        onReject: function () {
            alert('User has rejected cookies')
        },
    })
}

function moreExample() {
    clearStorage()
    cookieBanner({
        onMore: function () {
            window.open('https://example.com', '_blank')
        },
    })
}

function fullScreenExample() {
    clearStorage()
    cookieBanner({
        fullScreen: true,
    })
}

function textExample() {
    clearStorage()
    cookieBanner({
        title: 'This is my title!',
        text:
            'This is where you can change the primary text that appears on the cookier banner.',
        acceptText: 'All good with me!',
        rejectText: 'No Thank you!',
    })
}

function preferencesExample() {
    clearStorage()
    cookieBanner({
        preferences: [
            { name: 'marketing', label: 'Marketing' },
            { name: 'advertising', label: 'Advertising' },
        ],
        preferencesSaveText: 'Save Preferences',
        onPreferencesSave: function (values) {
            if (values.marketing) {
                alert('User has accepted marketing cookies')
            }

            if (values.advertising) {
                alert('User has accepted advertising cookies')
            }
        },
    })
}

function darkModeExample() {
    clearStorage()
    cookieBanner({
        bannerTheme: 'dark',
    })
}

function customCssExample() {
    clearStorage()
    cookieBanner({
        parentClass: 'my-cookie-banner',
    })
}
