import translations from './data.js'
import alerts from './alerts.js'
import config from '../env/config.js';

function translatePage(language) {
    document.documentElement.setAttribute('lang', language);
    
    for (let element in translations) {
        document.getElementById(element).innerHTML = translations[element][language].replace('{{MAX_SEARCH_CODES}}', config.objectSearchLimits)
    }
}

export function getTranslatedAlerts() {
    return alerts
}

export function bootstrap() {
    const languageSetButtons = document.getElementsByClassName('language-set')

    for (let btn of languageSetButtons) {
        btn.addEventListener('click', () => {
            translatePage(btn.id)
        })
    }
}