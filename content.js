chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  try {
    document.getElementById('usernameOrEmail').value = request.loginId;
    document.getElementById('password').value = request.loginParam;
    sendResponse({ status: 'Success!' });
  } catch (error) {
    console.log(error);
    sendResponse({ status: 'Exception occurred!' });
  }
});
