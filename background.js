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
  const setFormFields = (formFields) => {
    const inputTypes = [window.HTMLInputElement];

    const triggerInputChange = (selector, value) => {
      const node = document.querySelector(selector);
      if (inputTypes.indexOf(node.__proto__.constructor) > -1) {
        const setValue = Object.getOwnPropertyDescriptor(
          node.__proto__,
          'value'
        ).set;
        let event = new Event('input', {
          bubbles: true,
        });

        if (node.__proto__.constructor === window.HTMLSelectElement) {
          event = new Event('change', {
            bubbles: true,
          });
        } else if (node.type === 'checkbox') {
          node.checked = value;
          event = new Event('change', {
            bubbles: true,
          });
        }
        setValue.call(node, value);
        node.dispatchEvent(event);
      }
    };

    Object.entries(formFields).forEach(([selector, value]) =>
      triggerInputChange(selector, value)
    );
  };

  setFormFields({
    'input[name="usernameOrEmail"]': loginId,
    'input[name="password"]': loginParam,
  });
}
