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
    preferencesAcceptText: `Accept`,
}

const cookieBanner = ({
    text = defaultOptions.text,
    acceptText = defaultOptions.acceptText,
    rejectText = defaultOptions.rejectText,
    moreText = defaultOptions.moreText,
    preferencesText = defaultOptions.preferencesText,
    overlayTheme = defaultOptions.overlayTheme,
    bannerTheme = defaultOptions.bannerTheme,
    preferencesAcceptText = defaultOptions.preferencesAcceptText,
    title,
    onAccept,
    onReject,
    onMore,
    fullScreen,
    parentClass,
    preferences,
    onPreferencesAccept,
} = defaultOptions) => {
    const cookiesAllowed = localStorage.getItem(`cb-cookiesAllowed`) === `true`

    // if cookies have already been allowed, no need to render banner
    if (!cookiesAllowed) {
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
                                <form id='cb-preferences-form'>
                                    ${preferences
                                        .map(
                                            (p) =>
                                                `<label>
                                        <input type="checkbox" name="${p.name}" checked="false" />
                                        <span>${p.label}</span>
                                    </label>`
                                        )
                                        .join(``)}
                                    <button
                                        type='submit'
                                        id='cb-preferences-accept'
                                    >
                                        ${preferencesAcceptText}
                                    </button>
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
            localStorage.setItem(`cb-cookiesAllowed`, true)
            onAccept && onAccept()
        })

        const rejectButton = document.getElementById(`cb-reject`)
        rejectButton.addEventListener(`click`, () => {
            removeBanner(fullScreen)
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
            preferencesButton.addEventListener(`click`, () => {
                const preferencesForm = document.getElementById(
                    `cb-preferences-form`
                )
                if (preferencesForm.style.display !== `grid`) {
                    preferencesForm.style.display = `grid`
                    document.getElementById(`cb-accept`).textContent += ' All'
                    document.getElementById(`cb-reject`).textContent += ' All'
                }
            })

            const preferencesForm = document.getElementById(
                `cb-preferences-form`
            )
            preferencesForm.addEventListener(`submit`, (e) => {
                e.preventDefault()
                const values = {}
                preferences.forEach((p) => {
                    values[p.name] = preferencesForm.elements[p.name].checked
                })
                removeBanner(fullScreen)
                localStorage.setItem(`cb-cookiesAllowed`, true)
                onPreferencesAccept && onPreferencesAccept(values)
            })
        }
    }
}

export default cookieBanner
