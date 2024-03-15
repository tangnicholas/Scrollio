let scrollRatio = 8;

document.getElementById("scrollX10").value = scrollRatio/10;

// Refresh and update scrollRatio on change
function refreshSR(sr, change, rst){
  if (rst)
    sr = 8;
  else
    sr += change;
  document.getElementById("scrollX10").value = (sr/10).toFixed(1);
  return sr;
}

// Event listener for scroll
document.getElementById('startButton').addEventListener('click', () => {
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, { action: "button1Click" });
  });
});
document.getElementById('stopButton').addEventListener('click', () => {
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, { action: "button2Click" });
  });
});
document.getElementById('nextButton').addEventListener('click', () => {
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, { action: "button3Click" });
  });
});
document.getElementById('plusButton').addEventListener('click', () => {
  console.log("add");
  scrollRatio = refreshSR(scrollRatio, 1, false);
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, { action: "plus" });
  });
});
document.getElementById('minusButton').addEventListener('click', () => {
  console.log("sub");
  scrollRatio = refreshSR(scrollRatio, -1, false);
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, { action: "minus" });
  });
});
browser.tabs.onUpdated.addListener(() => {
  console.log('location changed!');
  scrollRatio = 8;
  document.getElementById("scrollX10").value = (scrollRatio/10).toFixed(1);
});
