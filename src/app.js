import * as translator from './components/translator.js'
import config from './utils/configs.js'

const barcodesContainer = document.getElementById('barcodes-container');
const templateBarcode = document.getElementById('barcode-box1');
const trackingObjectsForm = document.getElementById('search-form');
const instanceNewBarcodeBtn = document.getElementById('add-barcode');

let createdSearchNodes = barcodesContainer.getElementsByClassName('barcode-box').length;

function isLastNodeValid() {
    let currentLanguage = document.documentElement.getAttribute('lang');
    let translatedAlerts = translator.getTranslatedAlerts();

    if (createdSearchNodes >= config.objectSearchLimits) {
        return alert(translatedAlerts.searchLimit[currentLanguage].replace(
            '{{MAX_SEARCH_CODES}}', config.objectSearchLimits
        ));
    }

    let lastNode = barcodesContainer.getElementsByClassName('barcode-box')[createdSearchNodes - 1];
    let lastNodeValue = lastNode.value.toUpperCase();
    let lastNodeTest = config.objectsRegExFormat.test(lastNodeValue);

    if (!lastNodeTest) {
        return alert(
            lastNode.value === '' ? translatedAlerts.emptyField[currentLanguage] :
                translatedAlerts.invalidCode[currentLanguage].replace('{{SEARCH_CODE}}', lastNodeValue)
        );
    }

    return lastNodeTest;
}

barcodesContainer.addEventListener('input', function (event) {
    let eventTarget = event.target;

    if (eventTarget.classList.contains('barcode-box')) {
        eventTarget.value = eventTarget.value.replace(/[^A-Za-z0-9]/g, '');
    }
})

instanceNewBarcodeBtn.addEventListener('click', function () {
    if (!isLastNodeValid()) return;

    let clone = templateBarcode.cloneNode();
    clone.id = `barcode-box${createdSearchNodes + 1}`;
    clone.value = "";
    clone.removeAttribute('autofocus');
    createdSearchNodes++;

    barcodesContainer.appendChild(clone);
})

trackingObjectsForm.addEventListener('submit', function (event) {
    if (!isLastNodeValid()) return event.preventDefault();
})

// update the #search-title based on the config.objectSearchLimits
let searchLimitLabel = document.getElementById('search-title');
searchLimitLabel.innerHTML = searchLimitLabel.innerHTML.replace('{{MAX_SEARCH_CODES}}', config.objectSearchLimits);

// connect the document's translator
translator.bootstrap();