// Define the interval time in milliseconds
let intervalTime = 10000;

// Variable to hold the interval timer
let scrollInterval;
let autoAdvance = 0;    // just a value to add a setting later
let scrollAmount = 0.8;

// Function to scroll the webpage
// default: 600
function autoScroll() {
  console.log("testing...")
  //if end of page advance if auto-advance is on 
  
  if (isEndOfPage()) {
    console.log("is autoAdvance set? " + autoAdvance);
    if (autoAdvance) {
      console.log("next page")
      gotoNextPage();
    } else {
      stopScrolling();
    }
  }
  
  // Scroll to the bottom of the page
  console.log("Current scrollAmount: " + scrollAmount);
  window.scrollBy({
    top: scrollAmount * window.innerHeight,
    left: 0,
    behavior: 'smooth'
  });
}

// Function to start scrolling
function startScrolling() {
  console.log("Recieved Start");
  console.log("ScrollAmount: " + Number.parseFloat(scrollAmount).toFixed(1));

  // Check if scrolling is not already running
  if (!scrollInterval) {
    // Start the scrolling interval
    scrollInterval = setInterval(autoScroll, intervalTime);
  }
}

// Function to stop scrolling
function stopScrolling() {
  console.log("Recieved Stop");
  // Check if scrolling is running
  if (scrollInterval) {
    // Stop the scrolling interval
    clearInterval(scrollInterval);
    scrollInterval = null;
  }
}

// Functions to check if end of page is reached, and go to next page
function isEndOfPage() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

function incrementString(str) {
  // Find the trailing number or it will match the empty string
  var count = str.match(/\d*$/);

  // Take the substring up until where the integer was matched
  // Concatenate it to the matched count incremented by 1
  return str.substr(0, count.index) + (++count[0]);
};

/**
 * 
 */
function gotoNextPage() {
  console.log("End of page reached!");
  var pageNum = window.location.pathname.split("/").pop().toString()
  var url = window.location.toString();
  var pageNumNew = incrementString(pageNum);
  console.log(pageNumNew);
  window.location = url.replace(pageNum, pageNumNew);
}

/** 
 * 
 */
browser.runtime.onMessage.addListener((message) => {
  if (message.data.action === "start" || message.data.action === "autoStart") {
    console.log("Received Start, here is the value: " + message.data.value);
    scrollAmount = Number.parseFloat(message.data.value);
    autoAdvance = message.data.auto;
    intervalTime = Number(message.data.interval*1000);
    startScrolling();
  } else if (message.data.action === "stop") {
    stopScrolling();
  } else if (message.data.action === "next") {
    gotoNextPage();
  } else if (message.data.action === "setValue") {
    //setVals();
  }
});