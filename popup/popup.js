function autoFillParams(loginId, loginParam) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    chrome.runtime.sendMessage({
      action: 'autoFillParams',
      loginId: loginId,
      loginParam: loginParam,
      tabId: tab.id,
    });
  });
}

document.getElementById('addParamsBtn').addEventListener('click', function () {
  chrome.runtime.sendMessage({ action: 'showAddParamsView' });
});
document.getElementById('settingsBtn').addEventListener('click', function () {
  chrome.runtime.sendMessage({ action: 'showSettingsView' });
});
document.getElementById('disclaimerBtn').addEventListener('click', function () {
  chrome.runtime.sendMessage({ action: 'showDisclaimerView' });
});
