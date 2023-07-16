chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'showAddParamsView') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('./vault/vault.html#addParamsSection'),
    });
  }
  if (message.action === 'showViewAllParamsView') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('./vault/vault.html#allParamsSection'),
    });
  }
  if (message.action === 'showDisclaimerView') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('./vault/vault.html#disclaimerSection'),
    });
  }
  if (message.action === 'showSettingsView') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('./vault/vault.html'),
    });
  }
});
