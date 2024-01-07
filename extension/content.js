const BUTTON_ID = "skip-intro-button"

// Function to create the Skip Intro button
// Function to create the Skip Intro button
function createSkipIntroButton(timestamp) {
  const skipButton = document.createElement("button");
  skipButton.innerText = "Skip Intro";
  skipButton.style.backgroundColor = "black";
  skipButton.style.color = "white";
  skipButton.style.position = "relative";
  skipButton.style.zIndex = "9999";
  skipButton.style.padding = "10px 20px"; // Adjust padding for larger size
  skipButton.style.border = "none";
  skipButton.style.borderRadius = "5px";
  skipButton.style.fontSize = "16px"; // Increase font size
  skipButton.style.fontWeight = "bold"; // Set font weight to bold
  skipButton.id = BUTTON_ID
  
  skipButton.addEventListener("click", () => {
    skipToTimestamp(timestamp)
    skipButton.style.display = "none";
  });

  setInterval(() => hideIfVideoPlayerIsAfterGivenTimeStamp(timestamp), 100)

  return skipButton;
}

function hideIfVideoPlayerIsAfterGivenTimeStamp(timestamp) {
  const videoPlayer = document.querySelector("#movie_player > div.html5-video-container > video");
  if (videoPlayer && videoPlayer.currentTime > timestamp) {
    const button = document.querySelector("#" + BUTTON_ID);
    button.style.display = "none"
  } else if (videoPlayer && videoPlayer.currentTime < timestamp) {
    const button = document.querySelector("#" + BUTTON_ID);
    button.style.display = ""
  }
}


// Function to skip the player to the specified timestamp
function skipToTimestamp(timestamp) {
  const videoPlayer = document.querySelector("#movie_player > div.html5-video-container > video");
  if (videoPlayer) {
    videoPlayer.currentTime = timestamp;
  }
}

// Add Skip Intro button to the YouTube video page
function addSkipIntroButton(timestamp) {
  const targetElement = document.querySelector("#movie_player > div.ytp-player-content.ytp-cultural-moment-player-content");
  if (targetElement) {
    const skipButton = createSkipIntroButton(timestamp);
    targetElement.parentNode.insertBefore(skipButton, targetElement);
  }
}
  
// Function to extract video ID from YouTube URL
function getVideoIdFromUrl(url) {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get("v");
}

// Listener for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.timestamp) {
    const timestamp = message.timestamp;
    addSkipIntroButton(timestamp)
  }
});

function checkIfVideoIsSkippable() {
  if (!location.pathname.startsWith("/watch")) {
    return
  }
  const videoId = getVideoIdFromUrl(window.location.href);
  chrome.runtime.sendMessage({ videoId: videoId });
}
  
// Run the function when the DOM is ready
document.addEventListener('yt-navigate-start', checkIfVideoIsSkippable());