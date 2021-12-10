var sha256 = require('js-sha256').sha256;
const hasher = function(pass,url,pad) {
  let hash = pass;
  for (let i = 0; i < 500; i++) {
    hash = sha256(url.hostname + hash + pad);
  }
  return hash;
}

function fillAllMsg(tabs) {
  const password = document.getElementById('password_value').value;
  if (chrome.runtime.lastError) {
    alert("error");
    setTimeout(() => fillAll(tabs), 1000);
  } else {
    chrome.storage.sync.get('pad', ({ pad }) => {
      const padder = !!pad ? pad : "";
      const url = new URL(tabs[0].url);
      chrome.tabs.sendMessage(tabs[0].id, { msg: "fill_all",
        password: hasher(password,url,padder), pad: pad,
      }, function(response) {});
    });
  }
  return true;
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
        if (response.error) {
          document.getElementById("errorMsg").style.display = "initial";
        } else {
          chrome.tabs.sendMessage(tabs[0].id, { msg: "hashes", class: response.class,
            hashes: response.values.map(val => hasher(val,url,padder))
          }, function(response) {});
        }
      });
    });
  }
  return true;
}

function fillAll(event) {
  event.preventDefault();
  document.getElementById("errorMsg").style.display = "none";
  chrome.tabs.query({ active: true, currentWindow: true }, fillAllMsg);
}

function hashAll(event) {
  document.getElementById("errorMsg").style.display = "none";
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => hashMsg(tabs,"hash_all"));
}

function hashSel(event) {
  document.getElementById("errorMsg").style.display = "none";
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => hashMsg(tabs,"hash_selected"));
}

const form = document.getElementById('password_form');
form.addEventListener('submit', fillAll);

const hashAllBtn = document.getElementById('hash_all_button');
hashAllBtn.addEventListener('click', hashAll);

const hashSelBtn = document.getElementById('hash_sel_button');
hashSelBtn.addEventListener('click', hashSel);

const btn = document.getElementById("enable_button");
chrome.storage.sync.get('disabled', function(result) {
  if (result.disabled) {
    btn.innerHTML = "Enable Shortcuts";
  } else {
    btn.innerHTML = "Disable Shortcuts";
  }
});
btn.addEventListener("click", (event) => {
  chrome.storage.sync.get('disabled', function(result) {
    if (result.disabled) {
      chrome.storage.sync.set({ disabled: false });
      btn.innerHTML = "Disable Shortcuts";
    } else {
      chrome.storage.sync.set({ disabled: true });
      btn.innerHTML = "Enable Shortcuts";
    }
  });
})

chrome.storage.sync.get('pad', function(result) {
  const before = document.getElementById("no_pad_yet");
  const after = document.getElementById("content");
  if (!result.pad) {
    before.style.display = "initial";
  } else {
    after.style.display = "flex";
    const input = document.getElementById("password_value");
    input.focus();
  }
});
