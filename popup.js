document.addEventListener('DOMContentLoaded', function () {
  var checkPageButton = document.getElementById('clickit');
  checkPageButton.addEventListener('click', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      alert(tabs[0].url);
    })
    // chrome.tabs.query({
    //   active: true,
    //   lastFocusedWindow: true
    // }, function (tabs) {
    //   alert(tab.url);
    // })
  })
})
