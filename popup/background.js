var scrollRatioDisplay = 0.8; //Integer.parseInt(document.getElementById("scrollX10").value);

function populateVals(change){
  localStorage.setItem('ratio', document.getElementById("scrollX").value);
  setVals(change);
}

function setVals(change){
  var currentRatio = Integer.parseInt(localStorage.getItem('ratio'));
  document.getElementById("scrollX").value = currentRatio;
}

// if (sessionStorage.getItem("srd")) {
//   // Restore the contents of the text field
//   scrollRatioDisplay = Integer.parseInt(sessionStorage.getItem("srd"));
// }
// sessionStorage.setItem("srd", scrollRatioDisplay.toString());
// document.getElementById("scrollX").value = scrollRatioDisplay/10;

// // Refresh and update scrollRatioDisplay on change
function refreshSR(sr, change){
  sr += change;
  //sessionStorage.setItem("srd", sr.toString());
  document.getElementById("scrollX").value = sr;
  return sr;
}
// Sends a message using active tab info
function sendMsg(actionMessage){
  // console.log(actionMessage);
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {action: actionMessage});
  });
}
// Event listeners
document.getElementById('startButton').addEventListener('click', () => { sendMsg("button1Click") });
document.getElementById('stopButton').addEventListener('click', () => { sendMsg("button2Click") });
document.getElementById('nextButton').addEventListener('click', () => { sendMsg("button3Click") });
document.getElementById('plusButton').addEventListener('click', () => {
  // console.log("add");
  scrollRatioDisplay = refreshSR(scrollRatioDisplay, 0.1);
  sendMsg("plus");
});
document.getElementById('minusButton').addEventListener('click', () => {
  // console.log("sub");
  scrollRatioDisplay = refreshSR(scrollRatioDisplay, -0.1);
  sendMsg("minus");
});


// // Reset scroll on tab update
// browser.tabs.onUpdated.addListener(() => {
//   // console.log('location changed!');
//   scrollRatioDisplay = Integer.parseInt(sessionStorage.getItem("srd"));
//   document.getElementById("scrollX").value = (scrollRatioDisplay).toFixed(1);
// });

//scrollRatioDisplay.onchange = populateVals;