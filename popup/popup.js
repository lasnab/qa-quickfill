function autofillCredentials(loginId, loginParam) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        loginId,
        loginParam,
      },
      function (response) {
        console.log(response.status);
      }
    );
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
