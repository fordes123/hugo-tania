import ThemeColorScheme from "ts/colorScheme"
import { renderCopyButton } from "ts/copyButton"
import { renderFootnotes } from "ts/footnotes"
import { initTocObserver } from "ts/toc"

let enableFootnotes = false
if (document.currentScript) {
    enableFootnotes = document.currentScript.dataset.enableFootnotes == 'true'
}

const init = () => {
    new ThemeColorScheme(document.getElementById('dark-mode-button'))
    if (enableFootnotes) {
        renderFootnotes()
    }
    renderCopyButton()
    initTocObserver()
}

window.addEventListener('load', () => {
    setTimeout(function () {
        init()
    }, 0)
})
