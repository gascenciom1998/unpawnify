chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.msg === "password_value") {
      password = request.password;
      $("input[type='password']").val(password);
    }
    return true;
  }
);
