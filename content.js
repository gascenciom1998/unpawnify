const randomNonce = function(length) {
  let text = "";
  const possible = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";
  for(let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.msg) {
      case "fill_all": {
        password = request.password;
        const inputs = $("input[type='password']")
        inputs.val(password);
        inputs.css("background","rgb(255 234 153)");
        break;
      }
      case "hash_all": {
        const inputs = $("input[type='password']");
        const vals = [];
        for (let input of inputs) {
          vals.push(input.value);
        }
        sendResponse({class: "", values: vals});
        break;
      }
      case "hash_selected": {
        const input = document.activeElement;
        if (input.tagName.toLowerCase() === "input" && input.type === "password") {
          const vals = [input.value];
          const className = randomNonce(20);
          input.classList.add(className);
          sendResponse({class: className, values: vals});
        } else {
          sendResponse({error: true});
        }
        break;
      }
      case "hashes": {
        const inputs = request.class === ""
          ? $("input[type='password']")
          : $("."+request.class);
        for (let i = 0; i < inputs.length; i++) {
          const input = inputs.eq(i);
          input.val(request.hashes[i]);
          input.css("background","rgb(255 234 153)");
          if (request.class !== "") {
            input.removeClass(request.class);
          }
        }
        break;
      }
      default: {}
    }
    return true;
  }
);
