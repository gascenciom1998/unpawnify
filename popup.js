document.addEventListener('DOMContentLoaded', function () {
  // var checkPageButton = document.getElementById('clickit');
  // checkPageButton.addEventListener('click', function () {
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     alert(tabs[0].url);
  //   })
  // })

  function logSubmit(event) {
    const password = document.getElementById('password_value');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      url = new URL(tabs[0].url);
      alert(url.hostname);
    })
  }

  const form = document.getElementById('password_form');
  console.log(form);
  form.addEventListener('submit', logSubmit);
})
