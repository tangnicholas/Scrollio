var scrollRatioDisplay = 0.8;//Integer.parseInt(document.getElementById("scrollX10").value);

// Functions to store into local storage, doesn't work currently
function populateVals(change){
  localStorage.setItem('ratio', document.getElementById("scrollX").value);
  console.log("Value: " + localStorage.getItem('ratio'));
  //setVals(change);
}

// function setVals(change){
//   var currentRatio = Integer.parseInt(localStorage.getItem('ratio')) + change;
//   document.getElementById("scrollX").value = currentRatio.toString();
// }
// scrollRatioDisplay.onchange = populateVals;

// // Refresh and update scrollRatioDisplay on change
function refreshScrollRatioDisplay(sr, change){
  sr += change;
  //sessionStorage.setItem("srd", sr.toString());
  document.getElementById("scrollX").value = sr.toFixed(1);
  return sr;
}

// Sends a message using active tab info
function sendMsg(actionMessage){
  console.log(actionMessage);
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {action: actionMessage});
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
    startButtonElement.addEventListener('click', () => { sendMsg("start") });
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
    
      scrollRatioDisplay = refreshScrollRatioDisplay(scrollRatioDisplay, 0.1);
      populateVals(scrollRatioDisplay);
      sendMsg("plus");
    });
  }

  if (subButtonElement) {
    subButtonElement.addEventListener('click', () => {
      console.log("Minus button pressed.");

      scrollRatioDisplay = refreshScrollRatioDisplay(scrollRatioDisplay, -0.1);
      populateVals(scrollRatioDisplay);
      sendMsg("minus");
    });
  }

  // Reset scroll on tab update
  browser.tabs.onUpdated.addListener(() => {
    console.log('location changed!');
    //document.getElementById("scrollX").value = 0.8;
    sendMsg("setValue");
  });
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

