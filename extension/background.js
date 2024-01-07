// Listener for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.videoId) {
      const videoId = message.videoId;
      fetch(`http://127.0.0.1:8000/skip-intro/${videoId}`, {
        method: "GET"
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Skip Intro Not Available");
          }
        })
        .then(data => {
          const timestamp = data.timestamp;
          // Send message back to content script to skip to the timestamp
          console.log("send back")
          console.log(timestamp)
          chrome.tabs.sendMessage(sender.tab.id, { timestamp: timestamp });
        })
        .catch(error => {
          console.error("Error skipping intro:", error.message);
          // Handle error if needed
        });
    }
  });