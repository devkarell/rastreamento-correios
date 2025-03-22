import * as translationHandler from './translations/handler.js'
import config from './env/config.js'

const barcodesContainer = document.querySelector('.barcodes-container');
const templateBarcode = document.getElementById('barcode-box1');
const trackingObjectsForm = document.querySelector('.search-form')

const instanceNewBarcodeBtn = document.getElementById('add-barcode');

let createdSearchNodes = barcodesContainer.getElementsByClassName('barcode-box').length;

function isLastNodeValid() {
    let currentLanguage = document.documentElement.getAttribute('lang')
    let translatedAlerts = translationHandler.getTranslatedAlerts()
    
    if (createdSearchNodes >= config.objectSearchLimits) {
        return alert(translatedAlerts.searchLimit[currentLanguage].replace('{{MAX_SEARCH_CODES}}', config.objectSearchLimits));
    }
    
    let lastNode = barcodesContainer.getElementsByClassName('barcode-box')[createdSearchNodes - 1];
    let lastNodeValue = lastNode.value.toUpperCase()
    let lastNodeTest = config.objectsRegExFormat.test(lastNodeValue)

    if (!lastNodeTest) {
        return alert(lastNode.value === '' ? translatedAlerts.emptyField[currentLanguage] : translatedAlerts.invalidCode[currentLanguage].replace('{{SEARCH_CODE}}', lastNodeValue));
    }

    return lastNodeTest;
}

barcodesContainer.addEventListener('input', function(event) {
    if (event.target.classList.contains('barcode-box')) {
        event.target.value = event.target.value.replace(/[^A-Za-z0-9]/g, ''); 
    }
})

instanceNewBarcodeBtn.addEventListener('click', function() {
    if (!isLastNodeValid()) return;

    let clone = templateBarcode.cloneNode();
    clone.id = `barcode-box${createdSearchNodes + 1}`;
    clone.value = "";
    clone.removeAttribute('autofocus');
    createdSearchNodes++

    barcodesContainer.appendChild(clone);
})

trackingObjectsForm.addEventListener('submit', function(event) {
    if (!isLastNodeValid()) return event.preventDefault();
})

// update the #search-form-title based on the config.objectSearchLimits
let searchLimitLabel = document.getElementById('search-form-title')
searchLimitLabel.innerHTML = searchLimitLabel.innerHTML.replace('{{MAX_SEARCH_CODES}}', config.objectSearchLimits)

// connect the document's translation handler
translationHandler.bootstrap()