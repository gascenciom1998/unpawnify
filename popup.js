var sha256 = require('js-sha256').sha256;

function fillAllMsg(tabs) {
  const password = document.getElementById('password_value').value;
  if (chrome.runtime.lastError) {
    alert("error");
    setTimeout(() => fillAll(tabs), 1000);
  } else {
    url = new URL(tabs[0].url);
    chrome.tabs.sendMessage(tabs[0].id, { msg: "fill_all", password: sha256(url.hostname + password) }, function(response) {});
  }
  return true;
}

function hashMsg(tabs,msg) {
  if (chrome.runtime.lastError) {
    alert("error");
    setTimeout(() => hashMsg(tabs,msg), 1000);
  } else {
    url = new URL(tabs[0].url);
    chrome.tabs.sendMessage(tabs[0].id, { msg: msg }, function(response) {
      if (response.error) {
        document.getElementById("errorMsg").style.visibility = "visible";
      } else {
        chrome.tabs.sendMessage(tabs[0].id, { msg: "hashes", class: response.class,
          hashes: response.values.map(val => sha256(url.hostname + val))
        }, function(response) {});
      }
    });
  }
  return true;
}

function fillAll(event) {
  document.getElementById("errorMsg").style.visibility = "hidden";
  chrome.tabs.query({ active: true, currentWindow: true }, fillAllMsg);
}

function hashAll(event) {
  document.getElementById("errorMsg").style.visibility = "hidden";
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => hashMsg(tabs,"hash_all"));
}

function hashSel(event) {
  document.getElementById("errorMsg").style.visibility = "hidden";
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => hashMsg(tabs,"hash_selected"));
}

const form = document.getElementById('password_form');
form.addEventListener('submit', fillAll);

const hashAllBtn = document.getElementById('hash_all_button');
hashAllBtn.addEventListener('click', hashAll);

const hashSelBtn = document.getElementById('hash_sel_button');
hashSelBtn.addEventListener('click', hashSel);
