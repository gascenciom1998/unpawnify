chrome.storage.sync.get('pad', function(result) {
  const pad = document.getElementById("pad");
  if (!!result.pad) {
    pad.innerHTML = "Pad already set.";
  } else {
    pad.innerHTML = "No pad set yet.";
  }
  pad.style.visibility = "visible";
});

chrome.commands.getAll((results) => {
  for (let result of results) {
    if (result.name === "hash_all") {
      const hash_all = document.getElementById("hash_all");
      hash_all.innerHTML = result.shortcut;
    }
    if (result.name === "hash_sel") {
      const hash_sel = document.getElementById("hash_sel");
      hash_sel.innerHTML = result.shortcut;
    }
  }
})