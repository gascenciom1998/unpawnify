// TODO support multiple accounts on same host
// TODO support more kinds of password forms
var sha256 = require('js-sha256').sha256;

function passToContent(tabs) {
  const password = document.getElementById('password_value').value;
  if(chrome.runtime.lastError) {
    alert("error");
    setTimeout(passToContent, 1000);
  } else {
    url = new URL(tabs[0].url);
    chrome.tabs.sendMessage(tabs[0].id, { msg: "password_value", password: sha256(url.hostname + password) }, function(response) {});
  }
  return true;
}

function logSubmit(event) {
  chrome.tabs.query({ active: true, currentWindow: true }, passToContent);
}

const form = document.getElementById('password_form');
form.addEventListener('submit', logSubmit);
