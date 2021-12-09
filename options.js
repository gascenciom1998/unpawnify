function setPad(event) {
  event.preventDefault();
  const input = document.getElementById("pad_value");
  chrome.storage.local.set({ 'pad': input.value }, function() {
    chrome.storage.local.get('pad', function(result) {
      console.log('Value currently is ' + result.pad);
    });
  });
}

var padder_form = document.getElementById("padder_form");
if (padder_form) {
  padder_form.addEventListener("submit",setPad);
}
