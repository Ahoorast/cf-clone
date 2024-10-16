chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getHTML") {
    sendResponse({ html: document.documentElement.outerHTML });
  }
});

