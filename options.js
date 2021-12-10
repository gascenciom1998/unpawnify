chrome.storage.sync.get('pad', function(result) {
  if (!!result.pad) {
    const pad = document.getElementById("pad");
    pad.innerHTML = result.pad;
    pad.style.display = "initial";
  }
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