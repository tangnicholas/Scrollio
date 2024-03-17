var scrollRatioDisplay = 0.8;//Integer.parseInt(document.getElementById("scrollX10").value);

// // Functions to store into local storage, doesn't work currently
// function populateVals(change){
//   localStorage.setItem('ratio', document.getElementById("scrollX").value);
//   setVals(change);
// }
// function setVals(change){
//   var currentRatio = Integer.parseInt(localStorage.getItem('ratio')) + change;
//   document.getElementById("scrollX").value = currentRatio.toString();
// }
// scrollRatioDisplay.onchange = populateVals;

// // Refresh and update scrollRatioDisplay on change
function refreshSR(sr, change){
  sr += change;
  //sessionStorage.setItem("srd", sr.toString());
  document.getElementById("scrollX").value = sr.toFixed(1);
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
document.getElementById('startButton').addEventListener('click', () => { sendMsg("start") });
document.getElementById('stopButton').addEventListener('click', () => { sendMsg("stop") });
document.getElementById('nextButton').addEventListener('click', () => { sendMsg("next") });
document.getElementById('plusButton').addEventListener('click', () => {
  // console.log("add");
  // setVals(0.1);
  scrollRatioDisplay = refreshSR(scrollRatioDisplay, 0.1);
  sendMsg("plus");
});
document.getElementById('minusButton').addEventListener('click', () => {
  // console.log("sub");
  scrollRatioDisplay = refreshSR(scrollRatioDisplay, -0.1);
  sendMsg("minus");
});

// Reset scroll on tab update
browser.tabs.onUpdated.addListener(() => {
  // console.log('location changed!');
  document.getElementById("scrollX").value = 0.8;
});