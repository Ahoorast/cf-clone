
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {active: true});
  });
});
