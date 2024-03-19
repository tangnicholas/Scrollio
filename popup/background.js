var scrollRatioDisplay = 0.8;
const scrollValueInputElement = document.getElementById("scrollX");

// on startup
function handleStartup() {
  console.log("On Startup");
  console.log("typeof ratio: " + typeof(localStorage.getItem('ratio')));
  var currRatio = localStorage.getItem('ratio');
  if (!currRatio) {
    localStorage.setItem('ratio', scrollRatioDisplay);
  } else {
    scrollRatioDisplay = Number.parseFloat(currRatio);
  }
  scrollValueInputElement.value = scrollRatioDisplay;
}

/**
 * Save the current value in the scrollX element to the
 * ratio variable in local storage.
 */
function saveScrollValue() {
  console.log("saveScrollValue: What is scrollRatioDisplay? " + scrollRatioDisplay);  
  localStorage.setItem('ratio', scrollRatioDisplay);
  scrollValueInputElement.value = scrollRatioDisplay;
  populateDisplay(scrollRatioDisplay);
  console.log("Value: " + localStorage.getItem('ratio'));
}

/**
 * Start the process for the automatic scrolling msg to be
 * sent to the content script.
 */
function startProcess() {
  saveScrollValue();
  sendMsg("start");
}

/**
 * Update the text display with value
 * TODO: might need error checking
 * @param {var} value 
 */
function populateDisplay(value) {
  scrollValueInputElement.value = Number.parseFloat(value).toFixed(1);
}

// Sends a message using active tab info
function sendMsg(actionMessage) {
  console.log(actionMessage);
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    browser.tabs.sendMessage(tabs[0].id, { action: actionMessage });
  });
}

/**
 * Check if DOMContentLoaded is complete before adding event listeners
 * to elements.
 */
window.addEventListener("DOMContentLoaded", (event) => {
  // cotnrol variables.
  const startButtonElement = document.getElementById('startButton');
  const stopButtonElement = document.getElementById('stopButton');
  const nextButtonElement = document.getElementById('nextButton');

  // scroll value changers.
  const plusButtonElement = document.getElementById('plusButton');
  const subButtonElement = document.getElementById('minusButton');

  // adding event listeners.
  if (startButtonElement) {
    startButtonElement.addEventListener('click', () => {
      startProcess();
    });
  }

  if (stopButtonElement) {
    stopButtonElement.addEventListener('click', () => { sendMsg("stop") });
  }

  if (nextButtonElement) {
    nextButtonElement.addEventListener('click', () => { sendMsg("next") });
  }

  if (plusButtonElement) {
    plusButtonElement.addEventListener('click', () => {
      console.log("Plus button pressed.");
      scrollRatioDisplay = Number.parseFloat(scrollRatioDisplay) + 0.1;
      saveScrollValue();
    });
  }

  if (subButtonElement) {
    subButtonElement.addEventListener('click', () => {
      console.log("Minus button pressed.");
      scrollRatioDisplay = Number.parseFloat(scrollRatioDisplay) - 0.1;
      saveScrollValue();
    });
  }

  // Reset scroll on tab update
  browser.tabs.onUpdated.addListener(() => {
    console.log('location changed!');
    //document.getElementById("scrollX").value = 0.8;
    sendMsg("setValue");
  });

  handleStartup();
});


// Event listeners
//document.getElementById('startButton').addEventListener('click', () => { sendMsg("start") });
// document.getElementById('stopButton').addEventListener('click', () => { sendMsg("stop") });
// document.getElementById('nextButton').addEventListener('click', () => { sendMsg("next") });
// document.getElementById('plusButton').addEventListener('click', () => {
//   console.log("Plus button pressed.");

//   scrollRatioDisplay = refreshScrollRatio(scrollRatioDisplay, 0.1);
//   populateVals(scrollRatioDisplay);
//   sendMsg("plus");
// });

// document.getElementById('minusButton').addEventListener('click', () => {
//   console.log("Minus button pressed.");
//   scrollRatioDisplay = refreshScrollRatio(scrollRatioDisplay, -0.1);
//   populateVals(scrollRatioDisplay);
//   sendMsg("minus");
// });

