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
            if (message.functionName === 'setFromTextAphabetically') {
                sendResponse(setFromTextAphabetically())
            }
            if (message.functionName === 'sortWordsByCount') {
                sendResponse(sortWordsByCount())
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
    console.log('sortAllTextAphabetically')
    const text = document.body.innerText
    const wordsArr = text.split(/\s+/).sort()
    let result;

    var i;
    for (i = 0; i < wordsArr.length; i++) {
        result += wordsArr[i] + "<br>";
    }
    return result
}

function setFromTextAphabetically(){
    console.log('setFromTextAphabetically')
    const text = document.body.innerText
    const wordsArr = text.split(/\s+/).sort()

    const set = new Set()

    wordsArr.forEach(element => {
        set.add(element)
    });

    console.log(set)
    let result;

    set.forEach(element => {
        result += element + "<br>"
    })
    return result
}

function sortWordsByCount(){
    console.log('sortWordsByCount')
    const text = document.body.innerText
    const wordsMap = text.split(/\s+/).reduce(function(map, word){
        map[word] = (map[word]||0)+1;
        return map;
    }, Object.create(null));
    
    const sortedArr = Object.entries(wordsMap).sort((a,b) => b[1]-a[1])
    
    let result;

    var i;
    for (i = 0; i < sortedArr.length; i++) {
        result += sortedArr[i][1] + " " + sortedArr[i][0]  + "<br>";
    }
    return result
}