document.addEventListener('DOMContentLoaded', function () {
  // var checkPageButton = document.getElementById('clickit');
  // checkPageButton.addEventListener('click', function () {
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     alert(tabs[0].url);
  //   })
  // })

  function logSubmit(event) {
    // log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    // event.preventDefault();
    console.log(password)
  }

  const form = document.getElementById('password_form');
  const password = document.getElementById('password_value');
  form.addEventListener('submit', logSubmit);
})
