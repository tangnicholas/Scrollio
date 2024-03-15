var scrollRatio = 0.8;
document.getElementById("scrollX").value = scrollRatio.toFixed(1);

// Event listener for scroll
document.getElementById('startButton').addEventListener('click', () => {
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, { action: "button1Click" });
  });
});

// Event listener for stop
document.getElementById('stopButton').addEventListener('click', () => {
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, { action: "button2Click" });
  });
});

// Event listener for next
document.getElementById('nextButton').addEventListener('click', () => {
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, { action: "button3Click" });
  });
});

function refreshSR(sr, change, rst){
  if (rst)
    sr = 0.8;
  else
    sr += change;
  document.getElementById("scrollX").value = sr.toFixed(1);
  return sr;
}

// Event listener for plus
document.getElementById('plusButton').addEventListener('click', () => {
  console.log("add");
  scrollRatio = refreshSR(scrollRatio, 0.1, false);
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, { action: "plus" });
  });
});

// Event listener for minus
document.getElementById('minusButton').addEventListener('click', () => {
  console.log("sub");
  scrollRatio = refreshSR(scrollRatio, -0.1, false);
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, { action: "minus" });
  });
});

browser.tabs.onUpdated.addListener(() => {
  console.log('location changed!');
  scrollRatio = 0.8;
  document.getElementById("scrollX").value = scrollRatio.toFixed(1);
});


/*
// Event listener for AutoAdvance
document.getElementById('autoAdvance').addEventListener('change', () => {
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var advanceMessage = this.checked ? "startAutoAdvance" : "stopAutoAdvance";
    if(advanceMessage === "startAutoAdvance"){
      console.log("start ehe advancing");
    }
    browser.tabs.sendMessage(tabs[0].id, { action: "advanceMessage" });
  });
});
*/
