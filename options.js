function setPad(event) {
  const input = document.getElementById("pad_value");
  chrome.storage.sync.set({ pad: input.value });
}

const form = document.getElementById("padder_form");
form.addEventListener("submit",setPad);
