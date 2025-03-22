import alertsData from './alertsTranslateData.js'
import indexData from './indexTranslateData.js'
import config from '../utils/configs.js';

function translatePage(language) {
    document.documentElement.setAttribute('lang', language);

    for (let element in indexData) {
        document.getElementById(element).innerHTML = indexData[element][language].replace('{{MAX_SEARCH_CODES}}', config.objectSearchLimits)
    }
}

export function getTranslatedAlerts() {
    return alertsData
}

export function bootstrap() {
    const languageSetButtons = document.getElementsByClassName('language-set')

    for (let btn of languageSetButtons) {
        btn.addEventListener('click', () => {
            translatePage(btn.id)
        })
    }
}