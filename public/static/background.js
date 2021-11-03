chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
  });
});

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'CONNECT_WALLET':
      chrome.storage.local.get("account", (account) => {
        const { account: { accountRS = '' } = {} } = account
        sendResponse(accountRS)
      });
      break;
    case 'SIGN_TRANSACTION':
      chrome.storage.local.get("account", (account) => {
        const { account: { passphrase = '' } = {} } = account
        const decodedPassphrase = atob(passphrase)
        sendResponse(decodedPassphrase)
      });
      break;
    default:
      sendResponse('Error')
      break;
  }
});