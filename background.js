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

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === 'autoFillParams') {
    chrome.scripting.executeScript({
      target: { tabId: message.tabId },
      func: injectedFunction,
      args: [message.loginId, message.loginParam],
    });
  }
});

function injectedFunction(loginId, loginParam) {
  const usernameField = document.getElementById('usernameOrEmail');
  const passwordField = document.getElementById('password');

  if (usernameField && passwordField) {
    usernameField.value = loginId;
    passwordField.value = loginParam;
  }
}
