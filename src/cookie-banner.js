import './cookie-banner.css'

const removeBanner = (fullScreen) => {
    let elem = document.getElementById(`cb-banner`)
    if (fullScreen) {
        elem = document.getElementById(`cb-overlay`)
    }
    elem.parentNode.removeChild(elem)
}

const defaultOptions = {
    text: `This website uses cookies. By clicking 'Accept' you agree to our use of cookies.`,
    acceptText: `Accept`,
    rejectText: `Reject`,
    moreText: `More Info`,
    preferencesText: `Preferences`,
    overlayTheme: `dark`,
    bannerTheme: `light`,
    preferencesSaveText: `Save`,
}

const cookieBanner = ({
    text = defaultOptions.text,
    acceptText = defaultOptions.acceptText,
    rejectText = defaultOptions.rejectText,
    moreText = defaultOptions.moreText,
    preferencesText = defaultOptions.preferencesText,
    overlayTheme = defaultOptions.overlayTheme,
    bannerTheme = defaultOptions.bannerTheme,
    preferencesSaveText = defaultOptions.preferencesSaveText,
    title,
    onAccept,
    onReject,
    onMore,
    fullScreen,
    parentClass,
    preferences,
    onPreferencesSave,
} = defaultOptions) => {
    const cookiesAccepted =
        localStorage.getItem(`cb-cookiesAccepted`) === `true`
    const cookiesRejected =
        sessionStorage.getItem(`cb-cookiesRejected`) === `true`
    const cookiePreferences = JSON.parse(
        localStorage.getItem(`cb-preferences`) ||
            sessionStorage.getItem(`cb-preferences`)
    )
    const showBanner = !(
        cookiesAccepted ||
        cookiesRejected ||
        cookiePreferences
    )

    if (showBanner) {
        const html = `
                ${parentClass ? `<div class="${parentClass}">` : ``}
                ${
                    fullScreen
                        ? `<div id="cb-overlay" class="cb-${overlayTheme}">`
                        : ``
                }
                <div id="cb-banner" class="cb-${bannerTheme}">
                    <div>
                        ${title ? `<h2 id="cb-title">${title}</h2>` : ``}
                        <p id="cb-text">${text}</p>
                        ${
                            preferences
                                ? `
                                <form id='cb-preferences-checkboxes'>
                                    ${preferences
                                        .map(
                                            (p) =>
                                                `<label>
                                        <input type="checkbox" name="${
                                            p.name
                                        }" ${
                                                    cookiePreferences &&
                                                    cookiePreferences[p.name]
                                                        ? `checked`
                                                        : ``
                                                } />
                                        <span>${p.label}</span>
                                    </label>`
                                        )
                                        .join(``)}
                                </form>
                            `
                                : ``
                        }
                        </div>
                    <div id="cb-buttons">
                        <button id="cb-accept">${acceptText}</button>
                        <button id="cb-reject">${rejectText}</button>
                        ${
                            onMore
                                ? `<button id="cb-more">${moreText}</button>`
                                : ``
                        }
                        ${
                            preferences
                                ? `<button id="cb-preferences">${preferencesText}</button>`
                                : ``
                        }
                    </div>
                </div>
                ${fullScreen ? `</div>` : ``}
                ${parentClass ? `</div>` : ``}
            `
        const div = document.querySelector(`body`)
        div.insertAdjacentHTML(`beforeend`, html)

        const acceptButton = document.getElementById(`cb-accept`)
        acceptButton.addEventListener(`click`, () => {
            removeBanner(fullScreen)
            localStorage.setItem(`cb-cookiesAccepted`, true)
            onAccept && onAccept()
        })

        const rejectButton = document.getElementById(`cb-reject`)
        rejectButton.addEventListener(`click`, () => {
            removeBanner(fullScreen)
            sessionStorage.setItem(`cb-cookiesRejected`, true)
            onReject && onReject()
        })

        if (onMore) {
            const moreButton = document.getElementById(`cb-more`)
            moreButton.addEventListener(`click`, () => {
                onMore()
            })
        }

        if (preferences) {
            const preferencesButton = document.getElementById(`cb-preferences`)
            const preferencesCheckboxes = document.getElementById(
                `cb-preferences-checkboxes`
            )

            preferencesButton.addEventListener(`click`, () => {
                if (preferencesCheckboxes.style.display !== `grid`) {
                    preferencesCheckboxes.style.display = `grid`
                    document.getElementById(`cb-accept`).textContent += ` All`
                    document.getElementById(`cb-reject`).textContent += ` All`
                    preferencesButton.textContent = preferencesSaveText
                } else {
                    const values = {}
                    let storage = sessionStorage
                    preferences.forEach((p) => {
                        const checked =
                            preferencesCheckboxes.elements[p.name].checked
                        values[p.name] = checked

                        if (checked) storage = localStorage
                    })

                    removeBanner(fullScreen)

                    storage.setItem(`cb-preferences`, JSON.stringify(values))
                    onPreferencesSave && onPreferencesSave(values)
                }
            })
        }
    } else {
        cookiesAccepted && onAccept()
        cookiesRejected && onReject()
        cookiePreferences && onPreferencesSave(cookiePreferences)
    }
}

export default cookieBanner
