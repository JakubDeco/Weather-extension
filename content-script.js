console.log("AHOJ, ja som content script")

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message.type === 'color-elements') {
            colorElements(message.color, message.elementName)
        }
        if (message.type === 'function-name') {
            if (message.functionName === 'getAllText') {
                sendResponse(getAllText())
            }
            if (message.functionName === 'sortAllTextAphabetically') {
                sendResponse(sortAllTextAphabetically())
            }
        }
    }
)

function colorElements(color, elementName) {
    const elements = document.getElementsByTagName(elementName)
    for (let e of elements) {
        e.style['background-color'] = color
    }
}

function getAllText() {
    console.log('getAllText')
    return document.body.innerText
}

function sortAllTextAphabetically() {
    const text = document.body.innerText
    const wordsArr = text.split(/\s+/).sort()
    let result;

    var i;
    for (i = 0; i < wordsArr.length; i++) {
        result += wordsArr[i] + "<br>";
    }
    return result
}