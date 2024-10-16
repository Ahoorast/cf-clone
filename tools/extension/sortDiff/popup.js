function tabToIndex(tabId, index) {
  chrome.tabs.move(tabId, { index: index });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('switchTab').addEventListener('click', async function() {
  let tabIds = [];
  chrome.tabs.query({}, function(tabs) {
    for (let i = 0; i < tabs.length; i++) {
      tabIds.push(tabs[i].id);
    }
  });
  await sleep(1000);
  let diffs = [];
  for (let i = 0; i < tabIds.length; i++) {
    let tabId = tabIds[i];
    try {
      let diff = await chrome.scripting.executeScript({
        target: {tabId: tabId},
        function: () => document.querySelector('[title="Difficulty"]').innerHTML
      });
      diff = diff[0].result;
      let diffNumber = 0;
      for (let j = 0; j < diff.length; j++) {
        
        if (diff[j] >= '0' && diff[j] <= '9') {
          diffNumber = diffNumber * 10 + parseInt(diff[j]);
        }
      }
      diffs.push({tabId: tabId, diff: diffNumber});
    } catch (error) {
    }
  }
  sortedDiffs = diffs.sort((a, b) => a.diff - b.diff);
  for (let i = 0; i < sortedDiffs.length; i++) {
    tabToIndex(sortedDiffs[i].tabId, i);
    await sleep(500);
  }
});

