var sha256 = require('js-sha256').sha256;
const hasher = function(pass,url,pad) {
  let hash = pass;
  for (let i = 0; i < 500; i++) {
    hash = sha256(url.hostname + hash + pad);
  }
  return hash;
}

const randomNonce = function(length) {
  let text = "";
  const possible = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";
  for(let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('pad', function(result) {
    if (!result.pad) {
      chrome.storage.sync.set({ pad: randomNonce(64) });
    }
  });
});

function checkAction(callback) {
  chrome.storage.sync.get('disabled', function(result) {
    if (!result.disabled) {
      chrome.storage.sync.get('pad', function(result) {
        if (!!result.pad) {
          callback();
        }
      });
    }
  });
}

function hashMsg(tabs,msg) {
  if (chrome.runtime.lastError) {
    alert("error");
    setTimeout(() => hashMsg(tabs,msg), 1000);
  } else {
    chrome.storage.sync.get('pad', ({ pad }) => {
      const padder = !!pad ? pad : "";
      const url = new URL(tabs[0].url);
      chrome.tabs.sendMessage(tabs[0].id, { msg: msg }, function(response) {
        if (!response.error) {
          chrome.tabs.sendMessage(tabs[0].id, { msg: "hashes", class: response.class,
            hashes: response.values.map(val => hasher(val,url,padder))
          }, function(response) {});
        }
      });
    });
  }
  return true;
}

chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case "hash_all": {
      checkAction(() => {
        chrome.tabs.query({ active: true, currentWindow: true },
          tabs => hashMsg(tabs,"hash_all"));
      });
      break;
    }
    case "hash_sel": {
      checkAction(() => {
        chrome.tabs.query({ active: true, currentWindow: true },
          tabs => hashMsg(tabs,"hash_selected"));
      });
      break;
    }
    default: {}
  }
});
